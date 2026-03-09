"use client"

import React, { useEffect, useState } from "react"
import { useDuckDb } from "@/hooks/useDuckDb"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Skeleton } from "@/components/ui/skeleton"

export function YearMonthSelector({
    onSelectionChange
}: {
    onSelectionChange?: (year: string, month: string) => void
}) {
    const { execute, isInitializing, error } = useDuckDb()
    const [availableYears, setAvailableYears] = useState<string[]>([])
    const [monthsByYear, setMonthsByYear] = useState<Record<string, string[]>>({})
    const [selectedYear, setSelectedYear] = useState<string>("")
    const [selectedMonth, setSelectedMonth] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        async function loadDates() {
            if (isInitializing) return
            if (error) {
                setIsLoading(false)
                return
            }

            try {
                const parquetUrl = `${window.location.origin}/data/dashboard_trend.parquet`
                const results = await execute(`
          SELECT DISTINCT
            CAST(YEAR(stay_date) AS INTEGER) as year,
            CAST(MONTH(stay_date) AS INTEGER) as month
          FROM '${parquetUrl}'
          ORDER BY year DESC, month ASC
        `)

                const yearsSet = new Set<string>()
                const monthsMap: Record<string, string[]> = {}

                results.forEach((row: any) => {
                    if (!row.year || !row.month) return
                    const y = row.year.toString()
                    // Create date using local month (0-indexed)
                    const md = new Date(2000, row.month - 1, 1)
                    const mStr = md.toLocaleString('default', { month: 'short' })

                    yearsSet.add(y)
                    if (!monthsMap[y]) monthsMap[y] = []
                    monthsMap[y].push(mStr)
                })

                const years = Array.from(yearsSet)
                setAvailableYears(years)
                setMonthsByYear(monthsMap)

                const testDateEnv = process.env.NEXT_PUBLIC_TEST_DATE;
                const today = testDateEnv ? new Date(testDateEnv) : new Date();
                const currentYear = today.getFullYear().toString();
                const currentMonthStr = today.toLocaleString('default', { month: 'short' });

                if (years.includes(currentYear)) {
                    setSelectedYear(currentYear);
                    if (monthsMap[currentYear] && monthsMap[currentYear].includes(currentMonthStr)) {
                        setSelectedMonth(currentMonthStr);
                    } else if (monthsMap[currentYear] && monthsMap[currentYear].length > 0) {
                        setSelectedMonth(monthsMap[currentYear][0]);
                    }
                } else if (years.length > 0) {
                    setSelectedYear(years[0]);
                    if (monthsMap[years[0]] && monthsMap[years[0]].length > 0) {
                        setSelectedMonth(monthsMap[years[0]][0]);
                    }
                }
            } catch (e) {
                console.error("Error loading dates from DuckDB", e)
            } finally {
                setIsLoading(false)
            }
        }

        loadDates()
    }, [execute, isInitializing, error])

    useEffect(() => {
        if (selectedYear && selectedMonth && onSelectionChange) {
            onSelectionChange(selectedYear, selectedMonth)
        }
    }, [selectedYear, selectedMonth, onSelectionChange])

    // handle year switch logic
    const handleYearChange = (value: string) => {
        if (value) {
            setSelectedYear(value)
            // Automatically select a valid month for the new year
            if (monthsByYear[value] && monthsByYear[value].length > 0) {
                if (!monthsByYear[value].includes(selectedMonth)) {
                    setSelectedMonth(monthsByYear[value][0])
                }
            } else {
                setSelectedMonth("")
            }
        }
    }

    const handleMonthChange = (value: string) => {
        if (value) {
            setSelectedMonth(value)
        }
    }

    if (isInitializing || isLoading) {
        return <Skeleton className="h-10 w-full max-w-[600px] rounded-md" />
    }

    if (error) {
        return <div className="text-destructive text-sm font-medium">Failed to load date selector.</div>
    }

    return (
        <div className="flex flex-row items-center gap-2 w-fit border p-2 rounded-md bg-card shadow-none">
            {/* Years Toggle Group */}
            <ToggleGroup
                type="single"
                value={selectedYear}
                onValueChange={handleYearChange}
                className="bg-muted p-1 rounded-sm flex items-center gap-1"
            >
                {availableYears.map(year => (
                    <ToggleGroupItem
                        key={year}
                        value={year}
                        className="text-md font-display font-bold h-8 w-24 justify-center rounded-sm data-[state=on]:bg-[var(--color-4)] data-[state=on]:text-[var(--color-4-inverse)] text-muted-foreground transition-all hover:bg-secondary hover:text-secondary-foreground shadow-none"
                    >
                        {year}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>

            {/* Months Toggle Group */}
            <ToggleGroup
                type="single"
                value={selectedMonth}
                onValueChange={handleMonthChange}
                className="bg-muted p-1 rounded-sm flex items-center gap-1"
            >
                {monthsByYear[selectedYear]?.map(month => (
                    <ToggleGroupItem
                        key={month}
                        value={month}
                        className="text-md font-display font-bold h-8 w-18 justify-center rounded-sm data-[state=on]:bg-primary data-[state=on]:text-primary-foreground text-muted-foreground transition-all uppercase hover:bg-secondary hover:text-secondary-foreground shadow-none"
                    >
                        {month}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    )
}
