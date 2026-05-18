"use client"

import { useMemo, useState, useTransition } from "react"
import { ArrowDownAZ, ArrowUpAZ, Check, CircleAlert, RefreshCcw, Save, Search as SearchIcon } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { SortableTableHead } from "@/components/ui/sortable-table-head"
import { lookupTableChangeSchema } from "@/lib/lookup-tables/schemas"
import type {
  LookupTableMetadata,
  LookupTableRow,
  LookupTableStatus,
} from "@/lib/lookup-tables/types"
import { LookupTableManagerRow } from "./lookup-table-manager-row"
import { formatDate, sortLabel } from "./lookup-table-manager-utils"
import {
  isDirty,
  toChange,
  useDirtyRows,
  useLookupValidation,
} from "./use-lookup-table-manager-state"

import {
  getLookupTableRowsAction,
  saveLookupTableChangesAction,
} from "./actions"

type LookupTableManagerProps = {
  tables: LookupTableMetadata[]
  initialRows: LookupTableRow[]
  initialTableKey?: string
}

type SortKey = "rawCode" | "rawName" | "mappedValue" | "updatedAt"
type SortDirection = "asc" | "desc"
type StatusFilter = "all" | "active" | "inactive" | "dirty" | "invalid"

const statusLabels: Record<LookupTableStatus, string> = {
  ready: "Ready",
  draft: "Draft",
  needs_review: "Needs review",
}

export function LookupTableManager({
  tables,
  initialRows,
  initialTableKey,
}: LookupTableManagerProps) {
  const [selectedTableKey, setSelectedTableKey] = useState(
    initialTableKey ?? ""
  )
  const [rows, setRows] = useState<LookupTableRow[]>(initialRows)
  const [originalRows, setOriginalRows] =
    useState<LookupTableRow[]>(initialRows)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [sortKey, setSortKey] = useState<SortKey>("rawCode")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [loadError, setLoadError] = useState<string | null>(null)
  const [isLoadingRows, startRowsTransition] = useTransition()
  const [isSaving, startSaveTransition] = useTransition()

  const selectedTable = tables.find((table) => table.key === selectedTableKey)
  const originalRowsById = useMemo(
    () => new Map(originalRows.map((row) => [row.id, row])),
    [originalRows]
  )

  const validationErrors = useLookupValidation(rows)
  const dirtyRows = useDirtyRows(rows, originalRowsById)

  const visibleRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return rows
      .filter((row) => {
        const rowIsDirty = dirtyRows.some((dirtyRow) => dirtyRow.id === row.id)
        const rowIsInvalid = validationErrors.has(row.id)

        if (statusFilter === "active" && !row.isActive) return false
        if (statusFilter === "inactive" && row.isActive) return false
        if (statusFilter === "dirty" && !rowIsDirty) return false
        if (statusFilter === "invalid" && !rowIsInvalid) return false

        if (!normalizedQuery) return true

        return [
          row.id,
          row.sourceSystem,
          row.rawCode,
          row.rawName,
          row.mappedValue,
          row.mappedGroup,
          row.notes,
          row.updatedBy,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(normalizedQuery)
          )
      })
      .sort((a, b) => {
        const aValue = String(a[sortKey] ?? "").toLowerCase()
        const bValue = String(b[sortKey] ?? "").toLowerCase()
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      })
  }, [
    dirtyRows,
    query,
    rows,
    sortDirection,
    sortKey,
    statusFilter,
    validationErrors,
  ])

  const changeCount = dirtyRows.length
  const hasValidationErrors = validationErrors.size > 0

  function handleTableSelect(tableKey: string) {
    setSelectedTableKey(tableKey)
    setQuery("")
    setStatusFilter("all")
    setLoadError(null)
    startRowsTransition(async () => {
      try {
        const nextRows = await getLookupTableRowsAction(tableKey)
        setRows(nextRows)
        setOriginalRows(nextRows)
      } catch (error) {
        setRows([])
        setOriginalRows([])
        setLoadError(
          error instanceof Error ? error.message : "Unable to load lookup rows."
        )
      }
    })
  }

  function updateRow(id: string, patch: Partial<LookupTableRow>) {
    setRows((currentRows) =>
      currentRows.map((row) => (row.id === id ? { ...row, ...patch } : row))
    )
  }

  function resetChanges() {
    setRows(originalRows)
    toast.info("Unsaved lookup changes were reset.")
  }

  function handleSort(nextSortKey: SortKey) {
    if (nextSortKey === sortKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"))
      return
    }

    setSortKey(nextSortKey)
    setSortDirection("asc")
  }

  function saveChanges() {
    const changes = dirtyRows.map((row) =>
      toChange(row, originalRowsById.get(row.id))
    )
    const invalidDirtyRows = changes.filter(
      (change) => !lookupTableChangeSchema.safeParse(change).success
    )

    if (invalidDirtyRows.length > 0 || hasValidationErrors) {
      toast.error("Fix validation errors before saving.")
      return
    }

    startSaveTransition(async () => {
      const result = await saveLookupTableChangesAction({
        tableKey: selectedTableKey,
        changes,
      })

      if (!result.ok) {
        toast.error(result.message ?? "Lookup changes could not be saved.")
        return
      }

      const savedAt = result.savedAt ?? new Date().toISOString()
      const savedRows = rows.map((row) =>
        dirtyRows.some((dirtyRow) => dirtyRow.id === row.id)
          ? {
              ...row,
              updatedAt: savedAt,
              updatedBy: "Current user",
            }
          : row
      )

      setRows(savedRows)
      setOriginalRows(savedRows)
      toast.success(result.message ?? "Lookup changes saved.")
    })
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5">
      <section className="flex flex-col gap-3 border-b pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-3xl font-bold uppercase tracking-tight">
              Lookup Table Manager
            </h1>
            <Badge variant="outline">Mock data</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Browse internal mapping tables, validate editable fields, and send
            saves through a server action boundary ready for BigQuery or app DB
            persistence.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={changeCount > 0 ? "default" : "secondary"}
            className="h-8 px-3"
          >
            {changeCount} unsaved {changeCount === 1 ? "row" : "rows"}
          </Badge>
          <Button
            variant="outline"
            onClick={resetChanges}
            disabled={changeCount === 0 || isSaving}
          >
            <RefreshCcw />
            Reset
          </Button>
          <Button
            onClick={saveChanges}
            disabled={changeCount === 0 || hasValidationErrors || isSaving}
          >
            {isSaving ? <RefreshCcw className="animate-spin" /> : <Save />}
            Save
          </Button>
        </div>
      </section>

      <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="min-h-0 rounded-lg border bg-card">
          <div className="border-b p-4">
            <p className="text-sm font-semibold">Available tables</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Select a mapping table to inspect rows.
            </p>
          </div>
          <div className="max-h-[680px] overflow-y-auto p-2">
            {tables.map((table) => (
              <button
                key={table.key}
                type="button"
                onClick={() => handleTableSelect(table.key)}
                className={cn(
                  "mb-2 w-full rounded-md border p-3 text-left transition-colors hover:bg-muted",
                  selectedTableKey === table.key
                    ? "border-primary bg-primary/5"
                    : "border-transparent"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {table.displayName}
                    </p>
                    <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                      {table.key}
                    </p>
                  </div>
                  <StatusBadge status={table.status} />
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                  {table.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span>{table.approximateRowCount.toLocaleString()} rows</span>
                  <span>{formatDate(table.lastUpdated)}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="min-w-0 rounded-lg border bg-card">
          {!selectedTable ? (
            <EmptyState title="No lookup table selected" />
          ) : (
            <div className="flex min-h-0 flex-col">
              <div className="border-b p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold">
                        {selectedTable.displayName}
                      </h2>
                      <StatusBadge status={selectedTable.status} />
                    </div>
                    <p className="max-w-3xl text-sm text-muted-foreground">
                      {selectedTable.description}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span>
                        Last updated {formatDate(selectedTable.lastUpdated)}
                      </span>
                      <span>
                        Last refreshed {formatDate(selectedTable.lastRefreshed)}
                      </span>
                      <span>
                        {selectedTable.approximateRowCount.toLocaleString()}{" "}
                        estimated rows
                      </span>
                    </div>
                  </div>
                  {hasValidationErrors ? (
                    <Badge variant="destructive" className="h-8">
                      <CircleAlert />
                      Validation blocked
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="h-8">
                      <Check />
                      Valid
                    </Badge>
                  )}
                </div>

                <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(240px,1fr)_180px_180px]">
                  <div className="relative">
                    <SearchIcon
                      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <Input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search rows, raw codes, mappings, notes..."
                      className="pl-9"
                    />
                  </div>
                  <Select
                    value={statusFilter}
                    onValueChange={(value) =>
                      setStatusFilter(value as StatusFilter)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter rows" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All rows</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="dirty">Unsaved</SelectItem>
                      <SelectItem value="invalid">Invalid</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={() => handleSort(sortKey)}
                    className="justify-start"
                  >
                    {sortDirection === "asc" ? <ArrowDownAZ /> : <ArrowUpAZ />}
                    {sortLabel(sortKey)}
                  </Button>
                </div>
              </div>

              {loadError ? (
                <EmptyState
                  title="Lookup rows could not be loaded"
                  description={loadError}
                />
              ) : isLoadingRows ? (
                <RowsLoadingState />
              ) : visibleRows.length === 0 ? (
                <EmptyState
                  title="No rows match the current filters"
                  description="Adjust search or row status filters to see more rows."
                />
              ) : (
                <div className="min-h-0 overflow-hidden">
                  <Table className="min-w-[1120px]">
                    <TableHeader>
                      <TableRow>
                        <SortableTableHead
                          active={sortKey === "rawCode"}
                          direction={sortDirection}
                          onClick={() => handleSort("rawCode")}
                        >
                          Raw code
                        </SortableTableHead>
                        <SortableTableHead
                          active={sortKey === "rawName"}
                          direction={sortDirection}
                          onClick={() => handleSort("rawName")}
                        >
                          Raw name
                        </SortableTableHead>
                        <TableHead>Source</TableHead>
                        <SortableTableHead
                          active={sortKey === "mappedValue"}
                          direction={sortDirection}
                          onClick={() => handleSort("mappedValue")}
                        >
                          Mapped value
                        </SortableTableHead>
                        <TableHead>Mapped group</TableHead>
                        <TableHead>Active</TableHead>
                        <TableHead>Notes</TableHead>
                        <SortableTableHead
                          active={sortKey === "updatedAt"}
                          direction={sortDirection}
                          onClick={() => handleSort("updatedAt")}
                        >
                          Updated
                        </SortableTableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {visibleRows.map((row) => {
                        const originalRow = originalRowsById.get(row.id)
                        const dirty = originalRow
                          ? isDirty(row, originalRow)
                          : true
                        const rowErrors = validationErrors.get(row.id)

                        return (
                          <LookupTableManagerRow
                            key={row.id}
                            row={row}
                            dirty={dirty}
                            rowErrors={rowErrors}
                            updateRow={updateRow}
                          />
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: LookupTableStatus }) {
  return (
    <Badge
      variant={
        status === "needs_review"
          ? "destructive"
          : status === "draft"
            ? "outline"
            : "secondary"
      }
    >
      {statusLabels[status]}
    </Badge>
  )
}

function EmptyState({
  title,
  description = "Select a lookup table to load rows.",
}: {
  title: string
  description?: string
}) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-2 p-8 text-center">
      <CircleAlert
        className="size-8 text-muted-foreground"
        aria-hidden="true"
      />
      <p className="font-medium">{title}</p>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function RowsLoadingState() {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-14 w-full" />
      ))}
    </div>
  )
}
