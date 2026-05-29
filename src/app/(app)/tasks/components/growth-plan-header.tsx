"use client"

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LayoutGrid, List, Plus, Kanban, Calendar, Table2 } from 'lucide-react'
import type { Initiative } from '../data/schema'

export type GrowthPlanMode = 'initiatives' | 'tasks'

type GrowthPlanHeaderProps = {
  mode: GrowthPlanMode
  onModeChange: (mode: GrowthPlanMode) => void
  onCreateInitiative?: () => void
  onCreateTask?: () => void
  initiatives?: Initiative[]
  selectedInitiative?: Initiative | null
}

// Mock team avatars
const teamAvatars = [
  { name: 'Sarah Chen', seed: 'sarah' },
  { name: 'Marcus Johnson', seed: 'marcus' },
  { name: 'Emily Rodriguez', seed: 'emily' },
  { name: 'David Kim', seed: 'david' },
]

export function GrowthPlanHeader({
  mode,
  onModeChange,
  onCreateInitiative,
  onCreateTask,
  initiatives = [],
  selectedInitiative,
}: GrowthPlanHeaderProps) {
  // Calculate overall progress
  const totalTasks = initiatives.reduce((acc, i) => acc + (i.tasks?.length || 0), 0)
  const completedTasks = initiatives.reduce((acc, i) => 
    acc + (i.tasks?.filter(t => t.status === 'complete').length || 0), 0
  )
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Title and Progress */}
        <div className="flex items-center gap-4">
          {/* Logo Icon */}
          <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10">
            <span className="text-primary font-bold text-xl">P</span>
          </div>
          
          <div className="flex-1">
            <h1 className="font-semibold text-lg text-foreground">
              {selectedInitiative?.title || 'Growth Plan'}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <Progress value={progress} className="w-32 h-2" />
              <span className="text-sm text-muted-foreground">{progress}% complete</span>
            </div>
          </div>
        </div>

        {/* Right: Team Avatars + Actions */}
        <div className="flex items-center gap-4">
          {/* Team Avatar Stack */}
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {teamAvatars.map((member, index) => (
                <Avatar key={index} className="size-9 border-2 border-card">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.seed}`} />
                  <AvatarFallback className="text-xs">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
              <Avatar className="size-9 border-2 border-card">
                <AvatarFallback className="text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-medium">
                  +3
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Add Member Button */}
          <Button variant="default" size="sm" className="gap-1.5">
            <Plus className="size-4" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm"
            className={cn(
              "text-muted-foreground hover:text-foreground",
              mode === 'initiatives' && "text-foreground font-medium border-b-2 border-primary rounded-none"
            )}
            onClick={() => onModeChange('initiatives')}
          >
            Overview
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className={cn(
              "text-muted-foreground hover:text-foreground",
              mode === 'tasks' && "text-foreground font-medium border-b-2 border-primary rounded-none"
            )}
            onClick={() => onModeChange('tasks')}
          >
            Tasks
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            Notes
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            Questions
          </Button>
        </div>

        {/* View Mode Toggles */}
        <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 gap-1.5 bg-background shadow-sm"
          >
            <Kanban className="size-4" />
            Board
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 gap-1.5"
          >
            <Calendar className="size-4" />
            Schedule
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 gap-1.5"
          >
            <Table2 className="size-4" />
            List
          </Button>
        </div>
      </div>
    </div>
  )
}
