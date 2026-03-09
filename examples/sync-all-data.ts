import { BigQuery } from '@google-cloud/bigquery';
import * as duckdb from 'duckdb';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { loadEnvConfig } from '@next/env';

// Load environment variables from .env
const projectDir = process.cwd();
loadEnvConfig(projectDir);

let bqConfig = {};

// Try reading credentials dynamically using 1Password CLI
try {
  console.log('Fetching Google Service Account credentials via 1Password CLI...');
  const opUri = process.env.BQ_SERVICE_ACCOUNT_OP_URI;
  if (!opUri) {
    throw new Error('BQ_SERVICE_ACCOUNT_OP_URI is not defined in .env');
  }
  // Note: Ensure the 1Password CLI (op) is authenticated and available in your environment.
  const credentialJson = execSync(`op read "${opUri}" --no-newline`, { encoding: 'utf8' });
  bqConfig = { credentials: JSON.parse(credentialJson) };
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  console.warn("Could not read credentials from 1Password. Falling back to Application Default Credentials or GOOGLE_APPLICATION_CREDENTIALS.", message);
}

// Initialize BigQuery client
const bq = new BigQuery(bqConfig);

// Initialize DuckDB in memory
const db = new duckdb.Database(':memory:');

async function runQueryToParquet(db: duckdb.Database, bq: BigQuery, query: string, outputFilename: string) {
  console.log(`\nExecuting BigQuery for ${outputFilename}...`);
  const [job] = await bq.createQueryJob({ query, location: 'us-central1' });
  const [rows] = await job.getQueryResults();

  console.log(`Fetched ${rows.length} rows for ${outputFilename}.`);
  if (rows.length === 0) {
    console.log(`No data found for ${outputFilename}. Skipping.`);
    return;
  }

  const publicDataDir = path.join(process.cwd(), 'public', 'data');
  const tempJsonPath = path.join(process.cwd(), `temp_${outputFilename}_bq_data.json`);
  const outputPath = path.join(publicDataDir, outputFilename);

  if (!fs.existsSync(publicDataDir)) {
    fs.mkdirSync(publicDataDir, { recursive: true });
  }

  // Handle BigQuery's Date formats automatically (BigQuery DATE objects stringify to {value: '...'})
  const jsonND = rows.map(r => {
    const row = { ...r } as Record<string, unknown>;
    for (const key in row) {
      // Flatten BigQuery Date/Datetime/Timestamp objects
      if (row[key] && typeof row[key] === 'object' && 'value' in row[key]) {
        row[key] = row[key].value;
      }
    }
    return JSON.stringify(row);
  }).join('\n');
  fs.writeFileSync(tempJsonPath, jsonND);

  console.log(`Converting data to ${outputFilename} via DuckDB...`);

  return new Promise<void>((resolve, reject) => {
    db.run(`
      COPY (
        SELECT * FROM read_json_auto('${tempJsonPath}')
      ) TO '${outputPath}' (FORMAT PARQUET);
    `, (err: Error | null) => {
      if (fs.existsSync(tempJsonPath)) fs.unlinkSync(tempJsonPath);

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

async function runLocalQueryToParquet(
  db: duckdb.Database,
  query: string,
  outputFilename: string,
) {
  const publicDataDir = path.join(process.cwd(), 'public', 'data');
  const outputPath = path.join(publicDataDir, outputFilename);

  if (!fs.existsSync(publicDataDir)) {
    fs.mkdirSync(publicDataDir, { recursive: true });
  }

  return new Promise<void>((resolve, reject) => {
    db.run(`COPY (${query}) TO '${outputPath}' (FORMAT PARQUET);`, (err: Error | null) => {
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
  db: duckdb.Database,
  query: string,
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    db.all(query, (err: Error | null, rows: T[]) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(rows);
    });
  });
}

async function writeDateAvailabilityManifest(db: duckdb.Database) {
  const publicDataDir = path.join(process.cwd(), 'public', 'data');
  const outputPath = path.join(publicDataDir, 'dashboard_date_availability.json');

  const rows = await runDuckDbQuery<{
    year: number;
    months: string;
    min_date: string;
    max_date: string;
  }>(
    db,
    `
      WITH dates AS (
        SELECT DISTINCT CAST(stay_date AS DATE) AS stay_date
        FROM '${path.join(publicDataDir, 'dashboard_current.parquet')}'
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

  fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`✅ Wrote date availability manifest to:\n${outputPath}`);
}

async function writePickupParquet(db: duckdb.Database) {
  const publicDataDir = path.join(process.cwd(), 'public', 'data');
  const currentPath = path.join(publicDataDir, 'dashboard_current.parquet');
  const trendPath = path.join(publicDataDir, 'dashboard_trend.parquet');

  await runLocalQueryToParquet(
    db,
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

async function syncData() {
  const dataset = 'devrebel-big-query-database.dev_hotel_analytics';

  // 1. Current Snapshot Query for KPI Dashboards
  const currentQuery = `
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
        SUM(rooms_otb) as rooms_otb,
        SUM(rev_otb) as rev_otb,
        SUM(rooms_ly_actual) as rooms_ly_actual,
        SUM(rev_ly_actual) as rev_ly_actual,
        SUM(rooms_budget) as rooms_budget,
        SUM(rev_budget) as rev_budget
      FROM \`${dataset}.vw_pace_segment_current\`
      WHERE stay_date >= (SELECT min_stay_date FROM date_window)
        AND stay_date < (SELECT max_stay_date_exclusive FROM date_window)
      GROUP BY property_name, stay_date
    ),
    cap_totals AS (
      SELECT
        property_name,
        stay_date,
        SUM(available_rooms) as available_rooms
      FROM \`${dataset}.vw_pace_property_current\`
      WHERE stay_date >= (SELECT min_stay_date FROM date_window)
        AND stay_date < (SELECT max_stay_date_exclusive FROM date_window)
      GROUP BY property_name, stay_date
    )
    SELECT
      seg_totals.property_name,
      seg_totals.stay_date,

      seg_totals.rooms_otb as rooms_cy,
      seg_totals.rev_otb as revenue_cy,
      seg_totals.rooms_ly_actual as rooms_ly_actual,
      seg_totals.rev_ly_actual as rev_ly_actual,
      seg_totals.rev_budget as rev_budget,
      seg_totals.rooms_budget as rooms_budget,
      cap_totals.available_rooms as available_rooms,

      -- Calculated Metrics
      (seg_totals.rooms_otb / nullif(cap_totals.available_rooms, 0)) as occ_cy,
      (seg_totals.rooms_ly_actual / nullif(cap_totals.available_rooms, 0)) as occ_py,
      (seg_totals.rooms_budget / nullif(cap_totals.available_rooms, 0)) as occ_budget,
      (seg_totals.rev_otb / nullif(seg_totals.rooms_otb, 0)) as adr_cy,
      (seg_totals.rev_ly_actual / nullif(seg_totals.rooms_ly_actual, 0)) as adr_py,
      (seg_totals.rev_budget / nullif(seg_totals.rooms_budget, 0)) as adr_budget,
      (seg_totals.rev_otb / nullif(cap_totals.available_rooms, 0)) as revpar_cy,
      (seg_totals.rev_ly_actual / nullif(cap_totals.available_rooms, 0)) as revpar_py,
      (seg_totals.rev_budget / nullif(cap_totals.available_rooms, 0)) as revpar_budget,

      -- Variances
      ((seg_totals.rooms_otb / nullif(cap_totals.available_rooms, 0)) - (seg_totals.rooms_ly_actual / nullif(cap_totals.available_rooms, 0))) as occ_var,
      ((seg_totals.rev_otb / nullif(seg_totals.rooms_otb, 0)) - (seg_totals.rev_ly_actual / nullif(seg_totals.rooms_ly_actual, 0))) as adr_var,
      ((seg_totals.rev_otb / nullif(cap_totals.available_rooms, 0)) - (seg_totals.rev_ly_actual / nullif(cap_totals.available_rooms, 0))) as revpar_var,
      ((seg_totals.rooms_budget / nullif(cap_totals.available_rooms, 0)) - (seg_totals.rooms_otb / nullif(cap_totals.available_rooms, 0))) as occ_budget_var,
      ((seg_totals.rev_budget / nullif(seg_totals.rooms_budget, 0)) - (seg_totals.rev_otb / nullif(seg_totals.rooms_otb, 0))) as adr_budget_var,
      ((seg_totals.rev_budget / nullif(cap_totals.available_rooms, 0)) - (seg_totals.rev_otb / nullif(cap_totals.available_rooms, 0))) as revpar_budget_var,
      (seg_totals.rooms_otb - seg_totals.rooms_ly_actual) as rooms_var,
      (seg_totals.rev_otb - seg_totals.rev_ly_actual) as revenue_var,
      (seg_totals.rooms_budget - seg_totals.rooms_otb) as rooms_budget_var,
      (seg_totals.rev_budget - seg_totals.rev_otb) as revenue_budget_var,
      (seg_totals.rev_budget - seg_totals.rev_otb) as rev_to_budget,
      (seg_totals.rev_otb / nullif(seg_totals.rev_budget, 0)) as budget_reach_pct
    FROM seg_totals
    LEFT JOIN cap_totals
      ON seg_totals.property_name = cap_totals.property_name
      AND seg_totals.stay_date = cap_totals.stay_date;
  `;

  // 2. Trend Snapshot Query for Historically Paced Data
  const trendQuery = `
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
        SUM(rooms_otb) as rooms_otb,
        SUM(rev_otb) as rev_otb,
        SUM(rooms_ly_actual) as rooms_ly_actual,
        SUM(rev_ly_actual) as rev_ly_actual,
        SUM(rooms_budget) as rooms_budget,
        SUM(rev_budget) as rev_budget
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
        SUM(available_rooms) as available_rooms
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

      seg_totals.rooms_otb as rooms_cy,
      seg_totals.rev_otb as revenue_cy,
      seg_totals.rooms_ly_actual as rooms_ly_actual,
      seg_totals.rev_ly_actual as rev_ly_actual,
      seg_totals.rev_budget as rev_budget,
      seg_totals.rooms_budget as rooms_budget,
      cap_totals.available_rooms as available_rooms,

      -- Calculated Metrics
      (seg_totals.rooms_otb / nullif(cap_totals.available_rooms, 0)) as occ_cy,
      (seg_totals.rooms_ly_actual / nullif(cap_totals.available_rooms, 0)) as occ_py,
      (seg_totals.rooms_budget / nullif(cap_totals.available_rooms, 0)) as occ_budget,
      (seg_totals.rev_otb / nullif(seg_totals.rooms_otb, 0)) as adr_cy,
      (seg_totals.rev_ly_actual / nullif(seg_totals.rooms_ly_actual, 0)) as adr_py,
      (seg_totals.rev_budget / nullif(seg_totals.rooms_budget, 0)) as adr_budget,
      (seg_totals.rev_otb / nullif(cap_totals.available_rooms, 0)) as revpar_cy,
      (seg_totals.rev_ly_actual / nullif(cap_totals.available_rooms, 0)) as revpar_py,
      (seg_totals.rev_budget / nullif(cap_totals.available_rooms, 0)) as revpar_budget
    FROM seg_totals
    LEFT JOIN cap_totals
      ON seg_totals.property_name = cap_totals.property_name
      AND seg_totals.stay_date = cap_totals.stay_date
      AND seg_totals.snapshot_date = cap_totals.snapshot_date;
  `;

  // 3. Segment Snapshot Query for Datagrid Tables
  const segmentCurrentQuery = `
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
        SUM(rooms_otb) as rooms_otb,
        SUM(rev_otb) as rev_otb,
        SUM(rooms_stly) as rooms_stly,
        SUM(rooms_ly_actual) as rooms_ly_actual,
        SUM(rooms_budget) as rooms_budget,
        SUM(rev_budget) as rev_budget,
        SUM(rooms_forecast) as rooms_forecast
      FROM \`${dataset}.vw_pace_segment_current\`
      WHERE stay_date >= (SELECT min_stay_date FROM date_window)
        AND stay_date < (SELECT max_stay_date_exclusive FROM date_window)
      GROUP BY property_name, stay_date, segment, segment_group
    ),
    cap_totals AS (
      SELECT
        property_name,
        stay_date,
        SUM(available_rooms) as available_rooms
      FROM \`${dataset}.vw_pace_property_current\`
      WHERE stay_date >= (SELECT min_stay_date FROM date_window)
        AND stay_date < (SELECT max_stay_date_exclusive FROM date_window)
      GROUP BY property_name, stay_date
    )
    SELECT
      seg_totals.property_name,
      seg_totals.stay_date,
      seg_totals.segment as segmentView,
      seg_totals.segment_group as segmentGroup,

      -- Calculated Metrics
      (seg_totals.rooms_otb / nullif(cap_totals.available_rooms, 0)) * 100 as occupancy,
      seg_totals.rooms_otb as rooms,
      
      -- Variances
      (seg_totals.rooms_otb - seg_totals.rooms_stly) as varSTLY,
      (seg_totals.rooms_otb - seg_totals.rooms_ly_actual) as varPriorYear,
      (seg_totals.rooms_budget - seg_totals.rooms_otb) as varBudget,
      (seg_totals.rooms_forecast - seg_totals.rooms_otb) as varForecast,
      
      (seg_totals.rev_otb / nullif(seg_totals.rooms_otb, 0)) as aDR,
      seg_totals.rev_otb as revenue,
      cap_totals.available_rooms as available_rooms
    FROM seg_totals
    LEFT JOIN cap_totals
      ON seg_totals.property_name = cap_totals.property_name
      AND seg_totals.stay_date = cap_totals.stay_date;
  `;

  await runQueryToParquet(db, bq, currentQuery, 'dashboard_current.parquet');
  await runQueryToParquet(db, bq, trendQuery, 'dashboard_trend.parquet');
  await runQueryToParquet(db, bq, segmentCurrentQuery, 'dashboard_segments.parquet');
  await writePickupParquet(db);
  await writeDateAvailabilityManifest(db);

  // GA4 Data Sync
  const ga4Dataset = 'devrebel-big-query-database.dev_hotel_g4a';
  const ga4Views = [
    'ga4_TrafficAcquisition_281286275',
    'ga4_UserAcquisition_281286275',
    'ga4_TechDetails_281286275',
    'ga4_Events_281286275',
    'ga4_PagesAndScreens_281286275',
  ];

  for (const view of ga4Views) {
    const query = `SELECT * FROM \`${ga4Dataset}.${view}\``;
    await runQueryToParquet(db, bq, query, `${view}.parquet`);
  }
}

syncData().catch(console.error);
