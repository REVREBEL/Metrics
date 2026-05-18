"use server"

import {
  getLookupTableRows,
  saveLookupTableChanges,
} from "@/lib/lookup-tables/service"
import type { SaveLookupTableChangesPayload } from "@/lib/lookup-tables/types"

export async function getLookupTableRowsAction(tableKey: string) {
  return getLookupTableRows(tableKey)
}

export async function saveLookupTableChangesAction(
  payload: SaveLookupTableChangesPayload
) {
  return saveLookupTableChanges(payload)
}
