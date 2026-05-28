"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  MetricCard,
  MetricInsight,
} from "@/widgets/_shared/MetricCard";

export const description = "A bar chart with a custom label";

type MonthDatum = {
  month: string;
  desktop: number;
  mobile: number;
};

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
] satisfies MonthDatum[];

const getMonthVariable = (index: number) =>
  `var(--metric-month${String(index + 1).padStart(2, "0")})`;

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--metric-color)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--metric-variance-color)",
  },
  label: {
    color: "var(--metric-chart-label-color)",
  },
} satisfies ChartConfig;

export function ChartBarLabelCustom() {
  return (
    <MetricCard
      title="Bar Chart - Custom Label"
      description="January - June 2024"
      metric="total"
    >
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            left: 0,
            right: 36,
          }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="month"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            hide
          />
          <XAxis dataKey="desktop" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Bar
            dataKey="desktop"
            layout="vertical"
            fill="var(--metric-color)"
            radius={4}
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.month} fill={getMonthVariable(index)} />
            ))}
            <LabelList
              dataKey="month"
              position="insideLeft"
              offset={8}
              className="metric-card__chart-label"
              fontSize={12}
              formatter={(value: string) => value.slice(0, 3)}
            />
            <LabelList
              dataKey="desktop"
              position="right"
              offset={8}
              className="metric-card__chart-value"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>

      <div className="metric-card__chart-footer">
        <MetricInsight label="Trend:">
          Trending up by 5.2% this month <TrendingUp className="inline h-4 w-4 align-text-bottom" />
        </MetricInsight>
      </div>
    </MetricCard>
  );
}
