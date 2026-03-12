#!/usr/bin/env bash

set -euo pipefail

PROJECT_ID="devrebel-big-query-database"

DATASETS=(
  "dev_hotel_analytics"
  "dev_hotel_g4a"
  "dev_hotel_costar"
)

OUTPUT_DIR="../public/duckdb/bq_schemas"
mkdir -p "$OUTPUT_DIR"

for DATASET_ID in "${DATASETS[@]}"; do
  echo ""
  echo "Processing dataset: $PROJECT_ID:$DATASET_ID"

  DATASET_OUTPUT_DIR="$OUTPUT_DIR/$DATASET_ID"
  mkdir -p "$DATASET_OUTPUT_DIR"

  TABLE_LIST=$(bq ls --format=prettyjson "${PROJECT_ID}:${DATASET_ID}")

  TABLE_NAMES=$(echo "$TABLE_LIST" | jq -r '.[].tableReference.tableId // empty')

  if [ -z "$TABLE_NAMES" ]; then
    echo "  No tables found, or bq ls returned nothing for ${PROJECT_ID}:${DATASET_ID}"
    continue
  fi

  echo "  Tables found:"
  echo "$TABLE_NAMES" | sed 's/^/    - /'

  while IFS= read -r table; do
    [ -z "$table" ] && continue

    echo "  Exporting schema for $DATASET_ID.$table..."
    bq show --schema --format=prettyjson \
      "${PROJECT_ID}:${DATASET_ID}.${table}" \
      > "${DATASET_OUTPUT_DIR}/${table}_schema.json"
  done <<< "$TABLE_NAMES"
done

echo ""
echo "All schemas exported successfully."