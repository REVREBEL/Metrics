"use client"

import React from "react"

import {
  MetricDashboardCard,
  type MetricDashboardCardProps,
} from "@/components/widgets/metric-dashboard-card"

const sparklineData = [
  { val: 10 },
  { val: 15 },
  { val: 35 },
  { val: 12 },
  { val: 35 },
  { val: 20 },
  { val: 25 },
  { val: 10 },
  { val: 30 },
  { val: 38 },
  { val: 5 },
  { val: 18 },
  { val: 22 },
  { val: 24 },
  { val: 5 },
]

type PerformanceCardOtherProps = {
  year: string
  month: string
}

function buildPerformanceCardConfig(year: string, month: string): MetricDashboardCardProps {
  return {
    stats: [
      { label: "OCCP", value: "67.2%", delta: "3% var", trend: "down" },
      { label: "Rms", value: "3,340", delta: "1,645 var", trend: "up" },
      { label: "ADR", value: "$323.19", delta: "$32.99 var", trend: "down" },
      { label: "REVPAR", value: "$156.16", delta: "$6.34 var", trend: "up" },
    ],
    hero: {
      label: "BUDGET",
      value: "$670,146",
      delta: "$128,167 var",
      trend: "up",
    },
    donut: {
      data: [
        { key: "transient", label: "Transient", value: 275, color: "hsl(var(--chart-1))" },
        { key: "group", label: "Group", value: 200, color: "hsl(var(--chart-2))" },
        { key: "corporate", label: "Corporate", value: 287, color: "hsl(var(--chart-3))" },
        { key: "wholesale", label: "Wholesale", value: 173, color: "hsl(var(--chart-4))" },
        { key: "other", label: "Other", value: 190, color: "hsl(var(--chart-5))" },
      ],
      centerLabel: "$262,125",
      centerSubLabel: `${month} ${year}`,
    },
    sparklineData,
  }
}

export default function PerformanceCardOther({ year, month }: PerformanceCardOtherProps) {
  return <MetricDashboardCard {...buildPerformanceCardConfig(year, month)} />
}

export { buildPerformanceCardConfig }
