import { saveLookupTableChangesSchema } from "./schemas"
import { lookupTableMetadata, lookupTableRowsByKey } from "./fixtures"
import type {
  LookupTableMetadata,
  LookupTableRow,
  SaveLookupTableChangesPayload,
  SaveLookupTableChangesResult,
} from "./types"

export async function listLookupTables(): Promise<LookupTableMetadata[]> {
  return lookupTableMetadata
}

export async function getLookupTableRows(
  tableKey: string
): Promise<LookupTableRow[]> {
  const rows = lookupTableRowsByKey[tableKey]

  if (!rows) {
    throw new Error(`Lookup table ${tableKey} was not found`)
  }

  return rows
}

export async function saveLookupTableChanges(
  payload: SaveLookupTableChangesPayload
): Promise<SaveLookupTableChangesResult> {
  const parsed = saveLookupTableChangesSchema.safeParse(payload)

  if (!parsed.success) {
    return {
      ok: false,
      message: "Fix validation errors before saving.",
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  if (!lookupTableRowsByKey[parsed.data.tableKey]) {
    return {
      ok: false,
      message: "Lookup table was not found.",
    }
  }

  return {
    ok: true,
    savedAt: new Date().toISOString(),
    message: `${parsed.data.changes.length} row change${
      parsed.data.changes.length === 1 ? "" : "s"
    } queued for persistence.`,
  }
}
