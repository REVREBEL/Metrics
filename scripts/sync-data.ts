import { BigQuery } from '@google-cloud/bigquery';
import * as duckdb from 'duckdb';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { loadEnvConfig } from '@next/env';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const HOTEL_DATASET = 'devrebel-big-query-database.dev_hotel_analytics';
const GA4_DATASET = 'devrebel-big-query-database.dev_hotel_g4a';
const PUBLIC_DATA_DIR = path.join(process.cwd(), 'public', 'data');
const DATE_MANIFEST_FILE = 'dashboard_date_availability.json';

type SyncTarget =
  | 'all'
  | 'ga4'
  | 'pace'
  | 'pace-property'
  | 'pace-segment'
  | 'pace-segment-pickup'
  | 'pace-roomtype'
  | 'pace-derived';

interface SyncContext {
  db: duckdb.Database;
  bq: BigQuery;
  publicDataDir: string;
}

let bqConfig = {};

try {
  console.log('Fetching Google Service Account credentials via 1Password CLI...');
  const opUri = process.env.BQ_SERVICE_ACCOUNT_OP_URI;
  if (!opUri) {
    throw new Error('BQ_SERVICE_ACCOUNT_OP_URI is not defined in .env');
  }
  const credentialJson = execSync(`op read "${opUri}" --no-newline`, { encoding: 'utf8' });
  bqConfig = { credentials: JSON.parse(credentialJson) };
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  console.warn(
    'Could not read credentials from 1Password. Falling back to Application Default Credentials or GOOGLE_APPLICATION_CREDENTIALS.',
    message,
  );
}

const bq = new BigQuery(bqConfig);
const db = new duckdb.Database(':memory:');

function ensurePublicDataDir(publicDataDir: string) {
  if (!fs.existsSync(publicDataDir)) {
    fs.mkdirSync(publicDataDir, { recursive: true });
  }
}

function resolveOutputPath(publicDataDir: string, outputFilename: string) {
  return path.join(publicDataDir, outputFilename);
}

async function runQueryToParquet(
  context: SyncContext,
  query: string,
  outputFilename: string,
) {
  console.log(`\nExecuting BigQuery for ${outputFilename}...`);
  const [job] = await context.bq.createQueryJob({ query, location: 'us-central1' });
  const [rows] = await job.getQueryResults();

  console.log(`Fetched ${rows.length} rows for ${outputFilename}.`);
  if (rows.length === 0) {
    console.log(`No data found for ${outputFilename}. Skipping.`);
    return;
  }

  ensurePublicDataDir(context.publicDataDir);
  const tempJsonPath = path.join(process.cwd(), `temp_${outputFilename}_bq_data.json`);
  const outputPath = resolveOutputPath(context.publicDataDir, outputFilename);

  // Stream rows one-by-one to avoid RangeError on large result sets (e.g. 90k+ pickup rows).
  await new Promise<void>((resolve, reject) => {
    const stream = fs.createWriteStream(tempJsonPath, { encoding: 'utf8' });
    stream.on('error', reject);
    stream.on('finish', resolve);

    for (const record of rows) {
      const row = { ...record } as Record<string, unknown>;
      for (const key in row) {
        if (row[key] && typeof row[key] === 'object' && 'value' in row[key]) {
          row[key] = (row[key] as { value: unknown }).value;
        }
      }
      stream.write(JSON.stringify(row) + '\n');
    }
    stream.end();
  });

  console.log(`Converting data to ${outputFilename} via DuckDB...`);

  return new Promise<void>((resolve, reject) => {
    context.db.run(
      `
        COPY (
          SELECT * FROM read_json_auto('${tempJsonPath}')
        ) TO '${outputPath}' (FORMAT PARQUET);
      `,
      (err: Error | null) => {
        if (fs.existsSync(tempJsonPath)) fs.unlinkSync(tempJsonPath);

        if (err) {
          console.error(`Error generating ${outputFilename}:`, err);
          reject(err);
        } else {
          console.log(`✅ Successfully saved Parquet data to:\n${outputPath}`);
          resolve();
        }
      },
    );
  });
}



async function runLocalQueryToParquet(
  context: SyncContext,
  query: string,
  outputFilename: string,
) {
  ensurePublicDataDir(context.publicDataDir);
  const outputPath = resolveOutputPath(context.publicDataDir, outputFilename);

  return new Promise<void>((resolve, reject) => {
    context.db.run(`COPY (${query}) TO '${outputPath}' (FORMAT PARQUET);`, (err: Error | null) => {
      if (err) {
        console.error(`Error generating ${outputFilename}:`, err);
        reject(err);
      } else {
        console.log(`✅ Successfully saved Parquet data to:\n${outputPath}`);
        resolve();
      }
    });
  });
}

async function runDuckDbQuery<T = Record<string, unknown>>(
  context: SyncContext,
  query: string,
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    context.db.all(query, (err: Error | null, rows: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

    function requireParquetFiles(context: SyncContext, filenames: string[]) {
      const missing = filenames.filter((filename) => !fs.existsSync(resolveOutputPath(context.publicDataDir, filename)));
      if (missing.length > 0) {
        throw new Error(`Missing prerequisite parquet files: ${missing.join(', ')}`);
      }
    }

    async function writeDateAvailabilityManifest(context: SyncContext) {
      requireParquetFiles(context, ['dashboard_current.parquet']);

      const rows = await runDuckDbQuery<{
        year: number;
        months: string;
        min_date: string;
        max_date: string;
      }>(
        context,
        `
      WITH dates AS (
        SELECT DISTINCT CAST(stay_date AS DATE) AS stay_date
        FROM '${resolveOutputPath(context.publicDataDir, 'dashboard_current.parquet')}'
      )
      SELECT
        CAST(EXTRACT(YEAR FROM stay_date) AS INTEGER) AS year,
        string_agg(
          DISTINCT lpad(CAST(EXTRACT(MONTH FROM stay_date) AS VARCHAR), 2, '0'),
          ',' ORDER BY lpad(CAST(EXTRACT(MONTH FROM stay_date) AS VARCHAR), 2, '0')
        ) AS months,
        CAST(MIN(stay_date) AS VARCHAR) AS min_date,
        CAST(MAX(stay_date) AS VARCHAR) AS max_date
      FROM dates
      GROUP BY 1
      ORDER BY 1
    `,
      );

      const manifest = {
        generatedAt: new Date().toISOString(),
        years: rows.map((row) => ({
          year: String(row.year),
          months: row.months.split(',').map((month) => Number.parseInt(month, 10)),
          minDate: row.min_date,
          maxDate: row.max_date,
        })),
      };

      const outputPath = resolveOutputPath(context.publicDataDir, DATE_MANIFEST_FILE);
      fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
      console.log(`✅ Wrote date availability manifest to:\n${outputPath}`);
    }

    async function writePickupParquet(context: SyncContext) {
      requireParquetFiles(context, ['dashboard_current.parquet', 'dashboard_trend.parquet']);

      const currentPath = resolveOutputPath(context.publicDataDir, 'dashboard_current.parquet');
      const trendPath = resolveOutputPath(context.publicDataDir, 'dashboard_trend.parquet');

      await runLocalQueryToParquet(
        context,
        `
      WITH current_totals AS (
        SELECT
          CAST(stay_date AS DATE) AS stay_date,
          SUM(rooms_cy) AS rooms_current,
          SUM(revenue_cy) AS revenue_current
        FROM '${currentPath}'
        GROUP BY 1
      ),
      latest_snapshot AS (
        SELECT MAX(CAST(snapshot_date AS DATE)) AS snapshot_date
        FROM '${trendPath}'
      ),
      lookbacks AS (
        SELECT 1 AS lookback_days
        UNION ALL SELECT 3
        UNION ALL SELECT 7
        UNION ALL SELECT 14
        UNION ALL SELECT 30
        UNION ALL SELECT 60
        UNION ALL SELECT 90
      ),
      historical_snapshots AS (
        SELECT
          CAST(stay_date AS DATE) AS stay_date,
          CAST(snapshot_date AS DATE) AS snapshot_date,
          SUM(rooms_cy) AS rooms_snapshot,
          SUM(revenue_cy) AS revenue_snapshot
        FROM '${trendPath}'
        GROUP BY 1, 2
      ),
      comparison_candidates AS (
        SELECT
          lookbacks.lookback_days,
          historical_snapshots.stay_date,
          historical_snapshots.snapshot_date,
          historical_snapshots.rooms_snapshot,
          historical_snapshots.revenue_snapshot,
          ROW_NUMBER() OVER (
            PARTITION BY lookbacks.lookback_days, historical_snapshots.stay_date
            ORDER BY historical_snapshots.snapshot_date DESC
          ) AS row_num
        FROM historical_snapshots
        CROSS JOIN latest_snapshot
        INNER JOIN lookbacks
          ON historical_snapshots.snapshot_date
            <= latest_snapshot.snapshot_date - ((lookbacks.lookback_days || ' days')::INTERVAL)
      ),
      comparison_snapshots AS (
        SELECT
          lookback_days,
          stay_date,
          snapshot_date AS comparison_snapshot_date,
          rooms_snapshot,
          revenue_snapshot
        FROM comparison_candidates
        WHERE row_num = 1
      )
      SELECT
        current_totals.stay_date,
        lookbacks.lookback_days,
        latest_snapshot.snapshot_date AS current_snapshot_date,
        comparison_snapshots.comparison_snapshot_date,
        current_totals.rooms_current - COALESCE(comparison_snapshots.rooms_snapshot, 0) AS pickup_rooms,
        current_totals.revenue_current - COALESCE(comparison_snapshots.revenue_snapshot, 0) AS pickup_revenue,
        CASE
          WHEN current_totals.rooms_current - COALESCE(comparison_snapshots.rooms_snapshot, 0) = 0 THEN 0
          ELSE
            (current_totals.revenue_current - COALESCE(comparison_snapshots.revenue_snapshot, 0))
            / (current_totals.rooms_current - COALESCE(comparison_snapshots.rooms_snapshot, 0))
        END AS pickup_adr
      FROM current_totals
      CROSS JOIN lookbacks
      CROSS JOIN latest_snapshot
      LEFT JOIN comparison_snapshots
        ON current_totals.stay_date = comparison_snapshots.stay_date
        AND lookbacks.lookback_days = comparison_snapshots.lookback_days
      ORDER BY current_totals.stay_date, lookbacks.lookback_days
    `,
        'dashboard_pickup.parquet',
      );
    }

    function getCurrentPaceQuery(dataset: string) {
      return `
    WITH date_window AS (
      SELECT
        DATE_TRUNC(MIN(stay_date), YEAR) AS min_stay_date,
        DATE_ADD(DATE_TRUNC(MAX(stay_date), YEAR), INTERVAL 1 YEAR) AS max_stay_date_exclusive
      FROM \`${dataset}.vw_pace_property_current\`
    ),
    seg_totals AS (
      SELECT
        property_name,
        stay_date,
        SUM(rooms_otb) AS rooms_otb,
        SUM(rev_otb) AS rev_otb,
        SUM(rooms_ly_actual) AS rooms_ly_actual,
        SUM(rev_ly_actual) AS rev_ly_actual,
        SUM(rooms_budget) AS rooms_budget,
        SUM(rev_budget) AS rev_budget,
        SUM(rooms_forecast) AS rooms_forecast,
        SUM(rev_forecast) AS rev_forecast
      FROM \`${dataset}.vw_pace_segment_current\`
      WHERE stay_date >= (SELECT min_stay_date FROM date_window)
        AND stay_date < (SELECT max_stay_date_exclusive FROM date_window)
      GROUP BY property_name, stay_date
    ),
    cap_totals AS (
      SELECT
        property_name,
        stay_date,
        SUM(available_rooms) AS available_rooms,
        MAX(special_events) AS special_events,
        MAX(special_events_ly) AS special_events_ly,
        SUM(total_demand_total) AS total_demand_total,
        SUM(total_demand_total_ly_actual) AS total_demand_total_ly_actual,
        SUM(total_demand_group) AS total_demand_group,
        SUM(total_demand_group_ly_actual) AS total_demand_group_ly_actual,
        SUM(total_demand_transient) AS total_demand_transient,
        SUM(total_demand_transient_ly_actual) AS total_demand_transient_ly_actual,
        MAX(lrv) AS lrv,
        MAX(bar_price) AS bar_price
      FROM \`${dataset}.vw_pace_property_current\`
      WHERE stay_date >= (SELECT min_stay_date FROM date_window)
        AND stay_date < (SELECT max_stay_date_exclusive FROM date_window)
      GROUP BY property_name, stay_date
    )
    SELECT
      seg_totals.property_name,
      seg_totals.stay_date,
      seg_totals.rooms_otb AS rooms_cy,
      seg_totals.rev_otb AS revenue_cy,
      seg_totals.rooms_ly_actual AS rooms_ly_actual,
      seg_totals.rev_ly_actual AS rev_ly_actual,
      seg_totals.rev_budget AS rev_budget,
      seg_totals.rooms_budget AS rooms_budget,
      cap_totals.available_rooms AS available_rooms,
      cap_totals.special_events AS special_events,
      cap_totals.special_events_ly AS special_events_ly,
      cap_totals.total_demand_total AS total_demand_total,
      cap_totals.total_demand_total_ly_actual AS total_demand_total_ly_actual,
      cap_totals.total_demand_group AS total_demand_group,
      cap_totals.total_demand_group_ly_actual AS total_demand_group_ly_actual,
      cap_totals.total_demand_transient AS total_demand_transient,
      cap_totals.total_demand_transient_ly_actual AS total_demand_transient_ly_actual,
      cap_totals.lrv AS lrv,
      cap_totals.bar_price AS bar_price,
      (seg_totals.rooms_otb / nullif(cap_totals.available_rooms, 0)) AS occ_cy,
      (seg_totals.rooms_ly_actual / nullif(cap_totals.available_rooms, 0)) AS occ_py,
      (seg_totals.rooms_budget / nullif(cap_totals.available_rooms, 0)) AS occ_budget,
      (seg_totals.rev_otb / nullif(seg_totals.rooms_otb, 0)) AS adr_cy,
      (seg_totals.rev_ly_actual / nullif(seg_totals.rooms_ly_actual, 0)) AS adr_py,
      (seg_totals.rev_budget / nullif(seg_totals.rooms_budget, 0)) AS adr_budget,
      (seg_totals.rev_otb / nullif(cap_totals.available_rooms, 0)) AS revpar_cy,
      (seg_totals.rev_ly_actual / nullif(cap_totals.available_rooms, 0)) AS revpar_py,
      (seg_totals.rev_budget / nullif(cap_totals.available_rooms, 0)) AS revpar_budget,
      ((seg_totals.rooms_otb / nullif(cap_totals.available_rooms, 0)) - (seg_totals.rooms_ly_actual / nullif(cap_totals.available_rooms, 0))) AS occ_var,
      ((seg_totals.rev_otb / nullif(seg_totals.rooms_otb, 0)) - (seg_totals.rev_ly_actual / nullif(seg_totals.rooms_ly_actual, 0))) AS adr_var,
      ((seg_totals.rev_otb / nullif(cap_totals.available_rooms, 0)) - (seg_totals.rev_ly_actual / nullif(cap_totals.available_rooms, 0))) AS revpar_var,
      ((seg_totals.rooms_budget / nullif(cap_totals.available_rooms, 0)) - (seg_totals.rooms_otb / nullif(cap_totals.available_rooms, 0))) AS occ_budget_var,
      ((seg_totals.rev_budget / nullif(seg_totals.rooms_budget, 0)) - (seg_totals.rev_otb / nullif(seg_totals.rooms_otb, 0))) AS adr_budget_var,
      ((seg_totals.rev_budget / nullif(cap_totals.available_rooms, 0)) - (seg_totals.rev_otb / nullif(cap_totals.available_rooms, 0))) AS revpar_budget_var,
      (seg_totals.rooms_otb - seg_totals.rooms_ly_actual) AS rooms_var,
      (seg_totals.rev_otb - seg_totals.rev_ly_actual) AS revenue_var,
      (seg_totals.rooms_budget - seg_totals.rooms_otb) AS rooms_budget_var,
      (seg_totals.rev_budget - seg_totals.rev_otb) AS revenue_budget_var,
      (seg_totals.rev_otb / nullif(seg_totals.rev_budget, 0)) AS budget_reach_pct,
      seg_totals.rooms_forecast AS rooms_forecast,
      seg_totals.rev_forecast AS rev_forecast,
      (seg_totals.rooms_forecast - seg_totals.rooms_otb) AS rooms_forecast_var,
      (seg_totals.rev_forecast - seg_totals.rev_otb) AS revenue_forecast_var
    FROM seg_totals
    LEFT JOIN cap_totals
      ON seg_totals.property_name = cap_totals.property_name
      AND seg_totals.stay_date = cap_totals.stay_date;
  `;
    }

    function getTrendPaceQuery(dataset: string) {
      return `
    WITH date_window AS (
      SELECT
        DATE_TRUNC(MIN(stay_date), YEAR) AS min_stay_date,
        DATE_ADD(DATE_TRUNC(MAX(stay_date), YEAR), INTERVAL 1 YEAR) AS max_stay_date_exclusive
      FROM \`${dataset}.vw_pace_property_current\`
    ),
    seg_totals AS (
      SELECT
        property_name,
        snapshot_date,
        stay_date,
        SUM(rooms_otb) AS rooms_otb,
        SUM(rev_otb) AS rev_otb,
        SUM(rooms_ly_actual) AS rooms_ly_actual,
        SUM(rev_ly_actual) AS rev_ly_actual,
        SUM(rooms_budget) AS rooms_budget,
        SUM(rev_budget) AS rev_budget,
        SUM(rooms_forecast) AS rooms_forecast,
        SUM(rev_forecast) AS rev_forecast
      FROM \`${dataset}.vw_pace_segment\`
      WHERE stay_date >= (SELECT min_stay_date FROM date_window)
        AND stay_date < (SELECT max_stay_date_exclusive FROM date_window)
        AND snapshot_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 24 MONTH)
      GROUP BY property_name, stay_date, snapshot_date
    ),
    cap_totals AS (
      SELECT
        property_name,
        snapshot_date,
        stay_date,
        SUM(available_rooms) AS available_rooms
      FROM \`${dataset}.vw_pace_property\`
      WHERE stay_date >= (SELECT min_stay_date FROM date_window)
        AND stay_date < (SELECT max_stay_date_exclusive FROM date_window)
        AND snapshot_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 24 MONTH)
      GROUP BY property_name, stay_date, snapshot_date
    )
    SELECT
      seg_totals.property_name,
      seg_totals.snapshot_date,
      seg_totals.stay_date,
      seg_totals.rooms_otb AS rooms_cy,
      seg_totals.rev_otb AS revenue_cy,
      seg_totals.rooms_ly_actual AS rooms_ly_actual,
      seg_totals.rev_ly_actual AS rev_ly_actual,
      seg_totals.rev_budget AS rev_budget,
      seg_totals.rooms_budget AS rooms_budget,
      cap_totals.available_rooms AS available_rooms,
      (seg_totals.rooms_otb / nullif(cap_totals.available_rooms, 0)) AS occ_cy,
      (seg_totals.rooms_ly_actual / nullif(cap_totals.available_rooms, 0)) AS occ_py,
      (seg_totals.rooms_budget / nullif(cap_totals.available_rooms, 0)) AS occ_budget,
      (seg_totals.rev_otb / nullif(seg_totals.rooms_otb, 0)) AS adr_cy,
      (seg_totals.rev_ly_actual / nullif(seg_totals.rooms_ly_actual, 0)) AS adr_py,
      (seg_totals.rev_budget / nullif(seg_totals.rooms_budget, 0)) AS adr_budget,
      (seg_totals.rev_otb / nullif(cap_totals.available_rooms, 0)) AS revpar_cy,
      (seg_totals.rev_ly_actual / nullif(cap_totals.available_rooms, 0)) AS revpar_py,
      (seg_totals.rev_budget / nullif(cap_totals.available_rooms, 0)) AS revpar_budget_var,
      (seg_totals.rooms_otb - seg_totals.rooms_ly_actual) AS rooms_var,
      (seg_totals.rev_otb - seg_totals.rev_ly_actual) AS revenue_var,
      (seg_totals.rooms_budget - seg_totals.rooms_otb) AS rooms_budget_var,
      (seg_totals.rev_budget - seg_totals.rev_otb) AS revenue_budget_var,
      (seg_totals.rev_otb / nullif(seg_totals.rev_budget, 0)) AS budget_reach_pct,
      seg_totals.rooms_forecast AS rooms_forecast,
      seg_totals.rev_forecast AS rev_forecast,
      (seg_totals.rooms_forecast - seg_totals.rooms_otb) AS rooms_forecast_var,
      (seg_totals.rev_forecast - seg_totals.rev_otb) AS revenue_forecast_var
    FROM seg_totals
    LEFT JOIN cap_totals
      ON seg_totals.property_name = cap_totals.property_name
      AND seg_totals.stay_date = cap_totals.stay_date
      AND seg_totals.snapshot_date = cap_totals.snapshot_date;
  `;
    }

    function getSegmentPaceQuery(dataset: string) {
      return `
    WITH date_window AS (
      SELECT
        DATE_TRUNC(MIN(stay_date), YEAR) AS min_stay_date,
        DATE_ADD(DATE_TRUNC(MAX(stay_date), YEAR), INTERVAL 1 YEAR) AS max_stay_date_exclusive
      FROM \`${dataset}.vw_pace_property_current\`
    ),
    seg_totals AS (
      SELECT
        property_name,
        stay_date,
        segment,
        segment_group,
        SUM(rooms_otb) AS rooms_otb,
        SUM(rev_otb) AS rev_otb,
        SUM(rooms_stly) AS rooms_stly,
        SUM(rev_stly) AS rev_stly,
        SUM(rooms_ly_actual) AS rooms_ly_actual,
        SUM(rev_ly_actual) AS rev_ly_actual,
        SUM(rooms_budget) AS rooms_budget,
        SUM(rev_budget) AS rev_budget,
        SUM(rooms_forecast) AS rooms_forecast,
        SUM(rev_forecast) AS rev_forecast
      FROM \`${dataset}.vw_pace_segment_current\`
      WHERE stay_date >= (SELECT min_stay_date FROM date_window)
        AND stay_date < (SELECT max_stay_date_exclusive FROM date_window)
      GROUP BY property_name, stay_date, segment, segment_group
    ),
    cap_totals AS (
      SELECT
        property_name,
        stay_date,
        SUM(available_rooms) AS available_rooms
      FROM \`${dataset}.vw_pace_property_current\`
      WHERE stay_date >= (SELECT min_stay_date FROM date_window)
        AND stay_date < (SELECT max_stay_date_exclusive FROM date_window)
      GROUP BY property_name, stay_date
    )
    SELECT
      seg_totals.property_name,
      seg_totals.stay_date,
      seg_totals.segment AS segmentView,
      seg_totals.segment_group AS segmentGroup,
      (seg_totals.rooms_otb / nullif(cap_totals.available_rooms, 0)) * 100 AS occupancy,
      seg_totals.rooms_otb AS rooms,
      (seg_totals.rooms_otb - seg_totals.rooms_stly) AS varSTLY,
      (seg_totals.rooms_otb - seg_totals.rooms_ly_actual) AS varPriorYear,
      (seg_totals.rooms_budget - seg_totals.rooms_otb) AS varBudget,
      (seg_totals.rooms_forecast - seg_totals.rooms_otb) AS varForecast,
      (seg_totals.rev_otb / nullif(seg_totals.rooms_otb, 0)) AS aDR,
      seg_totals.rev_otb AS revenue,
      (seg_totals.rev_otb - seg_totals.rev_stly) AS revVarSTLY,
      (seg_totals.rev_otb - seg_totals.rev_ly_actual) AS revVarPriorYear,
      (seg_totals.rev_budget - seg_totals.rev_otb) AS revVarBudget,
      (seg_totals.rev_forecast - seg_totals.rev_otb) AS revVarForecast,
      cap_totals.available_rooms AS available_rooms
    FROM seg_totals
    LEFT JOIN cap_totals
      ON seg_totals.property_name = cap_totals.property_name
      AND seg_totals.stay_date = cap_totals.stay_date;
  `;
    }

    function getRoomtypeCurrentQuery(dataset: string) {
      return `
    WITH date_window AS (
      SELECT
        DATE_TRUNC(MIN(stay_date), YEAR) AS min_stay_date,
        DATE_ADD(DATE_TRUNC(MAX(stay_date), YEAR), INTERVAL 1 YEAR) AS max_stay_date_exclusive
      FROM \`${dataset}.vw_pace_property_current\`
    )
    SELECT *
    FROM \`${dataset}.vw_pace_roomtype_current\`
    WHERE stay_date >= (SELECT min_stay_date FROM date_window)
      AND stay_date < (SELECT max_stay_date_exclusive FROM date_window);
  `;
    }

    function getRoomtypeTrendQuery(dataset: string) {
      return `
    WITH date_window AS (
      SELECT
        DATE_TRUNC(MIN(stay_date), YEAR) AS min_stay_date,
        DATE_ADD(DATE_TRUNC(MAX(stay_date), YEAR), INTERVAL 1 YEAR) AS max_stay_date_exclusive
      FROM \`${dataset}.vw_pace_property_current\`
    )
    SELECT *
    FROM \`${dataset}.vw_pace_roomtype\`
    WHERE stay_date >= (SELECT min_stay_date FROM date_window)
      AND stay_date < (SELECT max_stay_date_exclusive FROM date_window)
      AND snapshot_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 24 MONTH);
  `;
    }

    async function syncPropertyPace(context: SyncContext) {
      await runQueryToParquet(context, getCurrentPaceQuery(HOTEL_DATASET), 'dashboard_current.parquet');
      await runQueryToParquet(context, getTrendPaceQuery(HOTEL_DATASET), 'dashboard_trend.parquet');
    }

    // ─── Segment Pickup: Phase 1 config ────────────────────────────────────────
    // We now sync from a single consolidated view that contains all pickup windows.
    // The columns are named r_chg_N__segment and v_chg_N__segment for current pickup,
    // and rooms_stly_chg_NNN_day__segment and rev_stly_chg_NNN_day__segment for STLY pickup.
    const PICKUP_WINDOWS = [
      { days: 1,   chg: '001_day' },
      { days: 3,   chg: '003_day' },
      { days: 7,   chg: '007_day' },
      { days: 14,  chg: '014_day' },
      { days: 21,  chg: '021_day' },
      { days: 30,  chg: '030_day' },
      { days: 60,  chg: '060_day' },
      { days: 90,  chg: '090_day' },
      { days: 120, chg: '120_day' },
    ] as const;

    // Segment column suffixes that exist in the consolidated pickup view
    const PICKUP_SEGMENTS = [
      'complimentary',
      'group_association',
      'group_citywide',
      'group_corporate',
      'group_entertainment',
      'group_government',
      'group_smerf',
      'group_social',
      'group_tour',
      'group_wedding',
      'transient_consortia',
      'transient_government',
      'transient_negotiated',
      'transient_opaque',
      'transient_package',
      'transient_packages',
      'transient_promotion',
      'transient_qualified',
      'transient_retail',
      'transient_unqualified',
    ] as const;

    // Roomtype column suffixes that exist in the consolidated pickup view
    const PICKUP_ROOMTYPES = [
      'commissioner_suite',
      'deluxe_king',
      'foundation_king',
      'foundation_king_ada',
      'foundation_two_queen',
      'junior_suite',
      'king_guestroom',
      'secretary_suite',
      'two_queen_guestroom',
      'two_queen_guestroom_ada',
    ] as const;

    // ─── Phase 1: Sync the single consolidated BQ pickup view → raw parquet ────
    async function syncSegmentPickupRaw(context: SyncContext, dataset: string) {
      const bqQuery = `
        SELECT *
        FROM \`${dataset}.vw_pace_segment_change_by_period_current\`
      `;
      // We only have one raw parquet file now since the schema is consolidated.
      await runQueryToParquet(context, bqQuery, 'pickup_raw.parquet');
    }

    // ─── Phase 2: DuckDB transforms single raw view → long-format parquet ─────────
    // Reads pickup_raw.parquet, unpivots segment columns into rows,
    // then UNION ALLs all windows into dashboard_segment_pickup.parquet.
    async function buildSegmentPickupLongFormat(context: SyncContext) {
      requireParquetFiles(context, ['pickup_raw.parquet']);

      // Generate one SELECT block per window × segment combination.
      const blocks: string[] = [];
      const filePath = resolveOutputPath(context.publicDataDir, 'pickup_raw.parquet');
      for (const w of PICKUP_WINDOWS) {
        for (const seg of PICKUP_SEGMENTS) {
          blocks.push(`
            SELECT
              property_name,
              stay_month,
              stay_date,
              snapshot_date,
              ${w.days} AS period_days,
              '${seg}' AS segment,
              CAST(rooms_otb__${seg} AS INTEGER)          AS rooms_otb,
              CAST(rooms_stly__${seg} AS INTEGER)         AS rooms_stly,
              CAST(rev_otb__${seg} AS FLOAT)              AS rev_otb,
              CAST(rev_stly__${seg} AS FLOAT)             AS rev_stly,
              CAST(rooms_otb_chg_${w.chg}__${seg} AS INTEGER)            AS rooms_pickup,
              CAST(rooms_stly_chg_${w.chg}__${seg} AS INTEGER)           AS rooms_stly_pickup,
              CAST(rev_otb_chg_${w.chg}__${seg} AS FLOAT)                AS rev_pickup,
              CAST(rev_stly_chg_${w.chg}__${seg} AS FLOAT)               AS rev_stly_pickup
            FROM '${filePath}'`);
        }
      }

      const combinedQuery = `
        WITH combined AS (
          ${blocks.join('\n          UNION ALL')}
        )
        SELECT
          property_name,
          stay_month,
          stay_date,
          snapshot_date,
          period_days,
          segment,
          rooms_otb,
          rooms_stly,
          rev_otb,
          rev_stly,
          rooms_pickup,
          rooms_stly_pickup,
          rev_pickup,
          rev_stly_pickup,
          CASE WHEN rooms_pickup = 0 OR rooms_pickup IS NULL THEN NULL
               ELSE rev_pickup / rooms_pickup END AS adr_pickup,
          CASE WHEN rooms_stly_pickup = 0 OR rooms_stly_pickup IS NULL THEN NULL
               ELSE rev_stly_pickup / rooms_stly_pickup END AS adr_stly_pickup
        FROM combined
        ORDER BY stay_date, period_days, segment
      `;

      await runLocalQueryToParquet(context, combinedQuery, 'dashboard_segment_pickup.parquet');
    }

    async function syncSegmentPace(context: SyncContext) {
      await runQueryToParquet(context, getSegmentPaceQuery(HOTEL_DATASET), 'dashboard_segments.parquet');
      await syncSegmentPickupRaw(context, HOTEL_DATASET);
      await buildSegmentPickupLongFormat(context);
    }





    async function syncRoomtypePace(context: SyncContext) {
      await runQueryToParquet(context, getRoomtypeCurrentQuery(HOTEL_DATASET), 'dashboard_roomtypes.parquet');
      await runQueryToParquet(context, getRoomtypeTrendQuery(HOTEL_DATASET), 'dashboard_roomtype_trend.parquet');
      
      await syncRoomtypePickupRaw(context, HOTEL_DATASET);
      await buildRoomtypePickupLongFormat(context);
    }

    // ─── Phase 1: Sync the single consolidated BQ pickup view → raw parquet (Roomtypes) ────
    async function syncRoomtypePickupRaw(context: SyncContext, dataset: string) {
      const bqQuery = `
        SELECT *
        FROM \`${dataset}.vw_pace_roomtype_change_by_period_current\`
      `;
      await runQueryToParquet(context, bqQuery, 'roomtype_pickup_raw.parquet');
    }

    // ─── Phase 2: DuckDB transforms single raw view → long-format parquet (Roomtypes) ─────────
    async function buildRoomtypePickupLongFormat(context: SyncContext) {
      requireParquetFiles(context, ['roomtype_pickup_raw.parquet']);

      // Generate one SELECT block per window × roomtype combination.
      const blocks: string[] = [];
      const filePath = resolveOutputPath(context.publicDataDir, 'roomtype_pickup_raw.parquet');
      for (const w of PICKUP_WINDOWS) {
        for (const rt of PICKUP_ROOMTYPES) {
          blocks.push(`
            SELECT
              property_name,
              stay_month,
              stay_date,
              snapshot_date,
              ${w.days} AS period_days,
              '${rt}' AS roomtype,
              CAST(rooms_otb__${rt} AS INTEGER)          AS rooms_otb,
              CAST(rooms_stly__${rt} AS INTEGER)         AS rooms_stly,
              CAST(rev_otb__${rt} AS FLOAT)              AS rev_otb,
              CAST(rev_stly__${rt} AS FLOAT)             AS rev_stly,
              CAST(rooms_otb_chg_${w.chg}__${rt} AS INTEGER)            AS rooms_pickup,
              CAST(rooms_stly_chg_${w.chg}__${rt} AS INTEGER)           AS rooms_stly_pickup,
              CAST(rev_otb_chg_${w.chg}__${rt} AS FLOAT)                AS rev_pickup,
              CAST(rev_stly_chg_${w.chg}__${rt} AS FLOAT)               AS rev_stly_pickup
            FROM '${filePath}'`);
        }
      }

      const combinedQuery = `
        WITH combined AS (
          ${blocks.join('\n          UNION ALL')}
        )
        SELECT
          property_name,
          stay_month,
          stay_date,
          snapshot_date,
          period_days,
          roomtype,
          rooms_otb,
          rooms_stly,
          rev_otb,
          rev_stly,
          rooms_pickup,
          rooms_stly_pickup,
          rev_pickup,
          rev_stly_pickup,
          CASE WHEN rooms_pickup = 0 OR rooms_pickup IS NULL THEN NULL
               ELSE rev_pickup / rooms_pickup END AS adr_pickup,
          CASE WHEN rooms_stly_pickup = 0 OR rooms_stly_pickup IS NULL THEN NULL
               ELSE rev_stly_pickup / rooms_stly_pickup END AS adr_stly_pickup
        FROM combined
        ORDER BY stay_date, period_days, roomtype
      `;

      await runLocalQueryToParquet(context, combinedQuery, 'dashboard_roomtype_pickup.parquet');
    }

    async function syncDerivedPaceData(context: SyncContext) {
      await writePickupParquet(context);
      await writeDateAvailabilityManifest(context);
    }

    async function syncGa4Data(context: SyncContext) {
      const ga4Views = [
        'ga4_TrafficAcquisition_281286275',
        'ga4_UserAcquisition_281286275',
        'ga4_TechDetails_281286275',
        'ga4_Events_281286275',
        'ga4_PagesAndScreens_281286275',
      ];

      for (const view of ga4Views) {
        const parquetFilename = `${view}.parquet`;
        const localParquetPath = resolveOutputPath(context.publicDataDir, parquetFilename);
        const hasLocalParquet = fs.existsSync(localParquetPath);

        let queryStart = '';
        if (hasLocalParquet) {
          try {
            const rows = await runDuckDbQuery<{ max_date: string }>(
              context,
              `SELECT CAST(MAX(_DATA_DATE) AS VARCHAR) as max_date FROM '${localParquetPath}'`
            );
            if (rows.length > 0 && rows[0].max_date) {
              const d = new Date(rows[0].max_date);
              d.setDate(d.getDate() - 14);
              queryStart = d.toISOString().split('T')[0];
            }
          } catch (err) { console.warn(`Could not get max date for ${view}`); }
        }

        let bqQuery = `SELECT * FROM \`${GA4_DATASET}.${view}\``;
        if (queryStart) {
          bqQuery += ` WHERE _DATA_DATE >= CAST('${queryStart}' AS DATE)`;
          console.log(`\nIncremental fetch for ${view} starting ${queryStart}`);
        } else {
          console.log(`\nFull fetch for ${view}`);
        }

        const [job] = await context.bq.createQueryJob({ query: bqQuery, location: 'us-central1' });
        const [rows] = await job.getQueryResults();

        console.log(`Fetched ${rows.length} rows for ${parquetFilename}.`);
        if (rows.length === 0) continue;

        ensurePublicDataDir(context.publicDataDir);
        const tempJsonPath = path.join(process.cwd(), `temp_${parquetFilename}_bq_data.json`);

        const jsonND = rows.map((record) => {
          const row = { ...record } as Record<string, unknown>;
          for (const key in row) {
            if (row[key] && typeof row[key] === 'object' && 'value' in row[key]) {
              row[key] = (row[key] as { value: unknown }).value;
            }
          }
          return JSON.stringify(row);
        }).join('\n');
        fs.writeFileSync(tempJsonPath, jsonND);

        console.log(`Converting & merging data to ${parquetFilename} via DuckDB...`);

        await new Promise<void>((resolve, reject) => {
          let duckdbQuery = `COPY (SELECT * FROM read_json_auto('${tempJsonPath}')) TO '${localParquetPath}' (FORMAT PARQUET);`;

          if (queryStart && hasLocalParquet) {
            const tempParquetPath = path.join(context.publicDataDir, `temp_${parquetFilename}`);
            duckdbQuery = `
           COPY (
             SELECT * FROM '${localParquetPath}' WHERE _DATA_DATE < CAST('${queryStart}' AS DATE)
             UNION ALL
             SELECT * FROM read_json_auto('${tempJsonPath}')
           ) TO '${tempParquetPath}' (FORMAT PARQUET);
         `;

            context.db.run(duckdbQuery, (err: Error | null) => {
              if (fs.existsSync(tempJsonPath)) fs.unlinkSync(tempJsonPath);
              if (err) {
                reject(err);
              } else {
                fs.renameSync(tempParquetPath, localParquetPath);
                console.log(`✅ Successfully merged Parquet data to:\n${localParquetPath}`);
                resolve();
              }
            });
          } else {
            context.db.run(duckdbQuery, (err: Error | null) => {
              if (fs.existsSync(tempJsonPath)) fs.unlinkSync(tempJsonPath);
              if (err) { reject(err); } else {
                console.log(`✅ Successfully saved Parquet data to:\n${localParquetPath}`);
                resolve();
              }
            });
          }
        });
      }
    }

    function normalizeTargets(argv: string[]): Set<SyncTarget> {
      const rawTargets = argv.slice(2);
      if (rawTargets.length === 0 || rawTargets.includes('all')) {
        return new Set<SyncTarget>(['all']);
      }

      const validTargets: SyncTarget[] = [
        'ga4',
        'pace',
        'pace-property',
        'pace-segment',
        'pace-segment-pickup',
        'pace-roomtype',
        'pace-derived',
      ];

      const targets = new Set<SyncTarget>();
      for (const rawTarget of rawTargets) {
        if (!validTargets.includes(rawTarget as SyncTarget)) {
          throw new Error(`Unknown sync target "${rawTarget}"`);
        }
        targets.add(rawTarget as SyncTarget);
      }

      return targets;
    }

    async function syncData() {
      const context: SyncContext = {
        db,
        bq,
        publicDataDir: PUBLIC_DATA_DIR,
      };

      const targets = normalizeTargets(process.argv);

      if (targets.has('all') || targets.has('pace')) {
        await syncPropertyPace(context);
        await syncSegmentPace(context);
        await syncRoomtypePace(context);
        await syncDerivedPaceData(context);
      } else {
        const shouldRunProperty = targets.has('pace-property');
        const shouldRunSegment = targets.has('pace-segment');
        const shouldRunSegmentPickup = targets.has('pace-segment-pickup');
        const shouldRunRoomtype = targets.has('pace-roomtype');
        const shouldRunDerived = targets.has('pace-derived');

        if (shouldRunProperty) {
          await syncPropertyPace(context);
          await syncDerivedPaceData(context);
        }
        if (shouldRunSegment) {
          await syncSegmentPace(context);
        }
        if (shouldRunSegmentPickup && !shouldRunSegment) {
          await syncSegmentPickupRaw(context, HOTEL_DATASET);
          await buildSegmentPickupLongFormat(context);
        }
        if (shouldRunRoomtype) {
          await syncRoomtypePace(context);
        }
        if (shouldRunDerived && !shouldRunProperty) {
          await syncDerivedPaceData(context);
        }
      }

      if (targets.has('all') || targets.has('ga4')) {
        await syncGa4Data(context);
      }
    }

    syncData().catch((syncError) => {
      console.error(syncError);
      process.exitCode = 1;
    });
