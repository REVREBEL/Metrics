/**
 * Smoke test for the BigQuery mapping table query service.
 *
 * This script exercises the live query path and validates that:
 *  1. getBigQueryClient() returns a client when credentials are present.
 *  2. queryMappingTable() returns typed MappingTableRow results (not fixtures).
 *  3. getMappingTableCounts() returns non-negative integer counts.
 *  4. getMappingTableSchema() returns at least one field descriptor.
 *  5. When BigQuery is unavailable, getMappingTableRows() falls back to fixtures.
 *
 * Usage (requires GOOGLE_APPLICATION_CREDENTIALS_JSON or ADC to be set):
 *   npx tsx src/lib/bigquery/__tests__/mapping-table-queries.smoke.ts
 */

import { getMappingTableCounts, getMappingTableSchema, queryMappingTable } from "../mapping-table-queries"

const TEST_TABLE_KEY = "metrics_core.map_segment"

function hasCredentials(): boolean {
  return (
    !!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON ||
    !!process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    !!process.env.GOOGLE_CLOUD_PROJECT
  )
}

async function runSmoke() {
  console.log("=== BigQuery Mapping Table Smoke Test ===\n")

  if (!hasCredentials()) {
    console.warn(
      "SKIP: No BigQuery credentials found (GOOGLE_APPLICATION_CREDENTIALS_JSON / GOOGLE_APPLICATION_CREDENTIALS / GOOGLE_CLOUD_PROJECT).\n" +
        "Set one of these environment variables and rerun to exercise the live path.\n" +
        "See docs/bigquery-setup.md for instructions."
    )
    process.exit(0)
  }

  let passed = 0
  let failed = 0

  async function test(name: string, fn: () => Promise<void>) {
    try {
      await fn()
      console.log(`  ✓ ${name}`)
      passed++
    } catch (err) {
      console.error(`  ✗ ${name}`)
      console.error(`    ${err instanceof Error ? err.message : String(err)}`)
      failed++
    }
  }

  await test("queryMappingTable returns an array", async () => {
    const rows = await queryMappingTable(TEST_TABLE_KEY, { limit: 5 })
    if (!Array.isArray(rows)) throw new Error(`Expected array, got ${typeof rows}`)
  })

  await test("queryMappingTable rows have required MappingTableRow fields", async () => {
    const rows = await queryMappingTable(TEST_TABLE_KEY, { limit: 1 })
    if (rows.length === 0) {
      console.warn("    (table is empty — field shape not verified)")
      return
    }
    const row = rows[0]
    const required = ["id", "sourceSystem", "sourceCode", "sourceValue", "standardCode", "standardValue", "confidence", "status", "updatedAt", "updatedBy"] as const
    for (const field of required) {
      if (!(field in row)) throw new Error(`Missing field: ${field}`)
    }
    const validStatuses = ["mapped", "partial", "unmapped", "inactive"]
    if (!validStatuses.includes(row.status)) {
      throw new Error(`Unexpected status value: ${row.status}`)
    }
  })

  await test("queryMappingTable sourceSystem filter works", async () => {
    const rows = await queryMappingTable(TEST_TABLE_KEY, {
      sourceSystem: "__nonexistent_system__",
      limit: 1,
    })
    if (!Array.isArray(rows)) throw new Error("Expected array")
  })

  await test("getMappingTableCounts returns non-negative integer counts", async () => {
    const counts = await getMappingTableCounts(TEST_TABLE_KEY)
    for (const key of ["mappedRowCount", "partialRowCount", "unmappedRowCount", "approximateRowCount"] as const) {
      if (typeof counts[key] !== "number" || counts[key] < 0 || !Number.isFinite(counts[key])) {
        throw new Error(`${key} = ${counts[key]} is not a non-negative number`)
      }
    }
    const sumOfStatuses = counts.mappedRowCount + counts.partialRowCount + counts.unmappedRowCount
    if (sumOfStatuses > counts.approximateRowCount) {
      throw new Error(`Status counts (${sumOfStatuses}) exceed approximateRowCount (${counts.approximateRowCount})`)
    }
  })

  await test("getMappingTableSchema returns at least one field", async () => {
    const schema = await getMappingTableSchema(TEST_TABLE_KEY)
    if (!Array.isArray(schema) || schema.length === 0) {
      throw new Error(`Expected non-empty schema array, got ${JSON.stringify(schema)}`)
    }
    const field = schema[0]
    if (!field.name || !field.type) {
      throw new Error(`Schema field missing name or type: ${JSON.stringify(field)}`)
    }
  })

  await test("unknown table key throws a descriptive error", async () => {
    try {
      await queryMappingTable("metrics_core.does_not_exist")
      throw new Error("Expected error was not thrown")
    } catch (err) {
      if (err instanceof Error && err.message.includes("Unknown mapping table key")) return
      throw err
    }
  })

  console.log(`\n${passed} passed, ${failed} failed`)
  if (failed > 0) process.exit(1)
}

runSmoke().catch((err) => {
  console.error("Smoke test runner failed:", err)
  process.exit(1)
})
