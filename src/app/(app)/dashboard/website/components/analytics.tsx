"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AnalyticsChart } from './analytics-chart'
import { useEffect, useState } from "react";
import { useDuckDb } from "@/hooks/useDuckDb";
import { Skeleton } from "@/components/ui/skeleton";

export function Analytics() {
  const { execute, isInitializing } = useDuckDb();
  const [metrics, setMetrics] = useState<{
    overview: Record<string, string | number>;
    referrers: { name: string; value: number }[];
    devices: { name: string; value: number }[];
  } | null>(null);

  useEffect(() => {
    if (isInitializing) return;
    async function fetchMetrics() {
      try {
        const res = await execute(`
          SELECT
            SUM(CASE WHEN _DATA_DATE > (SELECT MAX(_DATA_DATE) - INTERVAL 7 DAY FROM 'ga4_TrafficAcquisition_281286275.parquet') THEN sessions ELSE 0 END) as cur_sessions,
            SUM(CASE WHEN _DATA_DATE <= (SELECT MAX(_DATA_DATE) - INTERVAL 7 DAY FROM 'ga4_TrafficAcquisition_281286275.parquet') AND _DATA_DATE > (SELECT MAX(_DATA_DATE) - INTERVAL 14 DAY FROM 'ga4_TrafficAcquisition_281286275.parquet') THEN sessions ELSE 0 END) as prev_sessions,
            
            SUM(CASE WHEN _DATA_DATE > (SELECT MAX(_DATA_DATE) - INTERVAL 7 DAY FROM 'ga4_TrafficAcquisition_281286275.parquet') THEN engagedSessions ELSE 0 END) as cur_engaged,
            SUM(CASE WHEN _DATA_DATE <= (SELECT MAX(_DATA_DATE) - INTERVAL 7 DAY FROM 'ga4_TrafficAcquisition_281286275.parquet') AND _DATA_DATE > (SELECT MAX(_DATA_DATE) - INTERVAL 14 DAY FROM 'ga4_TrafficAcquisition_281286275.parquet') THEN engagedSessions ELSE 0 END) as prev_engaged,

            AVG(CASE WHEN _DATA_DATE > (SELECT MAX(_DATA_DATE) - INTERVAL 7 DAY FROM 'ga4_TrafficAcquisition_281286275.parquet') THEN userEngagementDurationPerSession ELSE null END) as cur_duration,
            AVG(CASE WHEN _DATA_DATE <= (SELECT MAX(_DATA_DATE) - INTERVAL 7 DAY FROM 'ga4_TrafficAcquisition_281286275.parquet') AND _DATA_DATE > (SELECT MAX(_DATA_DATE) - INTERVAL 14 DAY FROM 'ga4_TrafficAcquisition_281286275.parquet') THEN userEngagementDurationPerSession ELSE null END) as prev_duration
          FROM 'ga4_TrafficAcquisition_281286275.parquet'
        `);

        const refs = await execute(`
          SELECT sessionDefaultChannelGroup as name, CAST(SUM(sessions) AS INTEGER) as value 
          FROM 'ga4_TrafficAcquisition_281286275.parquet' 
          WHERE _DATA_DATE > (SELECT MAX(_DATA_DATE) - INTERVAL 7 DAY FROM 'ga4_TrafficAcquisition_281286275.parquet')
          GROUP BY 1 ORDER BY 2 DESC LIMIT 4
        `);

        const devices = await execute(`
          SELECT deviceCategory as name, CAST(SUM(activeUsers) AS INTEGER) as value 
          FROM 'ga4_TechDetails_281286275.parquet' 
          WHERE _DATA_DATE > (SELECT MAX(_DATA_DATE) - INTERVAL 7 DAY FROM 'ga4_TechDetails_281286275.parquet')
          GROUP BY 1 ORDER BY 2 DESC LIMIT 4
        `);

        if (res && res.length > 0) {
          setMetrics({ 
            overview: res[0] as Record<string, string | number>,
            referrers: refs as { name: string; value: number }[],
            devices: devices as { name: string; value: number }[]
          });
        }
      } catch (err) { console.error("Failed to load GA4 metrics", err); }
    }
    fetchMetrics();
  }, [execute, isInitializing]);

  if (isInitializing || !metrics) {
    return <div className="space-y-4"><Skeleton className="h-[400px] w-full" /><Skeleton className="h-[200px] w-full" /></div>;
  }

  const { overview, referrers, devices } = metrics;
  const curSessions = Number(overview.cur_sessions) || 0;
  const prevSessions = Number(overview.prev_sessions) || 1;
  const curEngaged = Number(overview.cur_engaged) || 0;
  const prevEngaged = Number(overview.prev_engaged) || 1;
  const curDuration = Number(overview.cur_duration) || 0;
  const prevDuration = Number(overview.prev_duration) || 0;

  const sessionsPct = ((curSessions - prevSessions) / prevSessions) * 100;
  const engagedPct = ((curEngaged - prevEngaged) / prevEngaged) * 100;

  const curBounce = 1 - (curEngaged / (curSessions || 1));
  const prevBounce = 1 - (prevEngaged / (prevSessions || 1));
  const bouncePct = (curBounce - prevBounce) * 100; // in percentage points

  const durationDiff = curDuration - prevDuration;

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>Traffic Overview</CardTitle>
          <CardDescription>Weekly clicks and unique visitors</CardDescription>
        </CardHeader>
        <CardContent className='px-6'>
          <AnalyticsChart />
        </CardContent>
      </Card>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Clicks</CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M3 3v18h18' />
              <path d='M7 15l4-4 4 4 4-6' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{curSessions.toLocaleString()}</div>
            <p className='text-xs text-muted-foreground'>{sessionsPct > 0 ? '+' : ''}{sessionsPct.toFixed(1)}% vs last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Unique Visitors
            </CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <circle cx='12' cy='7' r='4' />
              <path d='M6 21v-2a6 6 0 0 1 12 0v2' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{curEngaged.toLocaleString()}</div>
            <p className='text-xs text-muted-foreground'>{engagedPct > 0 ? '+' : ''}{engagedPct.toFixed(1)}% vs last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Bounce Rate</CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M3 12h6l3 6 3-6h6' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{(curBounce * 100).toFixed(1)}%</div>
            <p className='text-xs text-muted-foreground'>{bouncePct > 0 ? '+' : ''}{bouncePct.toFixed(1)}% vs last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Avg. Session</CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <circle cx='12' cy='12' r='10' />
              <path d='M12 6v6l4 2' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{Math.floor(curDuration / 60)}m {Math.floor(curDuration % 60)}s</div>
            <p className='text-xs text-muted-foreground'>{durationDiff > 0 ? '+' : ''}{Math.floor(durationDiff)}s vs last week</p>
          </CardContent>
        </Card>
      </div>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
        <Card className='col-span-1 lg:col-span-4'>
          <CardHeader>
            <CardTitle>Referrers</CardTitle>
            <CardDescription>Top sources driving traffic</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleBarList
              items={referrers}
              barClass='bg-primary'
              valueFormatter={(n) => `${n}`}
            />
          </CardContent>
        </Card>
        <Card className='col-span-1 lg:col-span-3'>
          <CardHeader>
            <CardTitle>Devices</CardTitle>
            <CardDescription>How users access your app</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleBarList
              items={devices}
              barClass='bg-muted-foreground'
              valueFormatter={(n) => `${n}`}
            />
          </CardContent>

        </Card>
      </div>
    </div>
  )
}

function SimpleBarList({
  items,
  valueFormatter,
  barClass,
}: {
  items: { name: string; value: number }[]
  valueFormatter: (n: number) => string
  barClass: string
}) {
  const max = Math.max(...items.map((i) => i.value), 1)
  return (
    <ul className='space-y-3'>
      {items.map((i) => {
        const width = `${Math.round((i.value / max) * 100)}%`
        return (
          <li key={i.name} className='flex items-center justify-between gap-3'>
            <div className='min-w-0 flex-1'>
              <div className='mb-1 truncate text-xs text-muted-foreground'>
                {i.name}
              </div>
              <div className='h-2.5 w-full rounded-full bg-muted'>
                <div
                  className={`h-2.5 rounded-full ${barClass}`}
                  style={{ width }}
                />
              </div>
            </div>
            <div className='ps-2 text-xs font-medium tabular-nums'>
              {valueFormatter(i.value)}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
