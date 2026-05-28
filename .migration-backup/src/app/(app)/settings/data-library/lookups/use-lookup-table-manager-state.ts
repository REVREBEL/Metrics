import { useMemo } from "react"

import { lookupTableChangeSchema } from "@/lib/lookup-tables/schemas"
import type {
  LookupTableChange,
  LookupTableRow,
} from "@/lib/lookup-tables/types"

const rowFields = [
  "mappedValue",
  "mappedGroup",
  "isActive",
  "notes",
] as const satisfies readonly (keyof LookupTableChange)[]

export function useLookupValidation(rows: LookupTableRow[]) {
  return useMemo(() => {
    const errors = new Map<string, Record<string, string>>()

    rows.forEach((row) => {
      const parsed = lookupTableChangeSchema.safeParse({
        ...row,
        lastKnownUpdatedAt: row.updatedAt,
      })

      if (!parsed.success) {
        const fieldErrors: Record<string, string> = {}
        parsed.error.issues.forEach((issue) => {
          const path = issue.path[0]
          if (typeof path === "string") {
            fieldErrors[path] = issue.message
          }
        })
        errors.set(row.id, fieldErrors)
      }
    })

    return errors
  }, [rows])
}

export function useDirtyRows(
  rows: LookupTableRow[],
  originalRowsById: Map<string, LookupTableRow>
) {
  return useMemo(
    () =>
      rows.filter((row) => {
        const originalRow = originalRowsById.get(row.id)
        return originalRow ? isDirty(row, originalRow) : true
      }),
    [originalRowsById, rows]
  )
}

export function toChange(
  row: LookupTableRow,
  originalRow: LookupTableRow | undefined
): LookupTableChange {
  const change: LookupTableChange = {
    id: row.id,
    lastKnownUpdatedAt: originalRow?.updatedAt ?? row.updatedAt,
  }

  rowFields.forEach((field) => {
    if (!originalRow || row[field] !== originalRow[field]) {
      change[field] = row[field] as never
    }
  })

  if (row.isActive) {
    change.isActive = true
    change.mappedValue = row.mappedValue
  }

  return change
}

export function isDirty(row: LookupTableRow, originalRow: LookupTableRow) {
  return rowFields.some((field) => row[field] !== originalRow[field])
}
