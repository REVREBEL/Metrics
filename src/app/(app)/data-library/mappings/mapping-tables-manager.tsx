"use client"

import type { ReactNode } from "react"
import { useMemo, useRef, useState, useTransition } from "react"
import {
  ArrowDownAZ,
  ArrowUpAZ,
  Check,
  CircleAlert,
  DatabaseZap,
  Filter,
  Search as SearchIcon,
} from "lucide-react"

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
import type {
  MappingCoverageStatus,
  MappingRowStatus,
  MappingTableMetadata,
  MappingTableRow,
} from "@/lib/mapping-tables/types"
import { cn } from "@/lib/utils"

import { getMappingTableRowsAction } from "./actions"

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
          if (row.status !== "partial" && row.status !== "unmapped") {
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
    (row) => row.status === "partial" || row.status === "unmapped"
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

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5">
      <section className="flex flex-col gap-3 border-b pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-3xl font-bold uppercase tracking-tight">
              Mapping Tables
            </h1>
            <Badge variant="outline">Mock data</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Inspect source-to-standard mappings across hotels, segments,
            channels, room types, sources, markets, and rates from the Data
            Library control layer.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
          <SummaryBadge label="Rows" value={tableSummary.rows} />
          <SummaryBadge label="Mapped" value={tableSummary.mapped} />
          <SummaryBadge
            label="Needs review"
            value={tableSummary.partial + tableSummary.unmapped}
            variant="destructive"
          />
        </div>
      </section>

      <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="min-h-0 rounded-lg border bg-card">
          <div className="border-b p-4">
            <p className="text-sm font-semibold">Mapping categories</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Select a mapping table to inspect source values and standard
              values.
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

        <section className="min-w-0 rounded-lg border bg-card">
          {!selectedTable ? (
            <EmptyState title="No mapping table selected" />
          ) : (
            <div className="flex min-h-0 flex-col">
              <div className="border-b p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold">
                        {selectedTable.displayName}
                      </h2>
                      <CoverageBadge status={selectedTable.status} />
                      {reviewCount > 0 ? (
                        <Badge variant="destructive">
                          <CircleAlert />
                          {reviewCount} need review
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <Check />
                          Fully mapped
                        </Badge>
                      )}
                    </div>
                    <p className="max-w-3xl text-sm text-muted-foreground">
                      {selectedTable.description}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span>Source: {selectedTable.sourceTableName}</span>
                      <span>Standard: {selectedTable.standardTableName}</span>
                      <span>
                        Permission: {selectedTable.requiredPermission}
                      </span>
                      <span>
                        Refreshed {formatDate(selectedTable.lastRefreshed)}
                      </span>
                    </div>
                  </div>
                  <div className="grid min-w-64 grid-cols-3 gap-2">
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

                <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(240px,1fr)_190px_190px]">
                  <div className="relative">
                    <SearchIcon
                      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <Input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search source codes, standards, reasons..."
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
                      <Filter className="size-4" aria-hidden="true" />
                      <SelectValue placeholder="Filter rows" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All rows</SelectItem>
                      <SelectItem value="mapped">Mapped</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="unmapped">Unmapped</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="needs_review">Needs review</SelectItem>
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
                  title="Mapping rows could not be loaded"
                  description={loadError}
                />
              ) : isLoadingRows ? (
                <RowsLoadingState />
              ) : visibleRows.length === 0 ? (
                <EmptyState
                  title="No mapping rows match the current filters"
                  description="Adjust search or status filters to see more source values."
                />
              ) : (
                <div className="min-h-0 overflow-hidden">
                  <Table className="min-w-[1120px]">
                    <TableHeader>
                      <TableRow>
                        <SortableHead
                          active={sortKey === "sourceCode"}
                          onClick={() => handleSort("sourceCode")}
                        >
                          Source code
                        </SortableHead>
                        <SortableHead
                          active={sortKey === "sourceValue"}
                          onClick={() => handleSort("sourceValue")}
                        >
                          Source value
                        </SortableHead>
                        <TableHead>Source system</TableHead>
                        <TableHead>Standard code</TableHead>
                        <SortableHead
                          active={sortKey === "standardValue"}
                          onClick={() => handleSort("standardValue")}
                        >
                          Standard value
                        </SortableHead>
                        <TableHead>Group</TableHead>
                        <TableHead>Confidence</TableHead>
                        <SortableHead
                          active={sortKey === "status"}
                          onClick={() => handleSort("status")}
                        >
                          Status
                        </SortableHead>
                        <TableHead>Review note</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {visibleRows.map((row) => (
                        <TableRow
                          key={row.id}
                          className={cn(
                            row.status === "unmapped" &&
                              "bg-destructive/5 hover:bg-destructive/10",
                            row.status === "partial" &&
                              "bg-amber-50/70 hover:bg-amber-50 dark:bg-amber-950/20"
                          )}
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
                          <TableCell>{row.sourceSystem}</TableCell>
                          <TableCell className="font-mono text-xs">
                            {row.standardCode || "-"}
                          </TableCell>
                          <TableCell className="max-w-56 whitespace-normal">
                            {row.standardValue || (
                              <span className="text-muted-foreground">
                                Not mapped
                              </span>
                            )}
                          </TableCell>
                          <TableCell>{row.standardGroup || "-"}</TableCell>
                          <TableCell>{row.confidence}%</TableCell>
                          <TableCell>
                            <RowStatusBadge status={row.status} />
                          </TableCell>
                          <TableCell className="max-w-72 whitespace-normal text-sm text-muted-foreground">
                            {row.reviewReason || "No review needed"}
                          </TableCell>
                        </TableRow>
                      ))}
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
    >
      {coverageLabels[status]}
    </Badge>
  )
}

function RowStatusBadge({ status }: { status: MappingRowStatus }) {
  return (
    <Badge
      variant={
        status === "unmapped"
          ? "destructive"
          : status === "partial"
            ? "outline"
            : "secondary"
      }
    >
      {rowStatusLabels[status]}
    </Badge>
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
      {label}: {value.toLocaleString()}
    </Badge>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border bg-background px-2 py-1">
      <p className="text-[11px] uppercase text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value.toLocaleString()}</p>
    </div>
  )
}

function SortableHead({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: ReactNode
  onClick: () => void
}) {
  return (
    <TableHead>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-1",
          active && "text-primary"
        )}
      >
        {children}
        <ArrowDownAZ className="size-3" aria-hidden="true" />
      </button>
    </TableHead>
  )
}

function EmptyState({
  title,
  description = "Select a mapping table to load rows.",
}: {
  title: string
  description?: string
}) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-2 p-8 text-center">
      <DatabaseZap
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
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value))
}
