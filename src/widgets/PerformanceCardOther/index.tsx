"use client"

import React from "react";
import { TrendingUp } from "lucide-react"
import { ArrowUp, ArrowDown } from "lucide-react";
import { 
  Label, BarChart, Bar, ResponsiveContainer, 
  PieChart, Pie, Cell, Sector,
} from "recharts";
import { type PieSectorDataItem } from "recharts/types/polar/Pie"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

// Mock data for the bar chart
const barData = [
  { val: 10 }, { val: 15 }, { val: 35 }, { val: 12 }, { val: 35 }, 
  { val: 20 }, { val: 25 }, { val: 10 }, { val: 30 }, { val: 38 }, 
  { val: 5 }, { val: 18 }, { val: 22 }, { val: 24 }, { val: 5 }
];
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

// Data for the multi-ring radial chart
const ringData = [
  { name: 'Inner', value: 70, color: '#f59e0b' },
  { name: 'Middle', value: 85, color: '#2dd4bf' },
  { name: 'Outer', value: 65, color: '#ef4444' },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export default function HospitalityDashboard() {
  return (
    <Card className="w-full max-w-4xl bg-[#f0f4f8] p-6 border-none shadow-lg">
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-0">
        
        {/* Left Side: Stats */}
        <div className="flex flex-col justify-between space-y-8">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[#1e3a5a] font-black text-2xl">OCCP</p>
              <p className="text-[#1e3a5a] text-4xl font-bold">67.2%</p>
              <div className="flex items-center text-cyan-600 text-sm font-semibold">
                <ArrowDown className="w-4 h-4 mr-1" /> 3% var
              </div>
            </div>
            <div>
              <p className="text-[#1e3a5a] font-black text-2xl uppercase">Rms</p>
              <p className="text-[#1e3a5a] text-4xl font-bold">3,340</p>
              <div className="flex items-center text-cyan-600 text-sm font-semibold">
                <ArrowUp className="w-4 h-4 mr-1" /> 1,645 var
              </div>
            </div>
          </div>

          {/* Budget Section */}
          <div>
            <p className="text-[#1e3a5a] font-black text-7xl tracking-tighter">BUDGET</p>
            <p className="text-[#1e3a5a] text-6xl font-bold mt-2">$670,146</p>
            <div className="flex items-center text-cyan-600 text-lg font-bold mt-2">
              <ArrowUp className="w-6 h-6 mr-1 fill-current" /> $128,167 var
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[#1e3a5a] font-black text-2xl">ADR</p>
              <p className="text-[#1e3a5a] text-4xl font-bold">$323.19</p>
              <div className="flex items-center text-red-500 text-sm font-semibold">
                <ArrowDown className="w-4 h-4 mr-1" /> $32.99 var
              </div>
            </div>
            <div>
              <p className="text-[#1e3a5a] font-black text-2xl">REVPAR</p>
              <p className="text-[#1e3a5a] text-4xl font-bold">$156.16</p>
              <div className="flex items-center text-cyan-600 text-sm font-semibold">
                <ArrowUp className="w-4 h-4 mr-1" /> $6.34 var
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Charts */}
        <div className="space-y-4">
          {/* Multi-Ring Chart Card */}
          <Card className="bg-[#e2edf7] border-none flex items-center justify-center p-4 relative overflow-hidden h-[300px]">
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <p className="text-[#1e3a5a] text-3xl font-bold">$262,125</p>
              <p className="text-[#1e3a5a] text-sm opacity-70">To Book</p>
            </div>

<Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut Active</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                    <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                        {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
          </Card>
          </Card>
          {/* Bar Chart Card */}
          <Card className="bg-[#e2edf7] border-none h-[150px] p-4 flex items-end">
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={barData}>
                <Bar dataKey="val" fill="#add8e6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}