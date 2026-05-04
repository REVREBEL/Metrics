"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { MoreVertical } from "lucide-react"


const chartData = [
  { service: "UI design", sales: 99, fill: "var(--color-ui)" },
  { service: "UX design", sales: 94, fill: "var(--color-ux)" },
  { service: "Music", sales: 80, fill: "var(--color-music)" },
  { service: "Animation", sales: 68, fill: "var(--color-animation)" },
  { service: "React", sales: 52, fill: "var(--color-react)" },
  { service: "SEO", sales: 45, fill: "var(--color-seo)" },
]

const chartConfig = {
  sales: {
    label: "Sales",
  },
  ui: { label: "UI design", color: "#A7C7D7" },
  ux: { label: "UX design", color: "#F7C97E" },
  music: { label: "Music", color: "#E15D24" },
  animation: { label: "Animation", color: "#CD2100" },
  react: { label: "React", color: "#7C2D5C" },
  seo: { label: "SEO", color: "#0B1E3F" },
} satisfies ChartConfig


export default function SalesChart() {
  return (
    <Card className="w-full max-w-4xl bg-[#F8FAFC]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-8">
        <CardTitle className="text-xl font-bold text-[#0F172A]">Top Services by Sales</CardTitle>
        <MoreVertical className="h-5 w-5 text-muted-foreground cursor-pointer" />
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: The Chart */}
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: -20, right: 20 }}
          >
            <CartesianGrid horizontal={false} vertical={true} strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="sales"
              hide={false}
              axisLine={false}
              tickLine={false}
              ticks={[0, 25, 50, 75, 100]}
              tickFormatter={(value) => `${value}%`}
              className="text-xs font-medium"
            />
            <YAxis
              dataKey="service"
              type="category"
              tickLine={false}
              axisLine={false}
              // This renders the 1, 2, 3 indices on the left
              tick={(props) => (
                <text x={props.x} y={props.y} dy={4} textAnchor="end" className="text-xs fill-muted-foreground">
                  {props.index + 1}
                </text>
              )}
            />
            <Bar
              dataKey="sales"
              layout="vertical"
              radius={[0, 10, 10, 0]} // Rounded right edge
              barSize={32}
            >
              <LabelList
                dataKey="service"
                position="insideLeft"
                offset={12}
                className="fill-white text-[11px] font-medium"
              />
            </Bar>
          </BarChart>
        </ChartContainer>

        {/* Right Side: The Legend List */}
        <div className="grid grid-cols-2 gap-y-8 gap-x-4 py-4">
          {chartData.map((item) => (
            <div key={item.service} className="space-y-1">
              <div className="flex items-center gap-2">
                <div 
                  className="h-2 w-2 rounded-full" 
                  style={{ backgroundColor: chartConfig[item.service.split(' ')[0].toLowerCase() as keyof typeof chartConfig]?.color }} 
                />
                <span className="text-sm font-medium text-slate-600">{item.service}</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{item.sales}%</div>
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  )
}