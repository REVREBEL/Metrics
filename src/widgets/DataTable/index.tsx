"use client"

import { useEffect, useMemo, useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Search,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
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

export type AnalyticsTableRow = {
  id: string
  campaign: string
  impressions: number
  clicks: number
  conversions: number
  revenue: number
  ctr: number
  cpc: number
  status: "active" | "paused" | "ended"
  date: string
}

export interface DataTableProps {
  data?: AnalyticsTableRow[]
  isLoading?: boolean
}

type SortField = keyof AnalyticsTableRow
type SortDirection = "asc" | "desc" | null

const defaultData: AnalyticsTableRow[] = [
  { id: "1", campaign: "Summer Sale Campaign", impressions: 83422, clicks: 3190, conversions: 402, revenue: 19420, ctr: 3.82, cpc: 0.91, status: "active", date: "2026-03-01" },
  { id: "2", campaign: "Brand Awareness Push", impressions: 54200, clicks: 1704, conversions: 118, revenue: 8940, ctr: 3.14, cpc: 1.04, status: "paused", date: "2026-03-03" },
  { id: "3", campaign: "Retargeting Campaign", impressions: 31210, clicks: 1510, conversions: 245, revenue: 13210, ctr: 4.84, cpc: 0.74, status: "active", date: "2026-03-05" },
  { id: "4", campaign: "Holiday Promo Wrap-up", impressions: 76221, clicks: 2304, conversions: 188, revenue: 11020, ctr: 3.02, cpc: 0.88, status: "ended", date: "2026-03-07" },
  { id: "5", campaign: "Influencer Collaboration", impressions: 94310, clicks: 4821, conversions: 521, revenue: 25480, ctr: 5.11, cpc: 0.63, status: "active", date: "2026-03-10" },
  { id: "6", campaign: "Newsletter Signups", impressions: 22800, clicks: 1038, conversions: 344, revenue: 6240, ctr: 4.55, cpc: 0.52, status: "paused", date: "2026-03-12" },
]

function getSortIcon(activeField: SortField | null, field: SortField, direction: SortDirection) {
  if (activeField !== field) return <ArrowUpDown className="size-4" />
  if (direction === "asc") return <ArrowUp className="size-4" />
  if (direction === "desc") return <ArrowDown className="size-4" />
  return <ArrowUpDown className="size-4" />
}

function statusVariant(status: AnalyticsTableRow["status"]): "default" | "secondary" | "destructive" {
  if (status === "active") return "default"
  if (status === "paused") return "secondary"
  return "destructive"
}

export default function DataTable({
  data = defaultData,
  isLoading = false,
}: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const filteredAndSortedData = useMemo(() => {
    const filtered = data.filter((row) => {
      const matchesSearch = row.campaign.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || row.status === statusFilter
      return matchesSearch && matchesStatus
    })

    if (!sortField || !sortDirection) {
      return filtered
    }

    return [...filtered].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })
  }, [data, searchTerm, sortDirection, sortField, statusFilter])

  useEffect(() => {
    setCurrentPage(1)
  }, [itemsPerPage, searchTerm, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedData.length / itemsPerPage))
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc")
        return
      }
      if (sortDirection === "desc") {
        setSortField(null)
        setSortDirection(null)
        return
      }
    }

    setSortField(field)
    setSortDirection("asc")
  }

  const exportCsv = () => {
    const headers = ["Campaign", "Impressions", "Clicks", "Conversions", "Revenue", "CTR", "CPC", "Status", "Date"]
    const lines = [
      headers.join(","),
      ...filteredAndSortedData.map((row) =>
        [
          `"${row.campaign}"`,
          row.impressions,
          row.clicks,
          row.conversions,
          row.revenue,
          row.ctr,
          row.cpc,
          row.status,
          row.date,
        ].join(",")
      ),
    ]

    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "campaign-performance.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-24" />
          </div>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>Detailed analytics for channel and campaign performance.</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={exportCsv}>
          <Download data-icon="inline-start" />
          Export CSV
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search campaigns"
              className="pl-9"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full lg:w-40">
              <Filter />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={String(itemsPerPage)}
            onValueChange={(value) => setItemsPerPage(Number(value))}
          >
            <SelectTrigger className="w-full lg:w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                {[
                  ["campaign", "Campaign"],
                  ["impressions", "Impressions"],
                  ["clicks", "Clicks"],
                  ["conversions", "Conversions"],
                  ["revenue", "Revenue"],
                  ["ctr", "CTR"],
                  ["cpc", "CPC"],
                  ["status", "Status"],
                  ["date", "Date"],
                ].map(([field, label]) => {
                  const typedField = field as SortField
                  const numericColumn = ["impressions", "clicks", "conversions", "revenue", "ctr", "cpc"].includes(field)

                  return (
                    <TableHead
                      key={field}
                      className={numericColumn ? "text-right" : undefined}
                    >
                      <button
                        type="button"
                        className={`inline-flex items-center gap-2 ${numericColumn ? "ml-auto" : ""}`}
                        onClick={() => handleSort(typedField)}
                      >
                        {label}
                        {getSortIcon(sortField, typedField, sortDirection)}
                      </button>
                    </TableHead>
                  )
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.campaign}</TableCell>
                  <TableCell className="text-right">{row.impressions.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.conversions.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    {row.revenue.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    })}
                  </TableCell>
                  <TableCell className="text-right">{row.ctr.toFixed(2)}%</TableCell>
                  <TableCell className="text-right">${row.cpc.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
                  </TableCell>
                  <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {paginatedData.length} of {filteredAndSortedData.length} campaigns
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft data-icon="inline-start" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
