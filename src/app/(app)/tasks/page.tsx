"use client"

import { useState } from 'react'
import { Header } from "@/components/layout/header"
import { Main } from "@/components/layout/main"
import { ThemeSwitch } from "@/components/theme-switch"
import { Button } from "@/components/ui/button"
import { PanelLeft } from "lucide-react"
import { TasksDialogs } from "./components/tasks-dialogs"
import { TasksProvider } from "./components/tasks-provider"
import { TasksTable } from "./components/tasks-table"
import { GrowthPlanViewSwitcher, type GrowthPlanView } from "./components/growth-plan-view-switcher"
import { GrowthPlanHeader, type GrowthPlanMode } from "./components/growth-plan-header"
import { GrowthPlanSidebar } from "./components/growth-plan-sidebar"
import { KanbanView } from "./components/kanban-view"
import { ByPersonView, ByDepartmentView } from "./components/group-views"
import { CalendarView } from "./components/calendar-view"
import { OwnerRollupView } from "./components/owner-rollup-view"
import { MeetingRecapView } from "./components/meeting-recap-view"
import { EmptyState } from "./components/growth-plan-states"
import { tasks, initiatives } from "./data/tasks"
import type { Initiative, Task } from "./data/schema"

export default function GrowthPlanPage() {
  const [activeView, setActiveView] = useState<GrowthPlanView>('kanban')
  const [mode, setMode] = useState<GrowthPlanMode>('tasks')
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleCreateInitiative = () => {
    console.log('[v0] Create initiative clicked')
  }

  const handleCreateTask = () => {
    console.log('[v0] Create task clicked')
  }

  const handleInitiativeClick = (initiative: Initiative) => {
    setSelectedInitiative(initiative)
  }

  const handleTaskClick = (task: Task) => {
    console.log('[v0] Task clicked:', task.id)
  }

  const renderView = () => {
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
          <p className="text-sm font-semibold leading-none uppercase" style={{ letterSpacing: '0.025em' }}>Growth Plan</p>
          <p className="mt-1 text-xs text-muted-foreground">Revenue Action Plan</p>
        </div>
        <div className="ms-auto flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:inline-flex"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle sidebar"
          >
            <PanelLeft className="size-5" />
          </Button>
          <ThemeSwitch />
        </div>
      </Header>

      <div className="flex flex-1 overflow-hidden pt-[var(--header-height)]">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-[280px] flex-shrink-0 hidden lg:block">
            <GrowthPlanSidebar 
              initiatives={initiatives}
              selectedInitiative={selectedInitiative}
              onInitiativeSelect={setSelectedInitiative}
            />
          </aside>
        )}

        {/* Main Content */}
        <Main className="flex flex-1 flex-col gap-4 overflow-auto">
          {/* Header with progress and team */}
          <GrowthPlanHeader
            mode={mode}
            onModeChange={setMode}
            onCreateInitiative={handleCreateInitiative}
            onCreateTask={handleCreateTask}
            initiatives={initiatives}
            selectedInitiative={selectedInitiative}
          />

          {/* View Switcher */}
          <GrowthPlanViewSwitcher
            activeView={activeView}
            onViewChange={setActiveView}
          />

          {/* View Content */}
          <div className="flex-1 min-h-0">
            {renderView()}
          </div>
        </Main>
      </div>

      <TasksDialogs />
    </TasksProvider>
  )
}
