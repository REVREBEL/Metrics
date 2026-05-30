"use client"

import { useMemo } from 'react'
import { 
  IconDotsVertical,
  IconPlus,
  IconAlertTriangle,
  IconEye,
  IconMessage,
  IconLink,
  IconGripVertical,
  IconListCheck,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { initiativeStatuses, statuses as taskStatuses, strategyTypes } from '../data/data'
import type { Initiative, Task } from '../data/schema'
import { useTasks } from './tasks-provider'


type KanbanViewProps = {
  initiatives: Initiative[]
  tasks: Task[]
  mode: 'initiatives' | 'tasks'
  onInitiativeClick?: (initiative: Initiative) => void
  onTaskClick?: (task: Task) => void
}

// Status dot colors mapping
const statusDotColors: Record<string, string> = {
  discussed: 'bg-red-500',
  planning: 'bg-blue-500',
  active: 'bg-emerald-500',
  blocked: 'bg-orange-500',
  complete: 'bg-emerald-600',
  not_started: 'bg-red-500',
  in_progress: 'bg-blue-500',
  waiting: 'bg-orange-500',
  canceled: 'bg-slate-400',
  at_risk: 'bg-orange-500',
  archived: 'bg-slate-400',
}

// Category badge colors - matching the reference design
            <div key={column.value} className="w-[320px] flex-shrink-0">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className={cn("size-2.5 rounded-full", statusDotColors[column.value] || 'bg-slate-400')} />
                  <span className="font-semibold text-foreground">{column.label}</span>
                  <span className="text-sm text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-7">
                      <IconDotsVertical stroke={1.5} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Column</DropdownMenuItem>
                    <DropdownMenuItem>Add {mode === 'initiatives' ? 'Initiative' : 'Task'}</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete Column</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Add New Button */}
              <Button 
                variant="outline" 
                className="w-full mb-3 border-dashed border-border/60 text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/50">
                <IconPlus stroke={1.5} className="mr-2" />
                Add New {mode === 'initiatives' ? 'Initiative' : 'Task'}
              </Button>

              {/* Cards */}
                        <InitiativeCard 
                          key={item.id} 
                          initiative={item} 
                          onClick={() => onInitiativeClick?.(item)}
                        />
                      ))
                    : (items as Task[]).map(item => (
                        <TaskCard 
                          key={item.id} 
                          task={item}
                          onClick={() => onTaskClick?.(item)}
                        />
                      ))
                )}
              </div>
            </div>
          )
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

function InitiativeCard({ initiative, onClick }: { initiative: Initiative; onClick?: () => void }) {
  const strategyType = strategyTypes.find(s => s.value === initiative.strategyType)
  const colors = categoryColors[initiative.strategyType] || { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-700 dark:text-slate-300', label: 'Uncategorized' }
  
  // Calculate progress
  const totalTasks = initiative.tasks?.length || 0
  const completedTasks = initiative.tasks?.filter(t => t.status === 'complete').length || 0
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  
  return (
    <div 
      className="group bg-card rounded-xl border border-border/60 p-4 hover:border-border transition-all cursor-pointer"
      onClick={onClick}>
      {/* Drag Handle + Menu */}
        <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <IconGripVertical stroke={1.5} className="text-muted-foreground cursor-grab" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-6 -mt-1 -mr-1" onClick={e => e.stopPropagation()}>
              <IconDotsVertical stroke={1.5} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Category Badge */}
      <Badge variant="secondary" className={cn("mb-3 font-medium border-0", colors.bg, colors.text)}>
        {strategyType?.label || colors.label}
      </Badge>

      {/* Title */}
      <h4 className="font-semibold text-foreground mb-2 line-clamp-2 leading-snug">
        {initiative.title || initiative.name}
      </h4>

      {/* Description */}
      {initiative.objective && (
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {initiative.objective}
        </p>
      )}

      {/* Task Progress */}
      {totalTasks > 0 && (
        <div className="flex items-center gap-2 mb-3">
          <IconListCheck stroke={1.5} className="text-muted-foreground" />
          <span className={cn(
            "text-sm font-medium px-2 py-0.5 rounded",
            progress === 100 
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
            : progress > 50
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          )}
            {completedTasks}/{totalTasks}
          </span>
        </div>
      )}

      {/* Risk Indicator */}
      {initiative.risksBlockers && (
        <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 mb-3">
          <IconAlertTriangle stroke={1.5} />
          <span className="text-xs font-medium line-clamp-1">
            {initiative.risksBlockers}
          </span>
        </div>
      )}

      {/* Footer: Avatars + Metrics */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        {/* Avatar Stack */}
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {initiative.leadDepartment && (
              <Avatar className="size-7 border-2 border-card">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${initiative.leadDepartment}`} />
                <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-medium">
                  {initiative.leadDepartment.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            {totalTasks > 0 && (
              <Avatar className="size-7 border-2 border-card">
                <AvatarFallback className="text-[10px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-medium">
                  +{Math.min(totalTasks, 3)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="flex items-center gap-1 text-xs">
            <IconEye stroke={1.5} />
            {(initiative.id.charCodeAt(initiative.id.length - 1) % 10) + 1}
          </span>
          <span className="flex items-center gap-1 text-xs">
            <IconMessage stroke={1.5} />
            {initiative.id.charCodeAt(initiative.id.length - 1) % 5}
          </span>
          <span className="flex items-center gap-1 text-xs">
            <IconLink stroke={1.5} />
            {initiative.id.charCodeAt(initiative.id.length - 1) % 3}
          </span>
        </div>
      </div>
    </div>
  )
}

function TaskCard({ task, onClick }: { task: Task; onClick?: () => void }) {
  const { setOpen, setCurrentRow } = useTasks()

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentRow(task)
    setOpen('update')
  }

  // Get category from department
  const categoryKey = task.assignedDepartment || 'operations'
  const colors = categoryColors[categoryKey] || { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-700 dark:text-slate-300', label: 'General' }
  
  // Mock subtask progress
  const total = (task.id.charCodeAt(task.id.length - 1) % 5) + 3
  const completed = task.status === 'complete' ? total : (task.id.charCodeAt(task.id.length - 1) % total)
  const isComplete = task.status === 'complete'
  
  return (
    <div 
      className="group bg-card rounded-xl border border-border/60 p-4 hover:border-border transition-all cursor-pointer"
      onClick={onClick}>
      {/* Drag Handle + Menu */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <IconGripVertical stroke={1.5} className="text-muted-foreground cursor-grab" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-6 -mt-1 -mr-1" onClick={e => e.stopPropagation()}>
              <IconDotsVertical stroke={1.5} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Category Badge */}
      <Badge variant="secondary" className={cn("mb-3 font-medium border-0", colors.bg, colors.text)}>
        {colors.label}
      </Badge>

      {/* Title */}
      <h4 className="font-semibold text-foreground mb-2 line-clamp-2 leading-snug">
        {task.title}
      </h4>

      {/* Subtask Progress */}
      <div className="flex items-center gap-2 mb-3">
        <IconListCheck stroke={1.5} className="text-muted-foreground" />
        <span className={cn(
          "text-sm font-medium px-2 py-0.5 rounded",
          isComplete 
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" 
            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
        )}>
          {isComplete ? `${total}/${total}` : `${completed}/${total}`}
        </span>
      </div>

      {/* Footer: Avatars + Metrics */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        {/* Avatar Stack */}
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {task.assignedTo && (
              <Avatar className="size-7 border-2 border-card">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignedTo}`} />
                <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-medium">
                  {task.assignedTo.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            )}
            {task.priority === 'critical' || task.priority === 'high' ? (
              <Avatar className="size-7 border-2 border-card">
                <AvatarFallback className="text-[10px] bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 font-medium">
                  +2
                </AvatarFallback>
              </Avatar>
            ) : null}
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="flex items-center gap-1 text-xs">
            <IconEye stroke={1.5} />
            {(task.id.charCodeAt(task.id.length - 1) % 10) + 1}
          </span>
          <span className="flex items-center gap-1 text-xs">
            <IconMessage stroke={1.5} />
            {task.id.charCodeAt(task.id.length - 1) % 5}
          </span>
          <span className="flex items-center gap-1 text-xs">
            <IconLink stroke={1.5} />
            {task.id.charCodeAt(task.id.length - 1) % 3}
          </span>
        </div>
      </div>
    </div>
  )
}
