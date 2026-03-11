"use client";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { useEffect, useState } from "react";
import { useDuckDb } from "@/hooks/useDuckDb";
import { Skeleton } from "@/components/ui/skeleton";

export function AnalyticsChart() {
  const [data, setData] = useState<{ name: string, clicks: number, uniques: number }[]>([]);
  const { execute, isInitializing } = useDuckDb();

  useEffect(() => {
    if (isInitializing) return;
    async function fetchChart() {
      try {
        const res = await execute(`SELECT strftime(_DATA_DATE, '%a') as name, CAST(SUM(sessions) AS INTEGER) as clicks, CAST(SUM(engagedSessions) AS INTEGER) as uniques FROM 'ga4_TrafficAcquisition_281286275.parquet' WHERE _DATA_DATE > (SELECT MAX(_DATA_DATE) - INTERVAL 7 DAY FROM 'ga4_TrafficAcquisition_281286275.parquet') GROUP BY _DATA_DATE ORDER BY _DATA_DATE ASC`);
        setData(res as any);
      } catch (e) { console.error("Failed to load analytics chart", e); }
    }
    fetchChart();
  }, [execute, isInitializing]);

  if (isInitializing || !data.length) {
    return <Skeleton className="w-full h-[300px] rounded-md" />;
  }

  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Area
          type='monotone'
          dataKey='clicks'
          stroke='currentColor'
          className='text-primary'
          fill='currentColor'
          fillOpacity={0.15}
        />
        <Area
          type='monotone'
          dataKey='uniques'
          stroke='currentColor'
          className='text-muted-foreground'
          fill='currentColor'
          fillOpacity={0.1}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
