"use server"

import { getMappingTableRows } from "@/lib/mapping-tables/service"

export async function getMappingTableRowsAction(tableKey: string) {
  return getMappingTableRows(tableKey)
}
