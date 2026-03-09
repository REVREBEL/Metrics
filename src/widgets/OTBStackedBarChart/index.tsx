"use client";
import React, { useEffect } from "react";

import { Bar, ComposedChart, Line, ResponsiveContainer, XAxis, ReferenceArea, Tooltip, Cell } from "recharts";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useDuckDb } from "@/hooks/useDuckDb";

// Custom Tooltip Component to match your mockups
const OTBMixTooltip = ({ active, payload, label, month, year }: any) => {
  if (!active || !payload || !payload.length) return null;

  const dateStr = `${month} ${label}, ${year || new Date().getFullYear()}`;
  const dateObj = new Date(dateStr);
  const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const monthName = dateObj.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();

  const transient = payload.find((p: any) => p.dataKey === 'transient')?.value || 0;
  const group = payload.find((p: any) => p.dataKey === 'group')?.value || 0;
  const total = transient + group;
  const transientPct = total > 0 ? Math.round((transient / total) * 100) : 0;
  const groupPct = total > 0 ? Math.round((group / total) * 100) : 0;

  const isWeekend = payload[0]?.payload?.isWeekend;

  return (
    <div className="card shadow-primary p-6 bg-background border-2 border-primary min-w-[300px]">
      <h3 className="font-display text-3xl uppercase text-primary mb-4">
        {`${weekday}, ${monthName} ${label}`}
      </h3>

      <div className="flex gap-8 mb-6">
        <div className="flex flex-col gap-2 w-full">
          <span className="font-display text-xs uppercase text-muted-foreground">{isWeekend ? 'Weekend' : 'Weekday'}</span>
          <div className="flex items-center justify-between w-full mb-2">
            <div className="flex items-center gap-4">
              <div className={`w-2 h-8 ${isWeekend ? 'bg-[var(--chart-5)]' : 'bg-[var(--chart-4)]'}`} /> {/* Transient */}
              <div className="font-sans text-lg font-bold">{String(transient).padStart(2, '0')} | {String(transientPct).padStart(2, '0')}%</div>
            </div>
            <span className="text-sm font-normal text-muted-foreground mr-12">Transient</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <div className={`w-2 h-8 ${isWeekend ? 'bg-[var(--chart-6)]' : 'bg-[var(--chart-3)]'}`} /> {/* Group */}
              <div className="font-sans text-lg font-bold">{String(group).padStart(2, '0')} | {String(groupPct).padStart(2, '0')}%</div>
            </div>
            <span className="text-sm font-normal text-muted-foreground mr-12">Group</span>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-primary pt-2">
        <p className="font-display text-2xl font-bold uppercase tracking-tighter">OTB/% Mix Rooms By Day</p>
      </div>
    </div>
  );
};

export default function OTBChart({ year, month }: { year?: string, month?: string }) {
  const { execute, isInitializing, error } = useDuckDb();
  const [chartData, setChartData] = React.useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (isInitializing || error || !year || !month) return;

      try {
        const query = `
          SELECT 
            CAST(DAY(stay_date) AS INTEGER) as day, 
            (DAYOFWEEK(stay_date) IN (0, 6)) as isWeekend, 
            CAST(SUM(CASE WHEN segmentGroup = 'Transient' THEN rooms ELSE 0 END) AS INTEGER) as transient, 
            CAST(SUM(CASE WHEN segmentGroup = 'Group' THEN rooms ELSE 0 END) AS INTEGER) as group,
            CAST(MAX(available_rooms) AS INTEGER) as capacity
          FROM 'dashboard_segments.parquet' 
          WHERE YEAR(stay_date) = ${year} AND strftime(stay_date, '%b') = '${month}' 
          GROUP BY 1, 2 
          ORDER BY 1
        `;
        const result = await execute(query);
        // Map any DuckDB specific types like BIGINT if needed, but CAST as INTEGER should be fine
        setChartData(result.map((row: any) => ({
          day: row.day,
          isWeekend: row.isWeekend,
          transient: Number(row.transient),
          group: Number(row.group),
          capacity: Number(row.capacity)
        })));
      } catch (e) {
        console.error("Failed to load OTB chart data", e);
      }
    }
    fetchData();
  }, [execute, isInitializing, error, year, month]);

  // Use your provided OKLCH variables
  return (
    <Card className="card shadow-primary p-8 bg-background border-2 border-primary overflow-hidden">
      {/* ... Header with Capacity line remains the same ... */}

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            {/* Weekend Shading */}
            {chartData?.map((d, i) => d.isWeekend && (
              <ReferenceArea key={i} x1={d.day} x2={d.day} fill="hsl(var(--muted))" fillOpacity={0.4} />
            ))}

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--primary)', fontFamily: 'var(--font-display)', fontSize: 14 }}
            />

            {/* The Integrated Tooltip */}
            <Tooltip content={<OTBMixTooltip month={month} year={year} />} cursor={{ fill: 'transparent' }} />

            <Bar dataKey="transient" stackId="a">
              {chartData?.map((entry, index) => (
                <Cell key={`cell-transient-${index}`} fill={entry.isWeekend ? 'var(--chart-5)' : 'var(--chart-4)'} />
              ))}
            </Bar>
            <Bar dataKey="group" stackId="a">
              {chartData?.map((entry, index) => (
                <Cell key={`cell-group-${index}`} fill={entry.isWeekend ? 'var(--chart-6)' : 'var(--chart-3)'} />
              ))}
            </Bar>
            <Line type="stepAfter" dataKey="capacity" stroke="var(--primary)" strokeWidth={1} strokeDasharray="3 3" dot={false} isAnimationActive={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
