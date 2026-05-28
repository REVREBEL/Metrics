"use client"

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LayoutGrid, List, Plus } from 'lucide-react'

export type GrowthPlanMode = 'initiatives' | 'tasks'

type GrowthPlanHeaderProps = {
  mode: GrowthPlanMode
  onModeChange: (mode: GrowthPlanMode) => void
  onCreateInitiative?: () => void
  onCreateTask?: () => void
}

export function GrowthPlanHeader({
  mode,
  onModeChange,
  onCreateInitiative,
  onCreateTask,
}: GrowthPlanHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-dark-blue">
          Growth Plan
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Turn strategy into action. Track initiatives, tasks, and owner updates.
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Mode Selector */}
        <div className="flex items-center rounded-lg border bg-muted p-1">
          <Button
            variant={mode === 'initiatives' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onModeChange('initiatives')}
            className={cn(
              "h-7 gap-1.5 px-3 font-display text-xs uppercase",
              mode !== 'initiatives' && "hover:bg-background"
            )}
          >
            <LayoutGrid className="size-3.5" />
            Initiatives
          </Button>
          <Button
            variant={mode === 'tasks' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onModeChange('tasks')}
            className={cn(
              "h-7 gap-1.5 px-3 font-display text-xs uppercase",
              mode !== 'tasks' && "hover:bg-background"
            )}
          >
            <List className="size-3.5" />
            Tasks
          </Button>
        </div>

        {/* Create Button */}
        <Button 
          size="sm"
          onClick={mode === 'initiatives' ? onCreateInitiative : onCreateTask}
          className="gap-1.5"
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">
            {mode === 'initiatives' ? 'New Initiative' : 'New Task'}
          </span>
        </Button>
      </div>
    </div>
  )
}
