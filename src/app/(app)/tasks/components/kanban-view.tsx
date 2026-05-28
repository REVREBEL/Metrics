"use client"

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { initiativeStatuses, taskStatuses } from '../data/data'
import type { Initiative, Task } from '../data/schema'

// Format date without locale-specific formatting to avoid hydration mismatch
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  const year = date.getUTCFullYear()
  return `${month}/${day}/${year}`
}

type KanbanViewProps = {
  initiatives: Initiative[]
  tasks: Task[]
  mode: 'initiatives' | 'tasks'
  onInitiativeClick?: (initiative: Initiative) => void
  onTaskClick?: (task: Task) => void
}

type KanbanColumnProps = {
  title: string
  count: number
  children: React.ReactNode
  status: string
}

function KanbanColumn({ title, count, children, status }: KanbanColumnProps) {
  const getStatusColor = (statusValue: string) => {
    switch (statusValue) {
      case 'discussed':
      case 'not_started':
        return 'bg-slate-100 dark:bg-slate-800'
      case 'planning':
      case 'waiting':
        return 'bg-blue-50 dark:bg-blue-950'
      case 'active':
      case 'in_progress':
        return 'bg-emerald-50 dark:bg-emerald-950'
      case 'blocked':
        return 'bg-red-50 dark:bg-red-950'
      case 'at_risk':
        return 'bg-orange-50 dark:bg-orange-950'
      case 'completed':
      case 'complete':
        return 'bg-green-50 dark:bg-green-950'
      case 'canceled':
      case 'archived':
        return 'bg-gray-100 dark:bg-gray-800'
      default:
        return 'bg-muted'
    }
  }

  return (
    <div className="flex h-full min-w-[280px] max-w-[320px] flex-col rounded-lg border bg-card">
      <div className={cn("flex items-center justify-between rounded-t-lg p-3", getStatusColor(status))}>
        <h3 className="font-display text-sm font-semibold uppercase tracking-tight text-foreground">
          {title}
        </h3>
        <Badge variant="secondary" className="h-5 min-w-5 justify-center rounded-full px-1.5 text-xs font-medium">
          {count}
        </Badge>
      </div>
      <ScrollArea className="flex-1 p-2">
        <div className="flex flex-col gap-2">
          {children}
        </div>
      </ScrollArea>
    </div>
  )
}

function InitiativeCard({ initiative, onClick }: { initiative: Initiative; onClick?: () => void }) {
  const priorityColor = {
    low: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    high: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    critical: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  }

  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
      onClick={onClick}
    >
      <CardHeader className="p-3 pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-medium leading-tight line-clamp-2">
            {initiative.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="outline" className="text-xs">
              {initiative.strategyType.replace('_', ' ')}
            </Badge>
            <Badge className={cn("text-xs", priorityColor[initiative.priority])}>
              {initiative.priority}
            </Badge>
          </div>
          {initiative.leadDepartment && (
            <p className="text-xs text-muted-foreground">
              Lead: {initiative.leadDepartment.replace('_', ' ')}
            </p>
          )}
          {initiative.targetLaunchDate && (
            <p className="text-xs text-muted-foreground">
              Launch: {formatDate(initiative.targetLaunchDate)}
            </p>
          )}
          {initiative.risksBlockers && (
            <p className="text-xs text-orange-600 dark:text-orange-400 line-clamp-1">
              Risk: {initiative.risksBlockers}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function TaskCard({ task, onClick }: { task: Task; onClick?: () => void }) {
  const priorityColor = {
    low: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    high: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    critical: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  }

  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium leading-tight line-clamp-2">
            {task.title}
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge className={cn("text-xs", priorityColor[task.priority])}>
              {task.priority}
            </Badge>
            {task.externalUpdateEnabled && (
              <Badge variant="outline" className="text-xs">
                External
              </Badge>
            )}
          </div>
          {task.assignedTo && (
            <p className="text-xs text-muted-foreground">
              {task.assignedTo}
            </p>
          )}
          {task.dueDate && (
            <p className="text-xs text-muted-foreground">
              Due: {formatDate(task.dueDate)}
            </p>
          )}
          {task.blockerNotes && (
            <p className="text-xs text-red-600 dark:text-red-400 line-clamp-1">
              Blocked: {task.blockerNotes}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function KanbanView({ 
  initiatives, 
  tasks, 
  mode,
  onInitiativeClick,
  onTaskClick,
}: KanbanViewProps) {
  const columns = useMemo(() => {
    if (mode === 'initiatives') {
      return initiativeStatuses.map(status => ({
        ...status,
        items: initiatives.filter(i => i.status === status.value),
      }))
    } else {
      return taskStatuses.map(status => ({
        ...status,
        items: tasks.filter(t => t.status === status.value),
      }))
    }
  }, [initiatives, tasks, mode])

  return (
    <div className="flex h-full flex-col gap-4">
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4">
          {columns.map((column) => (
            <KanbanColumn 
              key={column.value} 
              title={column.label} 
              count={column.items.length}
              status={column.value}
            >
              {mode === 'initiatives' ? (
                (column.items as Initiative[]).map((initiative) => (
                  <InitiativeCard 
                    key={initiative.id} 
                    initiative={initiative}
                    onClick={() => onInitiativeClick?.(initiative)}
                  />
                ))
              ) : (
                (column.items as Task[]).map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task}
                    onClick={() => onTaskClick?.(task)}
                  />
                ))
              )}
              {column.items.length === 0 && (
                <div className="flex h-20 items-center justify-center rounded-md border border-dashed text-xs text-muted-foreground">
                  No items
                </div>
              )}
            </KanbanColumn>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
