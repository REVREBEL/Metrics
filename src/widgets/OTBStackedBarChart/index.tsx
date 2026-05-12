"use client";

import React, { useEffect, useMemo } from "react";

import {
  Bar,
  ComposedChart,
  Cell,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { MetricCard } from "@/widgets/_shared/MetricCard";
import { useDuckDb } from "@/hooks/useDuckDb";

type OTBChartDatum = {
  day: number;
  isWeekend: boolean;
  transient: number;
  group: number;
  capacity: number;
};

const MOCK_CHART_DATA: OTBChartDatum[] = Array.from({ length: 31 }, (_, index) => {
  const day = index + 1;
  const isWeekend = [0, 6].includes(new Date(2024, 6, day).getDay());
  const transient = isWeekend
    ? 34 + ((day * 7) % 18)
    : 22 + ((day * 5) % 16);
  const group = isWeekend
    ? 8 + ((day * 3) % 10)
    : 14 + ((day * 4) % 18);

  return {
    day,
    isWeekend,
    transient,
    group,
    capacity: 82,
  };
});

const getMonthName = (month?: string) => month || "Jul";
const getYearLabel = (year?: string) => year || "2024";

// Custom Tooltip Component to match the metric card system
const OTBMixTooltip = ({
  active,
  payload,
  label,
  month,
  year,
}: {
  active?: boolean;
  payload?: {
    dataKey: string;
    value: number;
    payload: { isWeekend: boolean };
  }[];
  label?: string;
  month?: string;
  year?: string;
}) => {
  if (!active || !payload || !payload.length) return null;

  const dateStr = `${getMonthName(month)} ${label}, ${getYearLabel(year)}`;
  const dateObj = new Date(dateStr);
  const weekday = dateObj.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
  const monthName = dateObj.toLocaleDateString("en-US", { month: "long" }).toUpperCase();

  const transient =
    payload.find((p: { dataKey: string; value: number }) => p.dataKey === "transient")?.value || 0;
  const group =
    payload.find((p: { dataKey: string; value: number }) => p.dataKey === "group")?.value || 0;
  const total = transient + group;
  const transientPct = total > 0 ? Math.round((transient / total) * 100) : 0;
  const groupPct = total > 0 ? Math.round((group / total) * 100) : 0;

  const isWeekend = payload[0]?.payload?.isWeekend;

  return (
    <div className="metric-card border-2 border-(--primary-b000) bg-(--card) p-6 shadow-primary min-w-75">
      <h3 className="metric-card__title mb-4 text-3xl">
        {`${weekday}, ${monthName} ${label}`}
      </h3>

      <div className="flex gap-8 mb-6">
        <div className="flex w-full flex-col gap-2">
          <span className="metric-card__label text-(--muted-foreground)">
            {isWeekend ? "Weekend" : "Weekday"}
          </span>
          <div className="mb-2 flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="h-8 w-2"
                style={{ backgroundColor: "var(--color-transient)" }}
              />
              <div className="metric-card__number text-lg">
                {String(transient).padStart(2, "0")} | {String(transientPct).padStart(2, "0")}%
              </div>
            </div>
            <span className="mr-12 text-sm text-(--muted-foreground)">Transient</span>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="h-8 w-2"
                style={{ backgroundColor: "var(--color-group)" }}
              />
              <div className="metric-card__number text-lg">
                {String(group).padStart(2, "0")} | {String(groupPct).padStart(2, "0")}%
              </div>
            </div>
            <span className="mr-12 text-sm text-(--muted-foreground)">Group</span>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-(--primary-b000) pt-2">
        <p className="metric-card__title text-2xl">OTB / % Mix Rooms By Day</p>
      </div>
    </div>
  );
};

export default function OTBChart({ year, month }: { year?: string; month?: string }) {
  const { execute, isInitializing, error } = useDuckDb();
  const [chartData, setChartData] = React.useState<OTBChartDatum[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (isInitializing || error || !year || !month) {
        setChartData(MOCK_CHART_DATA);
        return;
      }

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
        type RowType = {
          day: number;
          isWeekend: boolean;
          transient: number | string;
          group: number | string;
          capacity: number | string;
        };
        const nextData = (result as RowType[]).map((row) => ({
          day: row.day,
          isWeekend: row.isWeekend,
          transient: Number(row.transient),
          group: Number(row.group),
          capacity: Number(row.capacity),
        }));

        setChartData(nextData.length ? nextData : MOCK_CHART_DATA);
      } catch (e) {
        console.error("Failed to load OTB chart data", e);
        setChartData(MOCK_CHART_DATA);
      }
    }
    fetchData();
  }, [execute, isInitializing, error, year, month]);

  const totals = useMemo(
    () =>
      chartData.reduce(
        (acc, item) => ({
          transient: acc.transient + item.transient,
          group: acc.group + item.group,
          total: acc.total + item.transient + item.group,
        }),
        { transient: 0, group: 0, total: 0 }
      ),
    [chartData]
  );

  return (
    <MetricCard
      title="OTB Stacked Bar"
      description={`${getMonthName(month)} ${getYearLabel(year)} rooms on the books by transient and group mix.`}
      metric="total"
    >
      <div className="mb-4 grid grid-cols-3 gap-3">
        <div>
          <div className="metric-card__label mb-1">Transient</div>
          <div className="metric-card__number text-2xl">{totals.transient.toLocaleString()}</div>
        </div>
        <div>
          <div className="metric-card__label mb-1">Group</div>
          <div className="metric-card__number text-2xl">{totals.group.toLocaleString()}</div>
        </div>
        <div>
          <div className="metric-card__label mb-1">Total OTB</div>
          <div className="metric-card__number text-2xl">{totals.total.toLocaleString()}</div>
        </div>
      </div>

      <div className="h-100 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 16, right: 12, bottom: 0, left: 12 }}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "var(--primary-b000)",
                fontFamily: "var(--font-display)",
                fontSize: 14,
              }}
            />

            <Tooltip
              content={<OTBMixTooltip month={getMonthName(month)} year={getYearLabel(year)} />}
              cursor={{ fill: "transparent" }}
            />

            <Bar dataKey="transient" stackId="a" radius={[2, 2, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-transient-${index}`}
                  fill={entry.isWeekend ? "var(--color-transient-var)" : "var(--color-transient)"}
                />
              ))}
            </Bar>
            <Bar dataKey="group" stackId="a" radius={[2, 2, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-group-${index}`}
                  fill={entry.isWeekend ? "var(--color-group-var)" : "var(--color-group)"}
                />
              ))}
            </Bar>
            <Line
              type="stepAfter"
              dataKey="capacity"
              stroke="var(--primary-b000)"
              strokeWidth={1}
              strokeDasharray="3 3"
              dot={false}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </MetricCard>
  );
}
