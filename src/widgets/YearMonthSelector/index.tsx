"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useDuckDb } from "@/hooks/useDuckDb"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Skeleton } from "@/components/ui/skeleton"

const ALL_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const
const MAX_VISIBLE_YEARS = 3

interface DateAvailabilityManifest {
  generatedAt: string
  years: Array<{
    year: string
    months: number[]
    minDate?: string
    maxDate?: string
  }>
}

interface DuckDbAvailabilityRow {
  year: number | string
  month: number | string
}

function toMonthLabel(monthNumber: number) {
  return ALL_MONTHS[monthNumber - 1]
}

function normalizeAvailability(
  entries: Array<{ year: string; months: number[] }>,
) {
  const years = entries
    .map((entry) => entry.year)
    .sort((a, b) => Number(a) - Number(b))
    .slice(-MAX_VISIBLE_YEARS)

  const visibleYearSet = new Set(years)
  const monthsByYear = entries.reduce<Record<string, string[]>>((acc, entry) => {
    if (!visibleYearSet.has(entry.year)) {
      return acc
    }

    acc[entry.year] = entry.months
      .slice()
      .sort((a, b) => a - b)
      .map(toMonthLabel)

    return acc
  }, {})

  return { years, monthsByYear }
}

function getDefaultSelection(monthsByYear: Record<string, string[]>, years: string[]) {
  const testDateEnv = process.env.NEXT_PUBLIC_TEST_DATE
  const today = testDateEnv ? new Date(testDateEnv) : new Date()
  const currentYear = today.getFullYear().toString()
  const currentMonth = today.toLocaleString("default", { month: "short" })

  if (years.includes(currentYear)) {
    const currentYearMonths = monthsByYear[currentYear] ?? []
    if (currentYearMonths.includes(currentMonth)) {
      return { year: currentYear, month: currentMonth }
    }
    if (currentYearMonths.length > 0) {
      return { year: currentYear, month: currentYearMonths[currentYearMonths.length - 1] }
    }
  }

  const latestYear = years[years.length - 1]
  const latestYearMonths = latestYear ? monthsByYear[latestYear] ?? [] : []

  return {
    year: latestYear ?? "",
    month: latestYearMonths[latestYearMonths.length - 1] ?? "",
  }
}

export function YearMonthSelector({
  onSelectionChange,
}: {
  onSelectionChange?: (year: string, month: string) => void
}) {
  const { execute, isInitializing, error } = useDuckDb()
  const [availableYears, setAvailableYears] = useState<string[]>([])
  const [monthsByYear, setMonthsByYear] = useState<Record<string, string[]>>({})
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [selectedMonth, setSelectedMonth] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [loadError, setLoadError] = useState<string>("")

  useEffect(() => {
    async function applyAvailability(entries: Array<{ year: string; months: number[] }>) {
      const { years, monthsByYear: nextMonthsByYear } = normalizeAvailability(entries)
      setAvailableYears(years)
      setMonthsByYear(nextMonthsByYear)

      const fallbackSelection = getDefaultSelection(nextMonthsByYear, years)
      setSelectedYear((currentYear) => {
        if (currentYear && years.includes(currentYear)) {
          return currentYear
        }
        return fallbackSelection.year
      })
      setSelectedMonth((currentMonth) => {
        if (
          currentMonth &&
          fallbackSelection.year &&
          (nextMonthsByYear[fallbackSelection.year] ?? []).includes(currentMonth)
        ) {
          return currentMonth
        }
        return fallbackSelection.month
      })
    }

    async function loadFromManifest() {
      const response = await fetch("/data/dashboard_date_availability.json", {
        cache: "force-cache",
      })

      if (!response.ok) {
        throw new Error(`Manifest request failed with ${response.status}`)
      }

      const manifest = (await response.json()) as DateAvailabilityManifest
      if (!manifest.years?.length) {
        throw new Error("Manifest contained no years")
      }

      await applyAvailability(manifest.years)
    }

    async function loadFromDuckDb() {
      const results = await execute(`
        SELECT
          CAST(YEAR(stay_date) AS INTEGER) AS year,
          CAST(MONTH(stay_date) AS INTEGER) AS month
        FROM 'dashboard_current.parquet'
        GROUP BY 1, 2
        ORDER BY year ASC, month ASC
      `)

      const availabilityMap = new Map<string, Set<number>>()

      results.forEach((row) => {
        const availabilityRow = row as DuckDbAvailabilityRow
        if (!availabilityRow.year || !availabilityRow.month) return

        const year = availabilityRow.year.toString()
        const month = Number(availabilityRow.month)
        if (!availabilityMap.has(year)) {
          availabilityMap.set(year, new Set<number>())
        }
        availabilityMap.get(year)?.add(month)
      })

      const entries = Array.from(availabilityMap.entries()).map(([year, months]) => ({
        year,
        months: Array.from(months),
      }))

      if (entries.length === 0) {
        throw new Error("No available dates found in DuckDB")
      }

      await applyAvailability(entries)
    }

    async function loadDates() {
      setLoadError("")

      try {
        await loadFromManifest()
        setIsLoading(false)
        return
      } catch (manifestError) {
        if (isInitializing) {
          return
        }

        if (error) {
          setLoadError("Failed to load date selector.")
          setIsLoading(false)
          return
        }

        try {
          await loadFromDuckDb()
          setIsLoading(false)
          return
        } catch (duckDbError) {
          console.error("Failed to load date availability", {
            manifestError,
            duckDbError,
          })
          setLoadError("Failed to load date selector.")
          setIsLoading(false)
        }
      }
    }

    loadDates()
  }, [execute, isInitializing, error])

  useEffect(() => {
    if (selectedYear && selectedMonth && onSelectionChange) {
      onSelectionChange(selectedYear, selectedMonth)
    }
  }, [selectedYear, selectedMonth, onSelectionChange])

  const availableMonthsForSelectedYear = useMemo(
    () => monthsByYear[selectedYear] ?? [],
    [monthsByYear, selectedYear],
  )

  const handleYearChange = (value: string) => {
    if (!value) return

    setSelectedYear(value)
    const nextAvailableMonths = monthsByYear[value] ?? []
    if (!nextAvailableMonths.includes(selectedMonth)) {
      setSelectedMonth(nextAvailableMonths[nextAvailableMonths.length - 1] ?? "")
    }
  }

  const handleMonthChange = (value: string) => {
    if (!value || !availableMonthsForSelectedYear.includes(value)) return
    setSelectedMonth(value)
  }

  if ((isInitializing && isLoading) || isLoading) {
    return <Skeleton className="h-10 w-full max-w-[720px] rounded-md" />
  }

  if (loadError) {
    return <div className="text-destructive text-sm font-medium">{loadError}</div>
  }

  return (
    <div className="flex w-fit flex-row items-center gap-2 rounded-md transparent shadow-none">
      <ToggleGroup
        type="single"
        value={selectedYear}
        onValueChange={handleYearChange}
        className="flex items-center gap-1 rounded-sm bg-muted  border border-dark-blue/10 p-1"
      >
        {availableYears.map((year) => (
          <ToggleGroupItem
            key={year}
            value={year}
            className="h-8 w-24 justify-center text-md font-display font-bold rounded-md text-muted-foreground 
            transition-all data-[state=on]:bg-primary-inverse data-[state=on]:text-primary-foreground-inverse
              hover:bg-primary
              hover:text-primary-foreground
              disabled:cursor-not-allowed 
              disabled:opacity-35 
              disabled:hover:bg-transparent 
              disabled:hover:text-muted-foreground"
          >
            {year}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <ToggleGroup
        type="single"
        value={selectedMonth}
        onValueChange={handleMonthChange}
        className="flex items-center gap-1 rounded-sm bg-muted border border-dark-blue/10  p-1"
      >
        {ALL_MONTHS.map((month) => {
          const isAvailable = availableMonthsForSelectedYear.includes(month)

          return (
            <ToggleGroupItem
              key={`${selectedYear}-${month}`}
              value={month}
              disabled={!isAvailable}
              className="h-8 w-16 justify-center text-md font-display font-bold uppercase rounded-md text-muted-foreground shadow-none transition-all data-[state=on]:bg-primary data-[state=on]:text-primary-foreground             
                hover:bg-primary-inverse 
                hover:text-primary-foreground-inverse
                disabled:cursor-not-allowed 
                disabled:opacity-35 
                disabled:hover:bg-transparent 
                disabled:hover:text-muted-foreground"
            >
              {month}
            </ToggleGroupItem>
          )
        })}
      </ToggleGroup>
    </div>
  )
}
