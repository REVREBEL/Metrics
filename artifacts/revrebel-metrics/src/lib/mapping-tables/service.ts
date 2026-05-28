import { mappingTableMetadata, mappingTableRowsByKey } from "./fixtures"
import type { MappingTableMetadata, MappingTableRow } from "./types"

import type * as DbModuleTypes from "@/db/index"
import type * as SchemaModuleTypes from "@/db/schema"

type DbModule = typeof DbModuleTypes
type SchemaModule = typeof SchemaModuleTypes

async function getDbModules(): Promise<{
  db: DbModule["db"]
  schema: SchemaModule
  inArray: (col: unknown, vals: unknown[]) => unknown
} | null> {
  try {
    const [{ db }, schema, { inArray }] = await Promise.all([
      import(/* @vite-ignore */ "@/db/index"),
      import(/* @vite-ignore */ "@/db/schema"),
      import(/* @vite-ignore */ "drizzle-orm"),
    ])
    return { db, schema, inArray }
  } catch {
    return null
  }
}

export async function listMappingTables(): Promise<MappingTableMetadata[]> {
  const modules = await getDbModules()

  if (!modules) {
    return mappingTableMetadata
  }

  const { db, schema, inArray } = modules

  try {
    const rows = await db
      .select()
      .from(schema.dataLibraryTables)
      .where(
        (inArray as typeof import("drizzle-orm").inArray)(
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

    const mapped = rows.map((row) => {
      const fixture = metadataByKey.get(row.tableName)
      const uiMetadata = (row.uiMetadata ?? {}) as Record<string, unknown>

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
        approximateRowCount: Number(
          uiMetadata.approximateRowCount ?? fixture?.approximateRowCount ?? 0
        ),
        mappedRowCount: Number(
          uiMetadata.mappedRowCount ?? fixture?.mappedRowCount ?? 0
        ),
        partialRowCount: Number(
          uiMetadata.partialRowCount ?? fixture?.partialRowCount ?? 0
        ),
        unmappedRowCount: Number(
          uiMetadata.unmappedRowCount ?? fixture?.unmappedRowCount ?? 0
        ),
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
  const rows =
    mappingTableRowsByKey[tableKey as keyof typeof mappingTableRowsByKey]

  if (!rows) {
    throw new Error(`Mapping table ${tableKey} was not found`)
  }

  return rows
}
