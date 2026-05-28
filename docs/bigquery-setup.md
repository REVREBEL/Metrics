# BigQuery Setup

This document explains how to configure BigQuery credentials and dataset settings for local development and production deployment.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GOOGLE_APPLICATION_CREDENTIALS_JSON` | Recommended | Service account key JSON as a single-line string. This is the primary credential source at runtime. |
| `GOOGLE_APPLICATION_CREDENTIALS` | Alternative | Path to a service account key JSON file on disk. Used as a fallback when the JSON string variable is not set. |
| `BQ_PROJECT_ID` | Optional | GCP project ID. Defaults to `devrebel-big-query-database`. |
| `BQ_DATASET_ID` | Optional | BigQuery dataset ID. Defaults to `dev_hotel_analytics`. |
| `BQ_DATA_LOCATION` | Optional | BigQuery dataset region/location. Defaults to `us-central1`. Set this if your dataset lives in a different region (e.g. `us-east1`, `europe-west1`). |

## Credential Resolution Order

The BigQuery client resolves credentials in this order:

1. **`GOOGLE_APPLICATION_CREDENTIALS_JSON`** — Parses the service account key JSON directly from the environment variable string. This is the recommended approach on Replit and other PaaS environments where file-based secrets are inconvenient.
2. **Application Default Credentials** — Falls back to ADC if `GOOGLE_APPLICATION_CREDENTIALS` or `GOOGLE_CLOUD_PROJECT` is detected in the environment (e.g. `gcloud auth application-default login` in local development, or a Workload Identity-enabled GKE pod in production).

If no credentials are available, the application will fall back to fixture data with a logged warning rather than crashing.

## Local Development Setup

### Option A: Using the JSON environment variable (recommended)

1. Obtain a service account key JSON file for the `devrebel-big-query-database` project.
2. Minify the JSON to a single line (e.g. `jq -c . < key.json`).
3. Add it to your `.env.local` file:

```
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account","project_id":"devrebel-big-query-database",...}
```

### Option B: Using a key file and ADC

1. Place your service account key file on disk (e.g. `~/.config/gcloud/my-sa-key.json`).
2. Set the path in `.env.local`:

```
GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/service-account-key.json
```

### Option C: gcloud ADC (development only)

Run `gcloud auth application-default login` and ensure the active project is `devrebel-big-query-database`. The BigQuery client will pick up ADC automatically.

## Production (Replit) Setup

Set `GOOGLE_APPLICATION_CREDENTIALS_JSON` as a Replit secret. Paste the full service account JSON as the value — Replit secrets handle newlines and special characters correctly.

## Dataset and Table Configuration

All mapping table keys (e.g. `metrics_core.map_segment`) are mapped to their BigQuery table references in `src/lib/bigquery/config.ts`. The defaults are:

- **Project**: `devrebel-big-query-database`
- **Dataset**: `dev_hotel_analytics`
- **Location**: `us-central1`

To point at a different dataset or region (e.g. a staging environment), set `BQ_PROJECT_ID`, `BQ_DATASET_ID`, and/or `BQ_DATA_LOCATION` in your environment. The location is passed both to the BigQuery client constructor (as the default query location) and to each individual query, so you only need to set it once.

## Expected Table Schema

Each mapping table in BigQuery is expected to have the following columns. Column names that differ will cause rows to be mapped with empty/default values.

| Column | Type | Description |
|---|---|---|
| `id` | STRING or INTEGER | Unique row identifier |
| `source_system` | STRING | Source system name (e.g. `PMS`, `CRS`) |
| `source_code` | STRING | Raw code from the source system |
| `source_value` | STRING | Human-readable label for the source code |
| `standard_code` | STRING | Canonical code in the standard taxonomy |
| `standard_value` | STRING | Human-readable label for the standard code |
| `standard_group` | STRING | Optional grouping for the standard code |
| `confidence` | FLOAT64 | Mapping confidence score (0–100) |
| `mapping_status` | STRING | One of: `mapped`, `partial`, `unmapped`, `inactive` |
| `review_reason` | STRING | Optional explanation for partial/unmapped status |
| `updated_at` | TIMESTAMP | Last modification time |
| `updated_by` | STRING | Author of the last update |

## Fallback Behavior

When BigQuery credentials are unavailable or a query fails:

- `getMappingTableRows` returns static fixture data from `src/lib/mapping-tables/fixtures.ts`.
- `listMappingTables` uses fixture row counts rather than live BigQuery aggregation counts.
- A warning is logged to the server console in both cases so developers are aware that live data is not being served.
