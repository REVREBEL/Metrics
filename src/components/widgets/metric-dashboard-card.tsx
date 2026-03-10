"use client"

import React from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Bar, BarChart, Label, Pie, PieChart, ResponsiveContainer, Sector } from "recharts"
import type { PieSectorDataItem } from "recharts/types/polar/Pie"

import { Card, CardContent } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

type MetricTrend = "up" | "down"

export type MetricDashboardStat = {
  label: string
  value: string
  delta: string
  trend: MetricTrend
}

export type MetricDashboardHero = {
  label: string
  value: string
  delta: string
  trend: MetricTrend
}

export type MetricDashboardDonutDatum = {
  key: string
  label: string
  value: number
  color: string
}

export type MetricDashboardCardProps = {
  stats: [MetricDashboardStat, MetricDashboardStat, MetricDashboardStat, MetricDashboardStat]
  hero: MetricDashboardHero
  donut: {
    data: MetricDashboardDonutDatum[]
    centerLabel: string
    centerSubLabel: string
  }
  sparklineData: Array<{ val: number }>
  className?: string
}

function TrendRow({ delta, trend }: Pick<MetricDashboardStat, "delta" | "trend">) {
  const isUp = trend === "up"
  const Icon = isUp ? ArrowUp : ArrowDown
  const toneClass = isUp ? "text-cyan-600" : "text-red-500"

  return (
    <div className={`flex items-center text-sm font-semibold ${toneClass}`}>
      <Icon className="mr-1 size-4" />
      {delta}
    </div>
  )
}

export function MetricDashboardCard({
  stats,
  hero,
  donut,
  sparklineData,
  className,
}: MetricDashboardCardProps) {
  const [topLeft, topRight, bottomLeft, bottomRight] = stats
  const total = donut.data.reduce((acc, item) => acc + item.value, 0)

  const chartConfig = donut.data.reduce<ChartConfig>(
    (acc, item) => {
      acc[item.key] = {
        label: item.label,
        color: item.color,
      }
      return acc
    },
    {
      total: {
        label: "Total",
      },
    },
  )

  const pieData = donut.data.map((item) => ({
    browser: item.key,
    visitors: item.value,
    fill: `var(--color-${item.key})`,
  }))

  return (
    <Card className={["w-full max-w-4xl border-none bg-[#f0f4f8] p-6 shadow-lg", className].filter(Boolean).join(" ")}>
      <CardContent className="grid grid-cols-1 gap-8 p-0 md:grid-cols-2">
        <div className="flex flex-col justify-between gap-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-black text-[#1e3a5a]">{topLeft.label}</p>
              <p className="text-4xl font-bold text-[#1e3a5a]">{topLeft.value}</p>
              <TrendRow delta={topLeft.delta} trend={topLeft.trend} />
            </div>
            <div>
              <p className="text-2xl font-black uppercase text-[#1e3a5a]">{topRight.label}</p>
              <p className="text-4xl font-bold text-[#1e3a5a]">{topRight.value}</p>
              <TrendRow delta={topRight.delta} trend={topRight.trend} />
            </div>
          </div>

          <div>
            <p className="text-7xl font-black tracking-tighter text-[#1e3a5a]">{hero.label}</p>
            <p className="mt-2 text-6xl font-bold text-[#1e3a5a]">{hero.value}</p>
            <div className={`mt-2 flex items-center text-lg font-bold ${hero.trend === "up" ? "text-cyan-600" : "text-red-500"}`}>
              {hero.trend === "up" ? (
                <ArrowUp className="mr-1 size-6 fill-current" />
              ) : (
                <ArrowDown className="mr-1 size-6 fill-current" />
              )}
              {hero.delta}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-black text-[#1e3a5a]">{bottomLeft.label}</p>
              <p className="text-4xl font-bold text-[#1e3a5a]">{bottomLeft.value}</p>
              <TrendRow delta={bottomLeft.delta} trend={bottomLeft.trend} />
            </div>
            <div>
              <p className="text-2xl font-black text-[#1e3a5a]">{bottomRight.label}</p>
              <p className="text-4xl font-bold text-[#1e3a5a]">{bottomRight.value}</p>
              <TrendRow delta={bottomRight.delta} trend={bottomRight.trend} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="flex h-[300px] items-center justify-center border-none bg-[#e2edf7] p-4">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square h-full max-h-[250px] w-full">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={pieData}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  outerRadius={88}
                  strokeWidth={5}
                  activeIndex={0}
                  activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                    <Sector {...props} outerRadius={outerRadius + 10} />
                  )}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
                        return null
                      }

                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-[#1e3a5a] text-3xl font-bold"
                          >
                            {donut.centerLabel || total.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-[#1e3a5a] text-xs opacity-70"
                          >
                            {donut.centerSubLabel}
                          </tspan>
                        </text>
                      )
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </Card>

          <Card className="flex h-[150px] items-end border-none bg-[#e2edf7] p-4">
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={sparklineData}>
                <Bar dataKey="val" fill="#add8e6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
