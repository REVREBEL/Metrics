"use client"

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, ChevronRight, AlertCircle, Clock, CheckCircle2, User, Building2 } from 'lucide-react'
import type { Task } from '../data/schema'
import { taskStatuses, departments, assigneeTypes } from '../data/data'

// Format date without locale-specific formatting to avoid hydration mismatch
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  const year = date.getUTCFullYear()
  return `${month}/${day}/${year}`
}

type ByPersonViewProps = {
  tasks: Task[]
  onTaskClick?: (task: Task) => void
}

type ByDepartmentViewProps = {
  tasks: Task[]
  onTaskClick?: (task: Task) => void
}

type PersonGroup = {
  name: string
  type: string
  department?: string
  email?: string
  tasks: Task[]
}

type DepartmentGroup = {
  name: string
  label: string
  tasks: Task[]
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function TaskMiniCard({ task, onClick }: { task: Task; onClick?: () => void }) {
  const statusInfo = taskStatuses.find(s => s.value === task.status)
  const StatusIcon = statusInfo?.icon

  const statusColor = {
    not_started: 'text-slate-500',
    in_progress: 'text-blue-500',
    waiting: 'text-yellow-500',
    blocked: 'text-red-500',
    complete: 'text-green-500',
    canceled: 'text-gray-400',
  }

  return (
    <div 
      className="flex items-start gap-3 rounded-md border bg-card p-3 transition-colors hover:bg-muted/50 cursor-pointer"
      onClick={onClick}
    >
      {StatusIcon && (
        <StatusIcon className={cn("mt-0.5 size-4 shrink-0", statusColor[task.status])} />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-tight truncate">{task.title}</p>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          {task.dueDate && (
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {formatDate(task.dueDate)}
            </span>
          )}
          <Badge variant="outline" className="text-xs h-5 px-1.5">
            {task.priority}
          </Badge>
        </div>
      </div>
    </div>
  )
}

function PersonCard({ person, onTaskClick }: { person: PersonGroup; onTaskClick?: (task: Task) => void }) {
  const openTasks = person.tasks.filter(t => t.status !== 'complete' && t.status !== 'canceled')
  const overdueTasks = person.tasks.filter(t => {
    if (!t.dueDate || t.status === 'complete' || t.status === 'canceled') return false
    return new Date(t.dueDate) < new Date()
  })
  const completedTasks = person.tasks.filter(t => t.status === 'complete')
  const completionRate = person.tasks.length > 0 
    ? Math.round((completedTasks.length / person.tasks.length) * 100) 
    : 0

  const typeLabel = assigneeTypes.find(t => t.value === person.type)?.label || person.type

  return (
    <Collapsible defaultOpen={openTasks.length > 0}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                  {getInitials(person.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base font-semibold truncate">
                    {person.name}
                  </CardTitle>
                  {person.type !== 'app_user' && (
                    <Badge variant="outline" className="text-xs shrink-0">
                      {typeLabel}
                    </Badge>
                  )}
                </div>
                {person.department && (
                  <p className="text-sm text-muted-foreground truncate">
                    {departments.find(d => d.value === person.department)?.label || person.department}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="size-4 text-green-500" />
                    <span className="font-medium">{completedTasks.length}</span>
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="size-4" />
                    <span>{openTasks.length}</span>
                  </span>
                  {overdueTasks.length > 0 && (
                    <span className="flex items-center gap-1 text-red-500">
                      <AlertCircle className="size-4" />
                      <span className="font-medium">{overdueTasks.length}</span>
                    </span>
                  )}
                </div>
                <ChevronDown className="size-5 text-muted-foreground transition-transform [[data-state=closed]_&]:-rotate-90" />
              </div>
            </div>
            <Progress value={completionRate} className="h-1.5 mt-3" />
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="flex flex-col gap-2">
              {person.tasks.map(task => (
                <TaskMiniCard 
                  key={task.id} 
                  task={task} 
                  onClick={() => onTaskClick?.(task)}
                />
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

function DepartmentCard({ department, onTaskClick }: { department: DepartmentGroup; onTaskClick?: (task: Task) => void }) {
  const openTasks = department.tasks.filter(t => t.status !== 'complete' && t.status !== 'canceled')
  const blockedTasks = department.tasks.filter(t => t.status === 'blocked')
  const overdueTasks = department.tasks.filter(t => {
    if (!t.dueDate || t.status === 'complete' || t.status === 'canceled') return false
    return new Date(t.dueDate) < new Date()
  })
  const completedTasks = department.tasks.filter(t => t.status === 'complete')
  const completionRate = department.tasks.length > 0 
    ? Math.round((completedTasks.length / department.tasks.length) * 100) 
    : 0

  return (
    <Collapsible defaultOpen={openTasks.length > 0}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="size-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base font-semibold">
                  {department.label}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {department.tasks.length} tasks
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="size-4 text-green-500" />
                    <span className="font-medium">{completedTasks.length}</span>
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="size-4" />
                    <span>{openTasks.length}</span>
                  </span>
                  {blockedTasks.length > 0 && (
                    <span className="flex items-center gap-1 text-red-500">
                      <AlertCircle className="size-4" />
                      <span className="font-medium">{blockedTasks.length}</span>
                    </span>
                  )}
                </div>
                <ChevronDown className="size-5 text-muted-foreground transition-transform [[data-state=closed]_&]:-rotate-90" />
              </div>
            </div>
            <Progress value={completionRate} className="h-1.5 mt-3" />
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="flex flex-col gap-2">
              {department.tasks.map(task => (
                <TaskMiniCard 
                  key={task.id} 
                  task={task}
                  onClick={() => onTaskClick?.(task)}
                />
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

export function ByPersonView({ tasks, onTaskClick }: ByPersonViewProps) {
  const personGroups = useMemo(() => {
    const groups: Record<string, PersonGroup> = {}
    
    tasks.forEach(task => {
      const key = task.assignedTo || 'Unassigned'
      if (!groups[key]) {
        groups[key] = {
          name: key,
          type: task.assignedTo ? (task.assigneeType || 'department_placeholder') : 'app_user',
          department: task.assignedTo ? task.assignedDepartment : undefined,
          tasks: [],
        }
      }
      groups[key].tasks.push(task)
    })

    return Object.values(groups).sort((a, b) => {
      // Sort by open tasks count (descending)
      const aOpen = a.tasks.filter(t => t.status !== 'complete' && t.status !== 'canceled').length
      const bOpen = b.tasks.filter(t => t.status !== 'complete' && t.status !== 'canceled').length
      return bOpen - aOpen
    })
  }, [tasks])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <User className="size-4" />
        <span>{personGroups.length} assignees</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {personGroups.map(person => (
          <PersonCard 
            key={person.name} 
            person={person}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
    </div>
  )
}

export function ByDepartmentView({ tasks, onTaskClick }: ByDepartmentViewProps) {
  const departmentGroups = useMemo(() => {
    const groups: Record<string, DepartmentGroup> = {}
    
    tasks.forEach(task => {
      const key = task.assignedDepartment || 'unassigned'
      if (!groups[key]) {
        const deptInfo = departments.find(d => d.value === key)
        groups[key] = {
          name: key,
          label: deptInfo?.label || (key === 'unassigned' ? 'Unassigned' : key),
          tasks: [],
        }
      }
      groups[key].tasks.push(task)
    })

    return Object.values(groups).sort((a, b) => {
      // Sort by open tasks count (descending)
      const aOpen = a.tasks.filter(t => t.status !== 'complete' && t.status !== 'canceled').length
      const bOpen = b.tasks.filter(t => t.status !== 'complete' && t.status !== 'canceled').length
      return bOpen - aOpen
    })
  }, [tasks])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Building2 className="size-4" />
        <span>{departmentGroups.length} departments</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {departmentGroups.map(department => (
          <DepartmentCard 
            key={department.name} 
            department={department}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
    </div>
  )
}
