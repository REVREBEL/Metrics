"use client"

import { useMemo } from "react"
import type { MouseEvent } from "react"
import {
  IconAlertTriangle,
  IconDotsVertical,
  IconGripVertical,
  IconLink,
  IconListCheck,
  IconMessage,
  IconPlus,
} from "@tabler/icons-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

import type { Initiative, Task } from "../data/schema"
import { useTasks } from "./tasks-provider"

type KanbanViewProps = {
  initiatives: Initiative[]
  tasks: Task[]
  mode: "initiatives" | "tasks"
  onInitiativeClick?: (initiative: Initiative) => void
  onTaskClick?: (task: Task) => void
}

type StatusColumn = {
  value: string
  label: string
}

const initiativeColumns: StatusColumn[] = [
  { value: "discussed", label: "Discussed" },
  { value: "planning", label: "Planning" },
  { value: "active", label: "Active" },
  { value: "blocked", label: "Blocked" },
  { value: "at_risk", label: "At Risk" },
  { value: "completed", label: "Completed" },
]

const taskColumns: StatusColumn[] = [
  { value: "not_started", label: "Not started" },
  { value: "in_progress", label: "In progress" },
  { value: "waiting", label: "Waiting" },
  { value: "blocked", label: "Blocked" },
  { value: "complete", label: "Complete" },
  { value: "canceled", label: "Canceled" },
]

const statusDotColors: Record<string, string> = {
  discussed: "bg-red-500",
  planning: "bg-blue-500",
  active: "bg-emerald-500",
  blocked: "bg-orange-500",
  at_risk: "bg-orange-500",
  completed: "bg-emerald-700",
  not_started: "bg-red-500",
  in_progress: "bg-blue-500",
  waiting: "bg-orange-500",
  complete: "bg-emerald-600",
  canceled: "bg-slate-400",
}

const categoryColors: Record<string, { bg: string; text: string; label: string }> = {
  demand_generation: {
    bg: "bg-violet-100 dark:bg-violet-900/30",
    text: "text-violet-700 dark:text-violet-300",
    label: "Demand",
  },
  product_revenue: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-300",
    label: "Product Revenue",
  },
  retention_expansion: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-300",
    label: "Retention",
  },
  operational_efficiency: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-300",
    label: "Operations",
  },
  operations: {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-700 dark:text-slate-300",
    label: "Operations",
  },
  sales: {
    bg: "bg-fuchsia-100 dark:bg-fuchsia-900/30",
    text: "text-fuchsia-700 dark:text-fuchsia-300",
    label: "Sales",
  },
  marketing: {
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    text: "text-cyan-700 dark:text-cyan-300",
    label: "Marketing",
  },
}

export function KanbanView({
  initiatives,
  tasks,
  mode,
  onInitiativeClick,
  onTaskClick,
}: KanbanViewProps) {
  const columns = mode === "initiatives" ? initiativeColumns : taskColumns

  const grouped = useMemo(() => {
    const source = mode === "initiatives" ? initiatives : tasks
    const statusMap = new Map<string, Array<Initiative | Task>>()
    columns.forEach((column) => statusMap.set(column.value, []))
    source.forEach((item) => {
      const key = item.status
      const bucket = statusMap.get(key)
      if (bucket) {
        bucket.push(item)
      }
    })
    return statusMap
  }, [columns, initiatives, mode, tasks])

  return (
    <ScrollArea className="w-full whitespace-nowrap pb-4">
      <div className="flex min-w-max gap-4">
        {columns.map((column) => {
          const items = grouped.get(column.value) ?? []
          return (
            <div key={column.value} className="w-[320px] flex-shrink-0">
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className={cn("size-2.5 rounded-full", statusDotColors[column.value] ?? "bg-slate-400")} />
                  <span className="font-semibold text-foreground">{column.label}</span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground">
                    {items.length}
                  </span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-7">
                      <IconDotsVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Column</DropdownMenuItem>
                    <DropdownMenuItem>Add {mode === "initiatives" ? "Initiative" : "Task"}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Button
                variant="outline"
                className="mb-3 w-full border-dashed border-border/60 text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground"
             >
                <IconPlus className="mr-2" size={16} />
                Add New {mode === "initiatives" ? "Initiative" : "Task"}
              </Button>

              <div className="space-y-3">
                {mode === "initiatives"
                  ? (items as Initiative[]).map((item) => (
                      <InitiativeCard
                        key={item.id}
                        initiative={item}
                        onClick={() => onInitiativeClick?.(item)}
                      />
                   ))
                  : (items as Task[]).map((item) => (
                      <TaskCard key={item.id} task={item} onClick={() => onTaskClick?.(item)} />
                   ))}
              </div>
            </div>
         )
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
 )
}

function InitiativeCard({
  initiative,
  onClick,
}: {
  initiative: Initiative
  onClick?: () => void
}) {
  const colors = categoryColors[initiative.strategyType] ?? categoryColors.operations
  const totalTasks = initiative.tasks?.length ?? 0
  const completedTasks = initiative.tasks?.filter((task) => task.status === "complete").length ?? 0

  return (
    <div
      className="group cursor-pointer rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-border"
      onClick={onClick}
   >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
          <IconGripVertical className="cursor-grab text-muted-foreground" size={16} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="-mr-1 -mt-1 size-6" onClick={(event) => event.stopPropagation()}>
              <IconDotsVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Badge variant="secondary" className={cn("mb-3 border-0 font-medium", colors.bg, colors.text)}>
        {colors.label}
      </Badge>
      <h4 className="mb-2 line-clamp-2 leading-snug text-foreground">{initiative.title}</h4>

      <h4 className="mb-2 line-clamp-2 leading-snug text-foreground">{initiative.title}</h4>

      {initiative.objective ? (
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{initiative.objective}</p>
     ) : null}

      {totalTasks> 0 ? (
        <div className="mb-3 flex items-center gap-2">
          <IconListCheck className="text-muted-foreground" size={16} />
          <span className="rounded bg-slate-100 px-2 py-0.5 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {completedTasks}/{totalTasks}
          </span>
        </div>
     ) : null}

      {initiative.risksBlockers ? (
        <div className="mb-3 flex items-center gap-1.5 text-orange-600 dark:text-orange-400">
          <IconAlertTriangle size={16} />
          <span className="line-clamp-1 text-xs font-medium">{initiative.risksBlockers}</span>
        </div>
     ) : null}

      <div className="flex items-center justify-between border-t border-border/50 pt-3">
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {initiative.leadDepartment ? (
              <Avatar className="size-7 border-2 border-card">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${initiative.leadDepartment}`} />
                <AvatarFallback className="bg-primary/10 text-[10px] font-medium text-primary">
                  {initiative.leadDepartment.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
           ) : null}
          </div>
        </div>

        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <IconMessage size={16} />
          {initiative.id.charCodeAt(initiative.id.length - 1) % 5}
        </span>
      </div>
    </div>
 )
}

function TaskCard({ task, onClick }: { task: Task; onClick?: () => void }) {
  const { setCurrentRow, setOpen } = useTasks()

  const handleEdit = (event: MouseEvent) => {
    event.stopPropagation()
    setCurrentRow(task)
    setOpen("update")
  }

  const categoryKey = task.assignedDepartment ?? "operations"
  const colors = categoryColors[categoryKey] ?? categoryColors.operations

  return (
    <div
      className="group cursor-pointer rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-border"
      onClick={onClick}
   >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
          <IconGripVertical className="cursor-grab text-muted-foreground" size={16} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="-mr-1 -mt-1 size-6" onClick={(event) => event.stopPropagation()}>
              <IconDotsVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Badge variant="secondary" className={cn("mb-3 border-0 font-medium", colors.bg, colors.text)}>
        {colors.label}
      </Badge>
      <h4 className="mb-2 line-clamp-2 leading-snug text-foreground">{task.title}</h4>

      <h4 className="mb-2 line-clamp-2 leading-snug text-foreground">{task.title}</h4>

      <div className="flex items-center justify-between border-t border-border/50 pt-3">
        <div className="flex items-center">
          {task.assignedTo ? (
            <Avatar className="size-7 border-2 border-card">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignedTo}`} />
              <AvatarFallback className="bg-primary/10 text-[10px] font-medium text-primary">
                {task.assignedTo
                  .split(" ")
                  .map((namePart) => namePart[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
         ) : null}
        </div>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <IconLink size={16} />
          {task.id.charCodeAt(task.id.length - 1) % 3}
        </span>
      </div>
    </div>
 )
}