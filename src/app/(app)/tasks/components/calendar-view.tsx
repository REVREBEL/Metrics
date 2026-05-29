"use client"

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Task } from '../data/schema'

type CalendarViewProps = {
  tasks: Task[]
  onTaskClick?: (task: Task) => void
}

type CalendarDay = {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  tasks: Task[]
}

function formatDateKey(date: Date): string {
  return date.toISOString().split('T')[0]
}

function getMonthDays(year: number, month: number): CalendarDay[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const days: CalendarDay[] = []
  
  // Add days from previous month to fill the first week
  const startDayOfWeek = firstDay.getDay()
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i)
    days.push({
      date,
      isCurrentMonth: false,
      isToday: formatDateKey(date) === formatDateKey(today),
      tasks: [],
    })
  }
  
  // Add days of current month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day)
    days.push({
      date,
      isCurrentMonth: true,
      isToday: formatDateKey(date) === formatDateKey(today),
      tasks: [],
    })
  }
  
  // Add days from next month to complete the last week
  const remainingDays = 7 - (days.length % 7)
  if (remainingDays < 7) {
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i)
      days.push({
        date,
        isCurrentMonth: false,
        isToday: formatDateKey(date) === formatDateKey(today),
        tasks: [],
      })
    }
  }
  
  return days
}

function TaskBadge({ task, onClick }: { task: Task; onClick?: () => void }) {
  const statusColor = {
    not_started: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    in_progress: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800',
    waiting: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-800',
    blocked: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-800',
    complete: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800',
    canceled: 'bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700',
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full truncate rounded border px-1.5 py-0.5 text-left text-xs font-medium transition-opacity hover:opacity-80",
        statusColor[task.status]
      )}
    >
      {task.title}
    </button>
  )
}

export function CalendarView({ tasks, onTaskClick }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const { days, monthYear, tasksByDate } = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    const calendarDays = getMonthDays(year, month)
    
    // Group tasks by due date
    const grouped: Record<string, Task[]> = {}
    tasks.forEach(task => {
      if (task.dueDate) {
        const key = task.dueDate.split('T')[0]
        if (!grouped[key]) grouped[key] = []
        grouped[key].push(task)
      }
    })
    
    // Assign tasks to calendar days
    calendarDays.forEach(day => {
      const key = formatDateKey(day.date)
      day.tasks = grouped[key] || []
    })
    
    return {
      days: calendarDays,
      monthYear: currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      tasksByDate: grouped,
    }
  }, [currentDate, tasks])

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Stats for current view
  const stats = useMemo(() => {
    const currentMonthTasks = tasks.filter(task => {
      if (!task.dueDate) return false
      const [year, month] = task.dueDate.split('-').map(Number)
      return (month - 1) === currentDate.getMonth() && 
             year === currentDate.getFullYear()
    })
    
    return {
      total: currentMonthTasks.length,
      complete: currentMonthTasks.filter(t => t.status === 'complete').length,
      overdue: currentMonthTasks.filter(t => {
        if (t.status === 'complete' || t.status === 'canceled') return false
        return new Date(t.dueDate!) < new Date()
      }).length,
    }
  }, [tasks, currentDate])

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-5 text-muted-foreground" />
          <h3 className="font-display text-lg font-semibold uppercase tracking-tight">
            {monthYear}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-4 mr-4 text-sm">
            <span className="flex items-center gap-1.5">
              <Clock className="size-4 text-muted-foreground" />
              <span>{stats.total} due</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-green-500" />
              <span>{stats.complete} done</span>
            </span>
            {stats.overdue > 0 && (
              <span className="flex items-center gap-1.5 text-red-500">
                <AlertCircle className="size-4" />
                <span>{stats.overdue} overdue</span>
              </span>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" className="size-8" onClick={goToPreviousMonth}>
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="outline" size="icon" className="size-8" onClick={goToNextMonth}>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardContent className="p-0">
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div 
                key={day} 
                className="p-2 text-center text-xs font-medium text-muted-foreground uppercase"
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => (
              <div
                key={index}
                className={cn(
                  "min-h-[100px] border-b border-r p-1.5 last:border-r-0 [&:nth-child(7n)]:border-r-0",
                  !day.isCurrentMonth && "bg-muted/30",
                  day.isToday && "bg-primary/5"
                )}
              >
                <div className={cn(
                  "mb-1 flex size-6 items-center justify-center rounded-full text-xs font-medium",
                  day.isToday && "bg-primary text-primary-foreground",
                  !day.isCurrentMonth && "text-muted-foreground"
                )}>
                  {day.date.getDate()}
                </div>
                <div className="flex flex-col gap-0.5">
                  {day.tasks.slice(0, 3).map(task => (
                    <TaskBadge 
                      key={task.id} 
                      task={task} 
                      onClick={() => onTaskClick?.(task)}
                    />
                  ))}
                  {day.tasks.length > 3 && (
                    <span className="text-xs text-muted-foreground pl-1">
                      +{day.tasks.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
