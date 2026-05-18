"use client"

import { useMemo, useState } from "react"
import {
  ArrowDownAZ,
  ArrowUpAZ,
  Download,
  MoreHorizontal,
  Trash2,
} from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { labels, priorities, statuses } from "../data/data"
import type { Task } from "../data/schema"
import { useTasks } from "./tasks-provider"

type TasksTableProps = {
  data: Task[]
}

type SortKey = keyof Pick<Task, "id" | "title" | "status" | "priority">
type SortDirection = "asc" | "desc"

const pageSizes = [5, 10, 20]
const allFilterValue = "all"

export function TasksTable({ data }: TasksTableProps) {
  const { setOpen, setCurrentRow } = useTasks()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState(allFilterValue)
  const [priorityFilter, setPriorityFilter] = useState(allFilterValue)
  const [sortKey, setSortKey] = useState<SortKey>("id")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const filteredTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return data
      .filter((task) => {
        if (statusFilter !== allFilterValue && task.status !== statusFilter) {
          return false
        }

        if (
          priorityFilter !== allFilterValue &&
          task.priority !== priorityFilter
        ) {
          return false
        }

        if (!normalizedSearch) {
          return true
        }

        return [task.id, task.title, task.status, task.label, task.priority]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch)
      })
      .sort((a, b) => {
        const left = String(a[sortKey]).toLowerCase()
        const right = String(b[sortKey]).toLowerCase()
        return sortDirection === "asc"
          ? left.localeCompare(right)
          : right.localeCompare(left)
      })
  }, [data, priorityFilter, search, sortDirection, sortKey, statusFilter])

  const pageCount = Math.max(1, Math.ceil(filteredTasks.length / pageSize))
  const currentPageIndex = Math.min(pageIndex, pageCount - 1)
  const visibleTasks = filteredTasks.slice(
    currentPageIndex * pageSize,
    currentPageIndex * pageSize + pageSize
  )
  const selectedCount = selectedIds.size
  const allVisibleSelected =
    visibleTasks.length > 0 &&
    visibleTasks.every((task) => selectedIds.has(task.id))
  const someVisibleSelected =
    visibleTasks.some((task) => selectedIds.has(task.id)) && !allVisibleSelected

  function toggleSort(nextSortKey: SortKey) {
    if (nextSortKey === sortKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"))
      return
    }

    setSortKey(nextSortKey)
    setSortDirection("asc")
  }

  function toggleRow(taskId: string, checked: boolean) {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (checked) {
        next.add(taskId)
      } else {
        next.delete(taskId)
      }
      return next
    })
  }

  function toggleVisibleRows(checked: boolean) {
    setSelectedIds((current) => {
      const next = new Set(current)
      visibleTasks.forEach((task) => {
        if (checked) {
          next.add(task.id)
        } else {
          next.delete(task.id)
        }
      })
      return next
    })
  }

  function clearSelection() {
    setSelectedIds(new Set())
  }

  function resetFilters() {
    setSearch("")
    setStatusFilter(allFilterValue)
    setPriorityFilter(allFilterValue)
    setPageIndex(0)
  }

  function exportSelected() {
    toast.success(
      `Exported ${selectedCount} selected ${selectedCount === 1 ? "task" : "tasks"} to CSV.`
    )
    clearSelection()
  }

  function bulkDelete() {
    toast.success(
      `Deleted ${selectedCount} selected ${selectedCount === 1 ? "task" : "tasks"}.`
    )
    clearSelection()
  }

  function openUpdate(task: Task) {
    setCurrentRow(task)
    setOpen("update")
  }

  function openDelete(task: Task) {
    setCurrentRow(task)
    setOpen("delete")
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setPageIndex(0)
            }}
            placeholder="Filter by title, ID, status..."
            className="h-9 sm:max-w-xs"
          />
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value)
              setPageIndex(0)
            }}
          >
            <SelectTrigger className="h-9 sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={allFilterValue}>All statuses</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={priorityFilter}
            onValueChange={(value) => {
              setPriorityFilter(value)
              setPageIndex(0)
            }}
          >
            <SelectTrigger className="h-9 sm:w-40">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={allFilterValue}>All priorities</SelectItem>
              {priorities.map((priority) => (
                <SelectItem key={priority.value} value={priority.value}>
                  {priority.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {(search ||
            statusFilter !== allFilterValue ||
            priorityFilter !== allFilterValue) && (
            <Button variant="ghost" onClick={resetFilters}>
              Reset
            </Button>
          )}
        </div>

        {selectedCount > 0 && (
          <div className="flex items-center gap-2 rounded-md border bg-background p-1">
            <Badge variant="secondary">
              {selectedCount} {selectedCount === 1 ? "task" : "tasks"} selected
            </Badge>
            <Button variant="outline" size="sm" onClick={exportSelected}>
              <Download />
              Export
            </Button>
            <Button variant="destructive" size="sm" onClick={bulkDelete}>
              <Trash2 />
              Delete
            </Button>
            <Button variant="ghost" size="sm" onClick={clearSelection}>
              Clear
            </Button>
          </div>
        )}
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table className="min-w-[760px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  checked={allVisibleSelected || someVisibleSelected}
                  onCheckedChange={(checked) =>
                    toggleVisibleRows(Boolean(checked))
                  }
                  aria-label="Select visible tasks"
                  data-state={someVisibleSelected ? "indeterminate" : undefined}
                />
              </TableHead>
              <SortableHead
                active={sortKey === "id"}
                direction={sortDirection}
                onClick={() => toggleSort("id")}
              >
                Task
              </SortableHead>
              <SortableHead
                active={sortKey === "title"}
                direction={sortDirection}
                onClick={() => toggleSort("title")}
                className="min-w-72"
              >
                Title
              </SortableHead>
              <SortableHead
                active={sortKey === "status"}
                direction={sortDirection}
                onClick={() => toggleSort("status")}
              >
                Status
              </SortableHead>
              <TableHead>Label</TableHead>
              <SortableHead
                active={sortKey === "priority"}
                direction={sortDirection}
                onClick={() => toggleSort("priority")}
              >
                Priority
              </SortableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleTasks.length > 0 ? (
              visibleTasks.map((task) => (
                <TableRow
                  key={task.id}
                  data-state={selectedIds.has(task.id) ? "selected" : undefined}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(task.id)}
                      onCheckedChange={(checked) =>
                        toggleRow(task.id, Boolean(checked))
                      }
                      aria-label={`Select ${task.id}`}
                    />
                  </TableCell>
                  <TableCell className="font-mono text-xs">{task.id}</TableCell>
                  <TableCell className="max-w-96 whitespace-normal font-medium">
                    {task.title}
                  </TableCell>
                  <TableCell>
                    <TaxonomyBadge items={statuses} value={task.status} />
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {labels.find((label) => label.value === task.label)
                        ?.label ?? task.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <TaxonomyBadge items={priorities} value={task.priority} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal />
                          <span className="sr-only">Open task actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openUpdate(task)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => openDelete(task)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {visibleTasks.length} of {filteredTasks.length} tasks
        </p>
        <div className="flex items-center gap-2">
          <Select
            value={String(pageSize)}
            onValueChange={(value) => {
              setPageSize(Number(value))
              setPageIndex(0)
            }}
          >
            <SelectTrigger className="h-8 w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizes.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size} rows
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex((current) => Math.max(0, current - 1))}
            disabled={currentPageIndex === 0}
          >
            Previous
          </Button>
          <span className="min-w-20 text-center text-sm">
            {currentPageIndex + 1} / {pageCount}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPageIndex((current) => Math.min(pageCount - 1, current + 1))
            }
            disabled={currentPageIndex >= pageCount - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

function SortableHead({
  active,
  children,
  className,
  direction,
  onClick,
}: {
  active: boolean
  children: React.ReactNode
  className?: string
  direction: SortDirection
  onClick: () => void
}) {
  return (
    <TableHead className={className}>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-1",
          active && "text-primary"
        )}
      >
        {children}
        {direction === "asc" ? (
          <ArrowDownAZ className="size-3" />
        ) : (
          <ArrowUpAZ className="size-3" />
        )}
      </button>
    </TableHead>
  )
}

function TaxonomyBadge({
  items,
  value,
}: {
  items: typeof statuses
  value: string
}) {
  const item = items.find((candidate) => candidate.value === value)
  const Icon = item?.icon

  return (
    <div className="flex items-center gap-2">
      {Icon ? <Icon className="size-4 text-muted-foreground" /> : null}
      <span>{item?.label ?? value}</span>
    </div>
  )
}
