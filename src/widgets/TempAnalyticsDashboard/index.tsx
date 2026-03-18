"use client";

import { useState } from "react";
import ArrowCircleUp from "@/assets/rebel-icons/ArrowCircleUp";
import ArrowCircleDown from "@/assets/rebel-icons/ArrowCircleDown";
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
    <Card className="w-full max-w-5xl border-none bg-background retro-shadow-primary-md overflow-hidden p-0">
      {/* 1. Header Navigation */}
      <div className="grid grid-cols-4 border-b border-muted">
        {metrics.map((m) => {
          const isActive = activeKey === m.key;
          return (
            <button
            
              key={m.key}
              onClick={() => setActiveKey(m.key)}
              className={`relative flex flex-col p-6 transition-all text-left border-r border-muted last:border-r-0 hover:bg-muted/30
                ${isActive ? `${m.bgColor} shadow-inner` : "bg-transparent"}
              `}
            >
              {/* Top Accent Line */}
              {isActive && <div className="absolute top-0 left-0 w-full h-1 bg-dark-blue" />}
              
              <span className={`font-display uppercase font-bold text-[10px] tracking-widest mb-2 
                ${isActive ? "text-background" : "text-slate-500"}`}>
                {m.label}
              </span>

              <div className="flex items-center gap-2 mb-1">
                <span className={`font-display font-bold text-3xl 
                  ${isActive ? "text-background" : "text-dark-blue"}`}>
                  {m.value}
                </span>
                {m.trend === "up" ? (
                  <ArrowCircleUp className={`w-6 h-6 ${isActive ? "text-background" : "text-positive"}`} />
                ) : (
                  <ArrowCircleDown className={`w-6 h-6 ${isActive ? "text-background" : "text-negative"}`} />
                )}
              </div>

              <span className={`font-serif font-light text-xs 
                ${isActive ? "text-background/80" : "text-slate-400"}`}>
                {m.change} more than usual
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Chart Section */}
      <CardContent className="p-8">
        <div className="mb-8 flex items-end justify-between">
            <div>
                <h2 className="font-display uppercase font-bold text-lg text-dark-blue">Area Chart</h2>
                <p className="font-serif font-light text-sm text-slate-500 italic">
                  Showing {activeMetric.label.toLowerCase()} for the last 6 months
                </p>
            </div>
            <div className="flex items-center gap-2 font-display font-bold text-[10px] uppercase text-slate-400">
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
                tick={{ className: "font-serif text-[11px] fill-slate-400" }} 
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ className: "font-serif text-[11px] fill-slate-400" }} 
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
        <div className="mt-8 pt-6 border-t border-muted flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 font-display font-bold text-dark-blue">
                  <span>Trending up by 5.2% this month</span>
                  <TrendingUp className="w-4 h-4" />
              </div>
              <p className="font-serif font-light text-xs text-slate-400 mt-1 uppercase tracking-tighter">January - June 2024</p>
            </div>
            <button className="text-[10px] font-display font-bold uppercase text-dark-blue hover:underline underline-offset-4">
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
      <div className="bg-secondary border border-muted p-4 rounded-sm retro-shadow-primary-md min-w-[140px]">
        <p className="font-display font-bold text-[10px] uppercase text-dark-blue mb-2 tracking-widest">{label}</p>
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <div className="w-1 h-4 rounded-full" style={{ backgroundColor: activeColorVar }} />
                <span className="font-serif font-light text-[11px] text-slate-500">Total</span>
            </div>
            <span className="font-display font-bold text-sm text-dark-blue tabular-nums">{payload[0].value}</span>
        </div>
      </div>
    );
  }
  return null;
};