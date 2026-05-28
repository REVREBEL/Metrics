import { BigQuery } from '@google-cloud/bigquery';
import { execSync } from 'child_process';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const opUri = process.env.BQ_SERVICE_ACCOUNT_OP_URI;
if (!opUri) throw new Error('no opUri');
const credentialJson = execSync(`op read "${opUri}" --no-newline`, { encoding: 'utf8' });
const bq = new BigQuery({ credentials: JSON.parse(credentialJson) });

async function check() {
  const [job] = await bq.createQueryJob({
    query: `SELECT table_name, column_name, data_type FROM \`devrebel-big-query-database.dev_hotel_analytics\`.INFORMATION_SCHEMA.COLUMNS WHERE table_name = 'vw_pace_segment_current' OR table_name = 'vw_pace_property_current'`,
    location: 'us-central1'
  });
  const [rows] = await job.getQueryResults();
  console.log(JSON.stringify(rows, null, 2));
}
check().catch(console.error);
