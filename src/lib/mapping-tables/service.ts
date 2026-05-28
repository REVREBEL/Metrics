import { inArray } from "drizzle-orm"

import { mappingTableMetadata, mappingTableRowsByKey } from "./fixtures"
import type { MappingTableMetadata, MappingTableRow } from "./types"

import type * as DbModuleTypes from "@/db/index"
import type * as SchemaModuleTypes from "@/db/schema"

type DbModule = typeof DbModuleTypes
type SchemaModule = typeof SchemaModuleTypes

async function getDbModules(): Promise<{
  db: DbModule["db"]
  schema: SchemaModule
} | null> {
  try {
    const [{ db }, schema] = await Promise.all([
      import("@/db/index"),
      import("@/db/schema"),
    ])
    return { db, schema }
  } catch {
    return null
  }
}

async function tryGetBigQueryCounts(
  tableKey: string
): Promise<
  | {
      mappedRowCount: number
      partialRowCount: number
      unmappedRowCount: number
      approximateRowCount: number
    }
  | null
> {
  try {
    const { getMappingTableCounts } = await import(
      "@/lib/bigquery/mapping-table-queries"
    )
    return await getMappingTableCounts(tableKey)
  } catch (err) {
    console.warn(
      `[mapping-tables] BigQuery count query failed for "${tableKey}", falling back to fixture counts.`,
      "To enable live counts, configure BigQuery credentials (see docs/bigquery-setup.md).",
      err instanceof Error ? err.message : err
    )
    return null
  }
}

export async function listMappingTables(): Promise<MappingTableMetadata[]> {
  const modules = await getDbModules()

  if (!modules) {
    return mappingTableMetadata
  }

  const { db, schema } = modules

  try {
    const rows = await db
      .select()
      .from(schema.dataLibraryTables)
      .where(
        inArray(
          schema.dataLibraryTables.tableName,
          mappingTableMetadata.map((table) => table.key)
        )
      )

    if (rows.length === 0) {
      return mappingTableMetadata
    }

    const metadataByKey = new Map(
      mappingTableMetadata.map((table) => [table.key, table])
    )

    const bqCountsResults = await Promise.all(
      rows.map(async (row) => {
        const counts = await tryGetBigQueryCounts(row.tableName)
        return { tableName: row.tableName, counts }
      })
    )

    const bqCountsByKey = new Map(
      bqCountsResults.map(({ tableName, counts }) => [tableName, counts])
    )

    const mapped = rows.map((row) => {
      const fixture = metadataByKey.get(row.tableName)
      const uiMetadata = (row.uiMetadata ?? {}) as Record<string, unknown>
      const bqCounts = bqCountsByKey.get(row.tableName) ?? null

      return {
        key: row.tableName,
        displayName: row.displayName ?? fixture?.displayName ?? row.tableName,
        description: row.description ?? fixture?.description ?? "",
        sourceTableName:
          String(uiMetadata.sourceTableName ?? "") ||
          fixture?.sourceTableName ||
          "",
        standardTableName:
          String(uiMetadata.standardTableName ?? "") ||
          fixture?.standardTableName ||
          "",
        category: String(uiMetadata.category ?? "") || fixture?.category || "",
        approximateRowCount:
          bqCounts?.approximateRowCount ??
          Number(uiMetadata.approximateRowCount ?? fixture?.approximateRowCount ?? 0),
        mappedRowCount:
          bqCounts?.mappedRowCount ??
          Number(uiMetadata.mappedRowCount ?? fixture?.mappedRowCount ?? 0),
        partialRowCount:
          bqCounts?.partialRowCount ??
          Number(uiMetadata.partialRowCount ?? fixture?.partialRowCount ?? 0),
        unmappedRowCount:
          bqCounts?.unmappedRowCount ??
          Number(uiMetadata.unmappedRowCount ?? fixture?.unmappedRowCount ?? 0),
        lastUpdated: String(
          uiMetadata.lastUpdated ??
            fixture?.lastUpdated ??
            row.createdAt.toISOString()
        ),
        lastRefreshed: String(
          uiMetadata.lastRefreshed ??
            fixture?.lastRefreshed ??
            row.createdAt.toISOString()
        ),
        status:
          (uiMetadata.status as MappingTableMetadata["status"]) ??
          fixture?.status ??
          "needs_review",
        requiredPermission:
          String(uiMetadata.requiredPermission ?? "") ||
          fixture?.requiredPermission ||
          "data_library.mapping_tables.view",
      }
    })

    return mapped.sort((a, b) => a.displayName.localeCompare(b.displayName))
  } catch {
    return mappingTableMetadata
  }
}

export async function getMappingTableRows(
  tableKey: string
): Promise<MappingTableRow[]> {
  try {
    const { queryMappingTable } = await import(
      "@/lib/bigquery/mapping-table-queries"
    )
    return await queryMappingTable(tableKey)
  } catch (err) {
    console.warn(
      `[mapping-tables] BigQuery row query failed for "${tableKey}", falling back to fixtures.`,
      "To enable live data, configure BigQuery credentials (see docs/bigquery-setup.md).",
      err instanceof Error ? err.message : err
    )
  }

  const rows =
    mappingTableRowsByKey[tableKey as keyof typeof mappingTableRowsByKey]

  if (!rows) {
    throw new Error(`Mapping table ${tableKey} was not found`)
  }

  return rows
}
