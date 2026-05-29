"use client"

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getDefaultHotelAction } from '@/app/(app)/tasks/actions'

export type PropertyInfo = {
  id: string
  name: string
}

type PropertyContextType = {
  /** The currently active hotel/property. Null until resolved or when DB is unavailable. */
  activeProperty: PropertyInfo | null
  /** Whether the property context is still loading */
  isResolvingProperty: boolean
  /** Switch the active property (for multi-property support) */
  setActiveProperty: (property: PropertyInfo) => void
}

const PropertyContext = createContext<PropertyContextType | null>(null)

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [activeProperty, setActivePropertyState] = useState<PropertyInfo | null>(null)
  const [isResolvingProperty, setIsResolvingProperty] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function resolveProperty() {
      try {
        const hotel = await getDefaultHotelAction()
        if (!cancelled) {
          setActivePropertyState(hotel)
        }
      } catch {
        // DB unavailable — stay null (fixture mode)
      } finally {
        if (!cancelled) setIsResolvingProperty(false)
      }
    }

    void resolveProperty()
    return () => { cancelled = true }
  }, [])

  const setActiveProperty = useCallback((property: PropertyInfo) => {
    setActivePropertyState(property)
  }, [])

  return (
    <PropertyContext value={{ activeProperty, isResolvingProperty, setActiveProperty }}>
      {children}
    </PropertyContext>
  )
}

export function useProperty() {
  const ctx = useContext(PropertyContext)
  if (!ctx) {
    throw new Error('useProperty must be used within a PropertyProvider')
  }
  return ctx
}
