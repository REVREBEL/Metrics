
"use client"

import React, { useState, useEffect, useCallback } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { useProperty } from '@/context/property-context'
import { type Task, type ExternalAssignee, type Workstream } from '../data/schema'
import { externalAssignees as mockExternalAssignees, workstreams as mockWorkstreams } from '../data/tasks'
import {
  listExternalAssigneesAction,
  createExternalAssigneeAction,
  updateExternalAssigneeAction,
  deleteExternalAssigneeAction,
  type ExternalAssigneeRow,
} from '../actions'

type TasksDialogType = 'create' | 'update' | 'delete' | 'import' | 'manage-vendors' | 'add-workstream'

type TasksContextType = {
  open: TasksDialogType | null
  setOpen: (str: TasksDialogType | null) => void
  currentRow: Task | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Task | null>>
  hotelId: string | null
  externalAssignees: ExternalAssignee[]
  isLoadingAssignees: boolean
  addExternalAssignee: (assignee: Omit<ExternalAssignee, 'id' | 'createdAt'>) => Promise<{ ok: boolean; message: string }>
  updateExternalAssignee: (id: string, assignee: Partial<ExternalAssignee>) => Promise<{ ok: boolean; message: string }>
  deleteExternalAssignee: (id: string) => Promise<void>
  workstreams: Workstream[]
  addWorkstream: (workstream: Omit<Workstream, 'id' | 'createdAt' | 'updatedAt'>) => void
}

const TasksContext = React.createContext<TasksContextType | null>(null)

function rowToAssignee(row: ExternalAssigneeRow): ExternalAssignee {
  return {
    id: row.id,
    hotelId: row.hotelId,
    name: row.name,
    entityType: row.entityType as ExternalAssignee['entityType'],
    contactEmail: row.contactEmail ?? undefined,
    createdAt: row.createdAt,
  }
}

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<TasksDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Task | null>(null)

  // Use the app-wide property context for hotel scoping
  const { activeProperty, isResolvingProperty } = useProperty()
  const hotelId = activeProperty?.id ?? null

  // Workstreams — initialise with mock data; new workstreams are added optimistically
  const [workstreams, setWorkstreams] = useState<Workstream[]>(mockWorkstreams)

  const addWorkstream = useCallback((workstream: Omit<Workstream, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const newWorkstream: Workstream = {
      ...workstream,
      id: `ws-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    }
    setWorkstreams((prev) => [...prev, newWorkstream])
  }, [])

  // Start with empty list — we always authoritative-load from the DB.
  // Mock data is only shown while the property is still resolving.
  const [externalAssignees, setExternalAssignees] = useState<ExternalAssignee[]>([])
  const [isLoadingAssignees, setIsLoadingAssignees] = useState(true)

  // When the active property resolves, fetch its external assignees from the DB.
  // If the DB is unavailable (hotelId stays null after resolution), fall back to mocks.
  useEffect(() => {
    let cancelled = false

    async function loadAssignees() {
      setIsLoadingAssignees(true)

      if (hotelId) {
        try {
          const rows = await listExternalAssigneesAction(hotelId)
          if (!cancelled) {
            // Always replace with DB result — even if the array is empty.
            // This ensures we never show assignees from another hotel.
            setExternalAssignees(rows.map(rowToAssignee))
          }
        } catch {
          if (!cancelled) {
            // DB error: clear list to avoid showing stale/mock data
            setExternalAssignees([])
          }
        }
      } else if (!isResolvingProperty) {
        // Property resolution finished but no hotel found → fixture mode, show mocks
        if (!cancelled) setExternalAssignees(mockExternalAssignees)
      }

      if (!cancelled) setIsLoadingAssignees(false)
    }

    if (!isResolvingProperty) {
      void loadAssignees()
    }

    return () => { cancelled = true }
  }, [hotelId, isResolvingProperty])

  const addExternalAssignee = useCallback(
    async (assignee: Omit<ExternalAssignee, 'id' | 'createdAt'>): Promise<{ ok: boolean; message: string }> => {
      if (hotelId) {
        // Connected mode: write to DB, do NOT fall back to local update on failure
        const result = await createExternalAssigneeAction({
          hotelId,
          name: assignee.name,
          entityType: assignee.entityType,
          contactEmail: assignee.contactEmail,
        })
        if (result.ok && result.data) {
          setExternalAssignees((prev) => [...prev, rowToAssignee(result.data!)])
        }
        return { ok: result.ok, message: result.message }
      }

      // Fixture / offline mode only: optimistic local update
      const newAssignee: ExternalAssignee = {
        ...assignee,
        id: `ext-${Date.now()}`,
        createdAt: new Date().toISOString(),
      }
      setExternalAssignees((prev) => [...prev, newAssignee])
      return { ok: true, message: 'Added (offline mode).' }
    },
    [hotelId]
  )

  const updateExternalAssignee = useCallback(
    async (id: string, updates: Partial<ExternalAssignee>): Promise<{ ok: boolean; message: string }> => {
      if (hotelId) {
        // Connected mode: write to DB, do NOT fall back to local update on failure
        const current = externalAssignees.find((a) => a.id === id)
        if (!current) return { ok: false, message: 'Record not found.' }

        const result = await updateExternalAssigneeAction({
          id,
          hotelId,
          name: updates.name ?? current.name,
          entityType: updates.entityType ?? current.entityType,
          contactEmail: updates.contactEmail ?? current.contactEmail,
        })
        if (result.ok && result.data) {
          setExternalAssignees((prev) =>
            prev.map((a) => (a.id === id ? rowToAssignee(result.data!) : a))
          )
        }
        return { ok: result.ok, message: result.message }
      }

      // Fixture / offline mode only
      setExternalAssignees((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
      )
      return { ok: true, message: 'Updated (offline mode).' }
    },
    [hotelId, externalAssignees]
  )

  const deleteExternalAssignee = useCallback(
    async (id: string): Promise<void> => {
      if (hotelId) {
        await deleteExternalAssigneeAction(id, hotelId)
      }
      // Remove from local state regardless (optimistic for delete)
      setExternalAssignees((prev) => prev.filter((a) => a.id !== id))
    },
    [hotelId]
  )

  return (
    <TasksContext value={{
      open,
      setOpen,
      currentRow,
      setCurrentRow,
      hotelId,
      externalAssignees,
      isLoadingAssignees,
      addExternalAssignee,
      updateExternalAssignee,
      deleteExternalAssignee,
      workstreams,
      addWorkstream,
    }}>
      {children}
    </TasksContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
  const tasksContext = React.useContext(TasksContext)

  if (!tasksContext) {
    throw new Error('useTasks has to be used within <TasksContext>')
  }

  return tasksContext
}
