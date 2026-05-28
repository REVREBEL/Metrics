"use client"

import { useState } from 'react'
import { Header } from "@/components/layout/header"
import { Main } from "@/components/layout/main"
import { ThemeSwitch } from "@/components/theme-switch"
import { TasksDialogs } from "./components/tasks-dialogs"
import { TasksProvider } from "./components/tasks-provider"
import { TasksTable } from "./components/tasks-table"
import { GrowthPlanViewSwitcher, type GrowthPlanView } from "./components/growth-plan-view-switcher"
import { GrowthPlanHeader, type GrowthPlanMode } from "./components/growth-plan-header"
import { KanbanView } from "./components/kanban-view"
import { ByPersonView, ByDepartmentView } from "./components/group-views"
import { CalendarView } from "./components/calendar-view"
import { OwnerRollupView } from "./components/owner-rollup-view"
import { MeetingRecapView } from "./components/meeting-recap-view"
import { EmptyState } from "./components/growth-plan-states"
import { tasks, initiatives } from "./data/tasks"

export default function GrowthPlanPage() {
  const [activeView, setActiveView] = useState<GrowthPlanView>('kanban')
  const [mode, setMode] = useState<GrowthPlanMode>('initiatives')

  const handleCreateInitiative = () => {
    // TODO: Open initiative creation dialog
    console.log('[v0] Create initiative clicked')
  }

  const handleCreateTask = () => {
    // TODO: Open task creation dialog
    console.log('[v0] Create task clicked')
  }

  const handleInitiativeClick = (initiative: typeof initiatives[0]) => {
    console.log('[v0] Initiative clicked:', initiative.id)
  }

  const handleTaskClick = (task: typeof tasks[0]) => {
    console.log('[v0] Task clicked:', task.id)
  }

  const renderView = () => {
    // Check if we have data
    const hasInitiatives = initiatives.length > 0
    const hasTasks = tasks.length > 0

    switch (activeView) {
      case 'kanban':
        if (mode === 'initiatives' && !hasInitiatives) {
          return (
            <EmptyState 
              view={activeView} 
              mode={mode}
              onCreateInitiative={handleCreateInitiative}
              onCreateTask={handleCreateTask}
            />
          )
        }
        if (mode === 'tasks' && !hasTasks) {
          return (
            <EmptyState 
              view={activeView} 
              mode={mode}
              onCreateInitiative={handleCreateInitiative}
              onCreateTask={handleCreateTask}
            />
          )
        }
        return (
          <KanbanView
            initiatives={initiatives}
            tasks={tasks}
            mode={mode}
            onInitiativeClick={handleInitiativeClick}
            onTaskClick={handleTaskClick}
          />
        )

      case 'list':
        // Use the existing TasksTable for list view
        return <TasksTable data={tasks} />

      case 'by-person':
        if (!hasTasks) {
          return (
            <EmptyState 
              view={activeView} 
              mode={mode}
              onCreateInitiative={handleCreateInitiative}
              onCreateTask={handleCreateTask}
            />
          )
        }
        return <ByPersonView tasks={tasks} onTaskClick={handleTaskClick} />

      case 'by-department':
        if (!hasTasks) {
          return (
            <EmptyState 
              view={activeView} 
              mode={mode}
              onCreateInitiative={handleCreateInitiative}
              onCreateTask={handleCreateTask}
            />
          )
        }
        return <ByDepartmentView tasks={tasks} onTaskClick={handleTaskClick} />

      case 'calendar':
        return <CalendarView tasks={tasks} onTaskClick={handleTaskClick} />

      case 'owner-rollup':
        if (!hasInitiatives) {
          return (
            <EmptyState 
              view={activeView} 
              mode={mode}
              onCreateInitiative={handleCreateInitiative}
              onCreateTask={handleCreateTask}
            />
          )
        }
        return <OwnerRollupView initiatives={initiatives} />

      case 'meeting-recap':
        return (
          <MeetingRecapView 
            initiatives={initiatives} 
            tasks={tasks} 
          />
        )

      default:
        return null
    }
  }

  return (
    <TasksProvider>
      <Header fixed>
        <div className="min-w-0">
          <p className="text-sm font-medium leading-none">Growth Plan</p>
          <p className="mt-1 text-xs text-muted-foreground">Revenue Action Plan</p>
        </div>
        <div className="ms-auto flex items-center space-x-4">
          <ThemeSwitch />
        </div>
      </Header>

      <Main className="flex flex-1 flex-col gap-6">
        {/* Header with mode toggle */}
        <GrowthPlanHeader
          mode={mode}
          onModeChange={setMode}
          onCreateInitiative={handleCreateInitiative}
          onCreateTask={handleCreateTask}
        />

        {/* View Switcher */}
        <GrowthPlanViewSwitcher
          activeView={activeView}
          onViewChange={setActiveView}
        />

        {/* View Content */}
        <div className="flex-1">
          {renderView()}
        </div>
      </Main>

      <TasksDialogs />
    </TasksProvider>
  )
}
