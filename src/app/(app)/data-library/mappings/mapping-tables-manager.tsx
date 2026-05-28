"use client"

import type { ReactNode } from "react"
import { useMemo, useRef, useState, useTransition } from "react"
import {
  ArrowDownAZ,
  ArrowUpAZ,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  DatabaseZap,
  Filter,
  Pencil,
  Search as SearchIcon,
  X,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { MappingColumnDefinition } from "@/lib/mapping-tables/mapping-table-columns"
import { getDetailColumnsForTable } from "@/lib/mapping-tables/mapping-table-columns"
import type { LookupOption } from "@/lib/mapping-tables/mapping-table-lookups"
import type {
  MappingCoverageStatus,
  MappingRowStatus,
  MappingTableMetadata,
  MappingTableRow,
} from "@/lib/mapping-tables/types"
import { cn } from "@/lib/utils"

import { getMappingTableRowsAction, resolveLookupOptionsAction } from "./actions"
import { MappingRowEditDrawer } from "./mapping-row-edit-drawer"

type MappingTablesManagerProps = {
  tables: MappingTableMetadata[]
  initialRows: MappingTableRow[]
  initialTableKey?: string
}

type SortKey = "sourceCode" | "sourceValue" | "standardValue" | "status"
type SortDirection = "asc" | "desc"
type StatusFilter = "all" | MappingRowStatus | "needs_review"

const coverageLabels: Record<MappingCoverageStatus, string> = {
  ready: "Ready",
  partial: "Partial",
  needs_review: "Needs review",
}

const rowStatusLabels: Record<MappingRowStatus, string> = {
  mapped: "Mapped",
  partial: "Partial",
  unmapped: "Unmapped",
  inactive: "Inactive",
  draft: "Draft",
  needs_review: "Needs Review",
  deprecated: "Deprecated",
}

export function MappingTablesManager({
  tables,
  initialRows,
  initialTableKey,
}: MappingTablesManagerProps) {
  const [selectedTableKey, setSelectedTableKey] = useState(
    initialTableKey ?? ""
  )
  const [rows, setRows] = useState<MappingTableRow[]>(initialRows)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [sortKey, setSortKey] = useState<SortKey>("sourceCode")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [loadError, setLoadError] = useState<string | null>(null)
  const [isLoadingRows, startRowsTransition] = useTransition()
  const rowsRequestIdRef = useRef(0)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const [editDrawerOpen, setEditDrawerOpen] = useState(false)
  const [editingRow, setEditingRow] = useState<MappingTableRow | null>(null)
  const [drawerColumns, setDrawerColumns] = useState<MappingColumnDefinition[]>([])
  const [drawerLookupOptions, setDrawerLookupOptions] = useState<
    Record<string, LookupOption[]>
  >({})

  const selectedTable = tables.find((table) => table.key === selectedTableKey)

  const tableSummary = useMemo(
    () =>
      tables.reduce(
        (summary, table) => ({
          mapped: summary.mapped + table.mappedRowCount,
          partial: summary.partial + table.partialRowCount,
          unmapped: summary.unmapped + table.unmappedRowCount,
          rows: summary.rows + table.approximateRowCount,
        }),
        { mapped: 0, partial: 0, unmapped: 0, rows: 0 }
      ),
    [tables]
  )

  const visibleRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return rows
      .filter((row) => {
        if (statusFilter === "needs_review") {
          if (
            row.status !== "partial" &&
            row.status !== "unmapped" &&
            row.status !== "needs_review"
          ) {
            return false
          }
        } else if (statusFilter !== "all" && row.status !== statusFilter) {
          return false
        }

        if (!normalizedQuery) return true

        return [
          row.id,
          row.sourceSystem,
          row.sourceCode,
          row.sourceValue,
          row.standardCode,
          row.standardValue,
          row.standardGroup,
          row.reviewReason,
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
  }, [query, rows, sortDirection, sortKey, statusFilter])

  const reviewCount = rows.filter(
    (row) =>
      row.status === "partial" ||
      row.status === "unmapped" ||
      row.status === "needs_review"
  ).length

  function handleTableSelect(tableKey: string) {
    const requestId = rowsRequestIdRef.current + 1
    rowsRequestIdRef.current = requestId

    setSelectedTableKey(tableKey)
    setQuery("")
    setStatusFilter("all")
    setLoadError(null)
    startRowsTransition(async () => {
      try {
        const nextRows = await getMappingTableRowsAction(tableKey)

        if (rowsRequestIdRef.current !== requestId) {
          return
        }

        setRows(nextRows)
      } catch (error) {
        if (rowsRequestIdRef.current !== requestId) {
          return
        }

        setRows([])
        setLoadError(
          error instanceof Error
            ? error.message
            : "Unable to load mapping rows."
        )
      }
    })
  }

  function handleSort(nextSortKey: SortKey) {
    if (nextSortKey === sortKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"))
      return
    }

    setSortKey(nextSortKey)
    setSortDirection("asc")
  }

  function handleRowClick(row: MappingTableRow) {
    // Set the row and open drawer immediately
    setEditingRow(row)
    setEditDrawerOpen(true)
    
    // Get columns synchronously
    const columns = getDetailColumnsForTable(selectedTableKey)
    setDrawerColumns(columns)

    // Load lookup options in the background
    const lookupSourceKeys = [
      ...new Set(
        columns
          .filter((col) => col.lookupSource)
          .map((col) => col.lookupSource as string)
      ),
    ]

    if (lookupSourceKeys.length > 0) {
      Promise.all(
        lookupSourceKeys.map(async (src) => {
          return resolveLookupOptionsAction(src).then((options) => [src, options] as const)
        })
      ).then((results) => {
        const resolved: Record<string, LookupOption[]> = {}
        for (const [src, options] of results) {
          resolved[src] = options
        }
        setDrawerLookupOptions(resolved)
      }).catch((err) => {
        console.error("[mapping-tables] Error resolving lookup options:", err)
      })
    }
  }

  function handleSaved(rowId: string, savedAt: string) {
    setRows((prev) =>
      prev.map((r) =>
        r.id === rowId
          ? { ...r, status: "draft" as MappingRowStatus, updatedAt: savedAt }
          : r
      )
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5">
      {/* Page Header */}
      <section className="flex flex-col gap-3 border-b pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
              Mapping Tables
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Inspect and edit source-to-standard mappings across hotels, segments,
            channels, room types, sources, markets, and rates from the Data
            Library control layer.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
          <SummaryBadge label="Rows" value={tableSummary.rows} />
          <SummaryBadge label="Mapped" value={tableSummary.mapped} />
          <SummaryBadge
            label="Review"
            value={tableSummary.partial + tableSummary.unmapped}
            variant="destructive"
          />
        </div>
      </section>

      {/* Main Content Grid */}
      <div
        className={cn(
          "grid min-h-0 flex-1 gap-4 transition-all duration-300",
          sidebarCollapsed
            ? "xl:grid-cols-[48px_minmax(0,1fr)]"
            : "xl:grid-cols-[320px_minmax(0,1fr)]"
        )}
      >
        {/* Sidebar - Mapping Categories */}
        <aside
          className={cn(
            "relative min-h-0 rounded-lg border bg-card transition-all duration-300",
            sidebarCollapsed && "xl:overflow-hidden"
          )}
        >
          {/* Collapse Toggle Button - Desktop Only */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-3 top-4 z-10 hidden size-6 rounded-full border bg-background shadow-sm xl:flex"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="size-3" />
            ) : (
              <ChevronLeft className="size-3" />
            )}
          </Button>

          {/* Sidebar Header */}
          <div
            className={cn(
              "border-b p-4",
              sidebarCollapsed && "xl:hidden"
            )}
          >
            <p className="text-sm font-semibold">Mapping categories</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Select a mapping table to inspect source values and standard
              values.
            </p>
          </div>

          {/* Collapsed Sidebar - Icon Only */}
          {sidebarCollapsed && (
            <div className="hidden flex-col items-center gap-2 py-4 xl:flex">
              <TooltipProvider delayDuration={0}>
                {tables.map((table) => (
                  <Tooltip key={table.key}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => handleTableSelect(table.key)}
                        className={cn(
                          "flex size-8 items-center justify-center rounded-md transition-colors hover:bg-muted",
                          selectedTableKey === table.key &&
                            "bg-primary/10 text-primary"
                        )}
                      >
                        <DatabaseZap className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="font-medium">{table.displayName}</p>
                      <p className="text-xs text-muted-foreground">
                        {table.approximateRowCount.toLocaleString()} rows
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          )}

          {/* Expanded Sidebar - Full List */}
          <div
            className={cn(
              "max-h-[680px] overflow-y-auto p-2",
              sidebarCollapsed && "xl:hidden"
            )}
          >
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
                  <CoverageBadge status={table.status} />
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                  {table.description}
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  <Metric label="Mapped" value={table.mappedRowCount} />
                  <Metric label="Partial" value={table.partialRowCount} />
                  <Metric label="Unmapped" value={table.unmappedRowCount} />
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Table Section */}
        <section className="min-w-0 rounded-lg border bg-card">
          {!selectedTable ? (
            <EmptyState
              icon={<DatabaseZap className="size-10 text-muted-foreground/50" aria-hidden="true" />}
              title="No mapping table selected"
              description="Select a mapping category from the sidebar to view and edit source-to-standard mappings."
            />
          ) : (
            <div className="flex min-h-0 flex-col">
              {/* Table Header with Filters */}
              <div className="border-b p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold sm:text-xl">
                        {selectedTable.displayName}
                      </h2>
                      <CoverageBadge status={selectedTable.status} />
                      {reviewCount > 0 ? (
                        <Badge variant="destructive">
                          <CircleAlert className="size-3" />
                          {reviewCount} need review
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <Check className="size-3" />
                          Fully mapped
                        </Badge>
                      )}
                    </div>
                    <p className="line-clamp-2 max-w-3xl text-sm text-muted-foreground">
                      {selectedTable.description}
                    </p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span>Source: {selectedTable.sourceTableName}</span>
                      <span>Standard: {selectedTable.standardTableName}</span>
                      <span className="hidden sm:inline">
                        Permission: {selectedTable.requiredPermission}
                      </span>
                      <span>
                        Refreshed {formatDate(selectedTable.lastRefreshed)}
                      </span>
                    </div>
                  </div>
                  <div className="grid min-w-48 grid-cols-3 gap-2 sm:min-w-64">
                    <Metric label="Mapped" value={selectedTable.mappedRowCount} />
                    <Metric
                      label="Partial"
                      value={selectedTable.partialRowCount}
                    />
                    <Metric
                      label="Unmapped"
                      value={selectedTable.unmappedRowCount}
                    />
                  </div>
                </div>

                {/* Filters Row */}
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <SearchIcon
                      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <Input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search source codes, standards, reasons..."
                      className="pl-9 pr-9"
                    />
                    {query && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 size-7 -translate-y-1/2"
                        onClick={() => setQuery("")}
                        aria-label="Clear search"
                        title="Clear search"
                      >
                        <X className="size-3" />
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={statusFilter}
                      onValueChange={(value) =>
                        setStatusFilter(value as StatusFilter)
                      }
                    >
                      <SelectTrigger className="w-full sm:w-44">
                        <Filter className="size-4" aria-hidden="true" />
                        <SelectValue placeholder="Filter rows" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All rows</SelectItem>
                        <SelectItem value="mapped">Mapped</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                        <SelectItem value="needs_review">Needs Review</SelectItem>
                        <SelectItem value="unmapped">Unmapped</SelectItem>
                        <SelectItem value="deprecated">Deprecated</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      onClick={() => handleSort(sortKey)}
                      className="hidden justify-start sm:flex"
                    >
                      {sortDirection === "asc" ? <ArrowDownAZ /> : <ArrowUpAZ />}
                      <span className="hidden lg:inline">{sortLabel(sortKey)}</span>
                    </Button>
                  </div>
                </div>

                {/* Active Filters Display */}
                {(query || statusFilter !== "all") && (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Showing {visibleRows.length} of {rows.length} rows
                    </span>
                    {query && (
                      <Badge variant="secondary" className="gap-1">
                        Search: {query}
                        <button
                          type="button"
                          onClick={() => setQuery("")}
                          aria-label="Remove search filter"
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    )}
                    {statusFilter !== "all" && (
                      <Badge variant="secondary" className="gap-1">
                        Status: {rowStatusLabels[statusFilter as MappingRowStatus] || statusFilter}
                        <button onClick={() => setStatusFilter("all")}>
                          <X className="size-3" />
                        </button>
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Table Content */}
              {loadError ? (
                <EmptyState
                  icon={<CircleAlert className="size-10 text-destructive/50" aria-hidden="true" />}
                  title="Mapping rows could not be loaded"
                  description={loadError}
                />
              ) : isLoadingRows ? (
                <RowsLoadingState />
              ) : visibleRows.length === 0 ? (
                <EmptyState
                  icon={<SearchIcon className="size-10 text-muted-foreground/50" aria-hidden="true" />}
                  title="No mapping rows match the current filters"
                  description="Adjust search or status filters to see more source values."
                />
              ) : (
                <ScrollArea orientation="horizontal" className="min-h-0 flex-1">
                  <Table className="min-w-[1120px]">
                    <TableHeader>
                      <TableRow>
                        <SortableHead
                          active={sortKey === "sourceCode"}
                          direction={sortDirection}
                          onClick={() => handleSort("sourceCode")}
                        >
                          Source code
                        </SortableHead>
                        <SortableHead
                          active={sortKey === "sourceValue"}
                          direction={sortDirection}
                          onClick={() => handleSort("sourceValue")}
                        >
                          Source value
                        </SortableHead>
                        <TableHead>Source system</TableHead>
                        <TableHead>Standard code</TableHead>
                        <SortableHead
                          active={sortKey === "standardValue"}
                          direction={sortDirection}
                          onClick={() => handleSort("standardValue")}
                        >
                          Standard value
                        </SortableHead>
                        <TableHead>Group</TableHead>
                        <TableHead>Confidence</TableHead>
                        <SortableHead
                          active={sortKey === "status"}
                          direction={sortDirection}
                          onClick={() => handleSort("status")}
                        >
                          Status
                        </SortableHead>
                        <TableHead>Review note</TableHead>
                        <TableHead className="sticky right-0 w-12 bg-card">
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {visibleRows.map((row) => (
                        <TableRow
                          key={row.id}
                          className={cn(
                            "group cursor-pointer transition-colors",
                            row.status === "unmapped" &&
                              "bg-destructive/5 hover:bg-destructive/10",
                            row.status === "partial" &&
                              "bg-amber-50/70 hover:bg-amber-50 dark:bg-amber-950/20",
                            row.status === "needs_review" &&
                              "bg-amber-50/70 hover:bg-amber-50 dark:bg-amber-950/20",
                            row.status === "draft" &&
                              "bg-blue-50/50 hover:bg-blue-50/80 dark:bg-blue-950/20",
                            row.status === "deprecated" && "opacity-60",
                            row.status === "inactive" && "opacity-60"
                          )}
                          onClick={() => handleRowClick(row)}
                        >
                          <TableCell>
                            <div className="font-mono text-xs">
                              {row.sourceCode}
                            </div>
                            <div className="mt-1 font-mono text-[11px] text-muted-foreground">
                              {row.id}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-56 whitespace-normal">
                            {row.sourceValue}
                          </TableCell>
                          <TableCell className="text-xs">
                            {row.sourceSystem}
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {row.standardCode || (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="max-w-56 whitespace-normal">
                            {row.standardValue || (
                              <span className="italic text-muted-foreground">
                                Not mapped
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-xs">
                            {row.standardGroup || "-"}
                          </TableCell>
                          <TableCell>
                            <ConfidenceBadge value={row.confidence} />
                          </TableCell>
                          <TableCell>
                            <RowStatusBadge status={row.status} />
                          </TableCell>
                          <TableCell className="max-w-72 whitespace-normal text-xs text-muted-foreground">
                            {row.reviewReason || (
                              <span className="italic">No review needed</span>
                            )}
                          </TableCell>
                          <TableCell className="sticky right-0 bg-card">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-7 opacity-0 transition-opacity group-hover:opacity-100"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRowClick(row)
                              }}
                              aria-label="Edit row"
                            >
                              <Pencil className="size-3.5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              )}
            </div>
          )}
        </section>
      </div>

      <MappingRowEditDrawer
        open={editDrawerOpen}
        onOpenChange={setEditDrawerOpen}
        row={editingRow}
        tableKey={selectedTableKey}
        columns={drawerColumns}
        lookupOptions={drawerLookupOptions}
        onSaved={handleSaved}
      />
    </div>
  )
}

function CoverageBadge({ status }: { status: MappingCoverageStatus }) {
  return (
    <Badge
      variant={
        status === "needs_review"
          ? "destructive"
          : status === "partial"
            ? "outline"
            : "secondary"
      }
      className="text-[10px]"
    >
      {coverageLabels[status]}
    </Badge>
  )
}

function RowStatusBadge({ status }: { status: MappingRowStatus }) {
  const variants: Record<
    MappingRowStatus,
    "destructive" | "outline" | "secondary" | "default"
  > = {
    unmapped: "destructive",
    needs_review: "destructive",
    partial: "outline",
    draft: "default",
    mapped: "secondary",
    deprecated: "outline",
    inactive: "outline",
  }

  return (
    <Badge variant={variants[status]} className="text-[10px]">
      {rowStatusLabels[status]}
    </Badge>
  )
}

function ConfidenceBadge({ value }: { value: number }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium",
        value >= 90
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
          : value >= 70
            ? "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
            : "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400"
      )}
    >
      {value}%
    </div>
  )
}

function SummaryBadge({
  label,
  value,
  variant = "secondary",
}: {
  label: string
  value: number
  variant?: "secondary" | "destructive"
}) {
  return (
    <Badge variant={variant} className="h-8 justify-center px-3">
      <span className="hidden sm:inline">{label}:</span>
      <span className="sm:hidden">{label.charAt(0)}</span>
      {" "}{value.toLocaleString()}
    </Badge>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border bg-background px-2 py-1">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-semibold tabular-nums">
        {value.toLocaleString()}
      </p>
    </div>
  )
}

function SortableHead({
  active,
  direction,
  children,
  onClick,
}: {
  active: boolean
  direction: SortDirection
  children: ReactNode
  onClick: () => void
}) {
  return (
    <TableHead>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-1 transition-colors hover:text-foreground",
          active ? "text-primary" : "text-muted-foreground"
        )}
      >
        {children}
        {active ? (
          direction === "asc" ? (
            <ArrowDownAZ className="size-3" aria-hidden="true" />
          ) : (
            <ArrowUpAZ className="size-3" aria-hidden="true" />
          )
        ) : (
          <ArrowDownAZ className="size-3 opacity-40" aria-hidden="true" />
        )}
      </button>
    </TableHead>
  )
}

function EmptyState({
  icon,
  title,
  description = "Select a mapping table to load rows.",
}: {
  icon?: ReactNode
  title: string
  description?: string
}) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-3 p-8 text-center">
      {icon || (
        <DatabaseZap
          className="size-10 text-muted-foreground/50"
          aria-hidden="true"
        />
      )}
      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function RowsLoadingState() {
  return (
    <div className="space-y-2 p-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex gap-3">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 w-24" />
          <Skeleton className="h-12 w-20" />
        </div>
      ))}
    </div>
  )
}

function sortLabel(sortKey: SortKey) {
  const labels: Record<SortKey, string> = {
    sourceCode: "Sort: source code",
    sourceValue: "Sort: source value",
    standardValue: "Sort: standard value",
    status: "Sort: status",
  }

  return labels[sortKey]
}

function formatDate(value: string) {
  const date = new Date(value)
  if (isNaN(date.getTime())) {
    return "N/A"
  }
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(date)
}
