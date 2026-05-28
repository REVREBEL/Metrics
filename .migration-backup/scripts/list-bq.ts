import { BigQuery } from '@google-cloud/bigquery';
import { execSync } from 'child_process';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());
let bqConfig = {};
try {
  const opUri = process.env.BQ_SERVICE_ACCOUNT_OP_URI;
  if (opUri) {
    const credentialJson = execSync(`op read "${opUri}" --no-newline`, { encoding: 'utf8' });
    bqConfig = { credentials: JSON.parse(credentialJson) };
  }
} catch (error) {}

const bq = new BigQuery(bqConfig);
async function list() {
  const dataset = bq.dataset('dev_hotel_g4a');
  const [rows] = await dataset.table('ga4_TrafficAcquisition_281286275').query({ query: 'SELECT _DATA_DATE, sessionSource, sessions, engagedSessions FROM `devrebel-big-query-database.dev_hotel_g4a.ga4_TrafficAcquisition_281286275` LIMIT 5' });
  console.log(rows);
}
list().catch(console.error);
