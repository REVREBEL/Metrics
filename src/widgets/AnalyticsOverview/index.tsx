"use client";

import { useState } from "react";
import ArrowCircleDown from "@/assets/rebel-icons/ArrowCircleDown";
import ArrowCircleUp from "@/assets/rebel-icons/ArrowCircleUp";
import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", views: 186, activeUsers: 120, eventCount: 300, purchases: 10 },
  { month: "Feb", views: 305, activeUsers: 210, eventCount: 550, purchases: 25 },
  { month: "Mar", views: 237, activeUsers: 190, eventCount: 400, purchases: 18 },
  { month: "Apr", views: 73, activeUsers: 50, eventCount: 150, purchases: 5 },
  { month: "May", views: 209, activeUsers: 160, eventCount: 420, purchases: 15 },
  { month: "Jun", views: 214, activeUsers: 175, eventCount: 450, purchases: 20 },
];

const metrics = [
  { key: "views", label: "Views", value: "86.0k", change: "24.5K", trend: "up", bgColor: "bg-light-blue", colorVar: "var(--color-light-blue)" },
  { key: "activeUsers", label: "Active Users", value: "6.5k", change: "1.5K", trend: "up", bgColor: "bg-light-green", colorVar: "var(--color-light-green)" },
  { key: "eventCount", label: "Event Count", value: "+6.0k", change: "245", trend: "up", bgColor: "bg-green", colorVar: "var(--color-green)" },
  { key: "purchases", label: "Purchases", value: "$111.3k", change: "$9.6k", trend: "down", bgColor: "bg-dark-green", colorVar: "var(--color-dark-green)" },
];

export default function AnalyticsOverview() {
  const [activeKey, setActiveKey] = useState("views");
  const activeMetric = metrics.find((m) => m.key === activeKey)!;

  return (
    <Card className="w-full max-w-5xl retro-shadow-primary-md bg-white border border-primary rounded-sm  overflow-hidden p-0">
      {/* 3. Interactive Header (Tabs) */}
      <div className="grid grid-cols-4 border-b border-color-primary">
        {metrics.map((m) => {
          const isActive = activeKey === m.key;
          return (
            <button 
              key={m.key}
              onClick={() => setActiveKey(m.key)}
              className={`flex flex-col items-center justify-center p-6 text-center group cursor-pointer border-r  border-color-primary last:border-r-0 transition-colors
                ${isActive ? "bg-secondary" : "hover:bg-gray-50"}
              `}
            >
              {/* Blue indicator line for active state */}
              {isActive && <div className="absolute top-0 left-0 w-full h-1 bg-secondary" />}

              <span className="text-xs font-semibold text-dark-blue uppercase tracking-wider mb-2">
                {m.label}
              </span>

              <div className="flex items-center gap-2 mb-2">
                <span className={`text-4xl font-serif font-semi-bold text-dark-blue`}>
                  {m.value}
                </span>
                {m.trend === "up" ? (
                  <ArrowCircleUp className="h-6 w-6 text-positive fill-positive" />
                ) : (
                  <ArrowCircleDown className="h-6 w-6 text-negative fill-negative" />
                )}
              </div>

              <span className="text-[16px] font-serif font-light text-gray-400">
                {m.change} more than usual
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Chart Section */}
      <CardContent className="p-8">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="font-display uppercase font-bold text-xl text-dark-blue">Area Chart</h2>
            <p className="font-serif font-light text-sm text-slate-500">
              Showing {activeMetric.label.toLowerCase()} for the last 6 months
            </p>
          </div>
          <div className="flex items-center gap-2 font-display font-bold text-[12px] uppercase text-primary">
            <div className={`w-3 h-3 rounded-sm ${activeMetric.bgColor}`} />
            {activeMetric.label}
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--color-muted)" strokeDasharray="0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ className: "font-dispay font-bold uppercase text-[11px] fill-slate-400" }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ className: "font-dispay font-bold uppercase  text-[11px] fill-slate-400" }}
              />
              <Tooltip
                content={<CustomTooltip activeColorVar={activeMetric.colorVar} />}
                cursor={{ stroke: "var(--color-dark-blue)", strokeWidth: 1 }}
              />
              <Area
                type="linear" // Jagged style
                dataKey={activeKey}
                stroke={activeMetric.colorVar}
                strokeWidth={2.5}
                fill={activeMetric.colorVar}
                fillOpacity={0.15} // Solid background fill
                dot={{ r: 4, fill: activeMetric.colorVar, strokeWidth: 0 }}
                activeDot={{ r: 6, stroke: "var(--color-background)", strokeWidth: 2 }}
              />
            </AreaChart>

          </ResponsiveContainer>
        </div>

        {/* 3. Footer */}
        <div className="mt-12 pt-6 border-t border-muted flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 font-display uppercase font-bold text-green">
              <span>Trending up by 5.2% this month</span>
              <TrendingUp className="w-4 h-4" />
            </div>
            <p className="font-serif font-light text-xs text-primary mt-1 tracking-tighter">January - June 2024</p>
          </div>
          <button className="text-[14x] font-display font-bold uppercase text-dark-blue hover:underline underline-offset-4">
            View Details →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

const CustomTooltip = ({ active, payload, label, activeColorVar }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-primary p-4 rounded-sm retro-shadow-primary-sm min-w-[140px]">
        <p className="font-display font-bold text-[12px] uppercase text-dark-blue mb-2 tracking-widest">{label}</p>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 rounded-full" style={{ backgroundColor: activeColorVar }} />
            <span className="font-serif font-light text-[13px] text-slate-500">Total</span>
          </div>
          <span className="font-serif font-semi-bold text-md text-dark-blue tabular-nums">{payload[0].value}</span>
        </div>
      </div>
    );
  }
  return null;
};