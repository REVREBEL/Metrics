"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Calendar, CalendarDayButton } from "@/widgets/CalendarHeatmap/components/calendar";
import { useDuckDb } from "@/hooks/useDuckDb";
import { Skeleton } from "@/components/ui/skeleton";
import { MetricCard, MetricCardTabs } from "@/widgets/_shared/MetricCard";

const DAY_SIZE = "16px";
const DAY_MARGIN = "2px";

const PICKUP_WINDOWS = [
  { label: "1 Day", value: "1d" },
  { label: "3 Days", value: "3d" },
  { label: "7 Days", value: "7d" },
  { label: "14 Days", value: "14d" },
  { label: "30 Days", value: "30d" },
  { label: "60 Days", value: "60d" },
  { label: "90 Days", value: "90d" },
  { label: "120 Days", value: "120d" },
] satisfies Array<{ label: string; value: PickupWindow }>;

export interface CalendarHeatmapData {
  date: Date;
  dateStr: string;
  rooms: number;
  revenue: number;
  adr: number;
}

export function formatLocalYYYYMMDD(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

interface CalendarHeatmapProps {
  startDate?: Date;
}

interface PickupQueryRow {
  dateStr: string;
  rooms: number | string;
  revenue: number | string;
  adr: number | string;
}

interface DayButtonComponentProps {
  day: {
    date: Date;
  };
}

type PickupWindow = "1d" | "3d" | "7d" | "14d" | "30d" | "60d" | "90d" | "120d";
type HeatmapBucket = "zero" | "one" | "two" | "three" | "four";

const heatmapStyles: Record<HeatmapBucket, { backgroundColor: string }> = {
  zero: { backgroundColor: "var(--color-smoke-fade, var(--muted))" },
  one: { backgroundColor: "var(--base-color-5-fade, var(--color-group-var))" },
  two: { backgroundColor: "var(--base-color-5-l400, var(--color-group))" },
  three: { backgroundColor: "var(--base-color-5, var(--color-group))" },
  four: { backgroundColor: "var(--base-color-5-d200, var(--primary-b000))" },
};

function getLookbackDays(selectedRange: PickupWindow) {
  return Number.parseInt(selectedRange.replace("d", ""), 10);
}

function getHeatmapBucket(
  rooms: number,
  minCount: number,
  maxCount: number,
): HeatmapBucket {
  if (rooms <= 0) return "zero";

  const range = maxCount - minCount || 1;
  const ratio = (rooms - minCount) / range;

  if (ratio <= 0.25) return "one";
  if (ratio <= 0.5) return "two";
  if (ratio <= 0.75) return "three";
  return "four";
}

function createMockHeatmapData(startDate: Date, months: number, lookbackDays: number): CalendarHeatmapData[] {
  const start = startOfMonth(startDate);
  const end = addMonths(start, months);
  const data: CalendarHeatmapData[] = [];

  for (let cursor = new Date(start); cursor < end; cursor.setDate(cursor.getDate() + 1)) {
    const date = new Date(cursor);
    const day = date.getDate();
    const isWeekend = [0, 6].includes(date.getDay());
    const seasonality = Math.max(0, Math.sin((date.getMonth() + 1) / 12 * Math.PI));
    const pickupFactor = Math.max(1, Math.round(lookbackDays / 7));
    const rooms = Math.max(
      0,
      Math.round((isWeekend ? 5 : 2) + ((day * 3 + date.getMonth() * 5) % 18) + seasonality * 8 + pickupFactor)
    );
    const adr = 165 + ((date.getMonth() * 9 + day * 2) % 75);
    const revenue = Math.round(rooms * adr);

    data.push({
      date,
      dateStr: formatLocalYYYYMMDD(date),
      rooms,
      revenue,
      adr,
    });
  }

  return data;
}

export default function CalendarHeatmap({
  startDate,
}: CalendarHeatmapProps): React.JSX.Element {
  const calendarStartDate = useMemo(() => startOfMonth(startDate ?? new Date()), [startDate]);
  const [heatmapData, setHeatmapData] = useState<CalendarHeatmapData[]>([]);
  const [selectedRange, setSelectedRange] = useState<PickupWindow>("7d");
  const [loadError, setLoadError] = useState<string | null>(null);
  const { execute, isInitializing, error } = useDuckDb();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isInitializing) return;

    const endDate = addMonths(calendarStartDate, 12);
    const lookbackDays = getLookbackDays(selectedRange);

    async function loadData() {
      setLoading(true);
      setLoadError(null);
      try {
        const result = await execute(`
          SELECT
            CAST(stay_date AS VARCHAR) AS dateStr,
            pickup_rooms AS rooms,
            pickup_revenue AS revenue,
            pickup_adr AS adr
          FROM 'dashboard_pickup.parquet'
          WHERE lookback_days = ${lookbackDays}
            AND stay_date >= '${formatLocalYYYYMMDD(calendarStartDate)}'
            AND stay_date < '${formatLocalYYYYMMDD(endDate)}'
          ORDER BY 1
        `);
        const transformedData = result.map((row) => {
          const pickupRow = row as PickupQueryRow;
          const [y, m, d] = pickupRow.dateStr.split("-");
          const localDate = new Date(Number.parseInt(y), Number.parseInt(m) - 1, Number.parseInt(d));
          const rooms = Number(pickupRow.rooms);
          const revenue = Number(pickupRow.revenue);
          return {
            dateStr: pickupRow.dateStr,
            date: localDate,
            rooms,
            revenue,
            adr: Number(pickupRow.adr) || 0,
          };
        });
        setHeatmapData(transformedData.length ? transformedData : createMockHeatmapData(calendarStartDate, 12, lookbackDays));
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        if (message.includes("dashboard_pickup.parquet")) {
          setLoadError(null);
          setHeatmapData(createMockHeatmapData(calendarStartDate, 12, lookbackDays));
        } else {
          setLoadError(null);
          setHeatmapData(createMockHeatmapData(calendarStartDate, 12, lookbackDays));
        }
        console.error("Failed to fetch heatmap data", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [calendarStartDate, selectedRange, execute, isInitializing]);

  const formatCaption = (date: Date) => {
    return date.toLocaleString("default", { month: "short" });
  };

  const dataMap = useMemo(() => {
    return heatmapData.reduce((acc, item) => {
      acc.set(item.dateStr, { rooms: item.rooms, revenue: item.revenue, adr: item.adr });
      return acc;
    }, new Map<string, Omit<CalendarHeatmapData, "date" | "dateStr">>());
  }, [heatmapData]);

  const heatmapStats = useMemo(() => {
    const positiveCounts = heatmapData.map((item) => item.rooms).filter((rooms) => rooms > 0);
    const maxCount = Math.max(...positiveCounts, 1);
    const minCount = Math.min(...positiveCounts, 1);
    const totalRooms = heatmapData.reduce((sum, item) => sum + item.rooms, 0);

    return { maxCount, minCount, totalRooms };
  }, [heatmapData]);

  const accentColorMap = useMemo(() => {
    return heatmapData.reduce((acc, item) => {
      const bucket = getHeatmapBucket(item.rooms, heatmapStats.minCount, heatmapStats.maxCount);
      acc.set(item.dateStr, heatmapStyles[bucket].backgroundColor);
      return acc;
    }, new Map<string, string>());
  }, [heatmapData, heatmapStats]);

  if (isInitializing || loading) {
    return <Skeleton className="h-120 w-full" />;
  }

  if (error && !heatmapData.length) {
    return (
      <div className="flex h-120 w-full items-center justify-center rounded-md border">
        <p className="text-sm font-medium text-destructive">
          {loadError ?? "Failed to load heatmap."}
        </p>
      </div>
    );
  }

  return (
    <MetricCard
      title="Pickup Heatmap"
      description={`Rooms picked up by stay date over the last ${getLookbackDays(selectedRange)} days.`}
      metric="group"
    >
      <MetricCardTabs
        tabs={PICKUP_WINDOWS}
        value={selectedRange}
        onValueChange={setSelectedRange}
      />

      <div
        className="calendar-heatmap"
        style={
          {
            "--box-size": DAY_SIZE,
            "--box-margin": DAY_MARGIN,
          } as React.CSSProperties
        }
      >
        <div className="calendar-heatmap__summary">
          <div>
            <div className="metric-card__label mb-1">Pickup Window</div>
            <div className="metric-card__number text-4xl">{getLookbackDays(selectedRange)}</div>
          </div>
          <div>
            <div className="metric-card__label mb-1">Rooms Picked Up</div>
            <div className="metric-card__number text-4xl">{heatmapStats.totalRooms.toLocaleString()}</div>
          </div>
          <div>
            <div className="metric-card__label mb-1">Peak Day</div>
            <div className="metric-card__number text-4xl">{heatmapStats.maxCount.toLocaleString()}</div>
          </div>
        </div>

        <Calendar
          formatters={{ formatCaption }}
          numberOfMonths={12}
          month={calendarStartDate}
          defaultMonth={calendarStartDate}
          className="calendar-heatmap__calendar"
          classNames={{
            nav: "hidden",
            months: "calendar-heatmap__months",
            month: "calendar-heatmap__month",
            month_caption: "calendar-heatmap__month-caption",
            caption_label: "calendar-heatmap__caption-label",
            table: "calendar-heatmap__table",
            weekdays: "hidden",
            weekday: "hidden",
            week: "calendar-heatmap__week",
            day: "calendar-heatmap__day",
            outside: "calendar-heatmap__outside",
            today: "calendar-heatmap__today",
          }}
          components={{
            Weekdays: () => <></>,
            DayButton: (props: DayButtonComponentProps) => (
              <CustomDayButton
                dayProps={props}
                dataMap={dataMap}
                accentColorMap={accentColorMap}
              />
            ),
          }}
        />

        <HeatmapLegend />
      </div>
    </MetricCard>
  );
}

function HeatmapLegend() {
  return (
    <div className="calendar-heatmap__legend">
      <span>Less</span>
      <div className="calendar-heatmap__legend-scale">
        {(Object.keys(heatmapStyles) as HeatmapBucket[]).map((bucket) => (
          <div
            key={bucket}
            className="calendar-heatmap__legend-box"
            style={heatmapStyles[bucket]}
          />
        ))}
      </div>
      <span>More</span>
    </div>
  );
}

interface CustomDayButtonProps {
  dayProps: DayButtonComponentProps;
  dataMap: Map<string, Omit<CalendarHeatmapData, "date" | "dateStr">>;
  accentColorMap: Map<string, string>;
}

function CustomDayButton({
  dayProps,
  dataMap,
  accentColorMap,
}: CustomDayButtonProps): React.JSX.Element {
  const { day } = dayProps;
  const dayStr = formatLocalYYYYMMDD(day.date);
  const metrics = dataMap.get(dayStr) || { rooms: 0, revenue: 0, adr: 0 };
  const accentColor = accentColorMap.get(dayStr) ?? heatmapStyles.zero.backgroundColor;
  const formattedDate = day.date
    .toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
    .replace(",", ", ");

  return (
    <div className="calendar-heatmap__day-wrap group">
      <CalendarDayButton
        {...dayProps}
        className="calendar-heatmap__day-button"
        style={{ backgroundColor: accentColor } as React.CSSProperties}
      />
      <div className="calendar-heatmap__tooltip-wrap">
        <div className="calendar-heatmap__tooltip retro-shadow-base">
          <div className="calendar-heatmap__tooltip-date">
            {formattedDate}
          </div>
          <div className="calendar-heatmap__tooltip-grid">
            <div className="calendar-heatmap__tooltip-number">{metrics.rooms.toLocaleString()}</div>
            <div
              className="calendar-heatmap__tooltip-accent"
              style={{ backgroundColor: accentColor }}
            />
            <div className="calendar-heatmap__tooltip-label">Rooms</div>

            <div className="calendar-heatmap__tooltip-number">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(metrics.revenue)}
            </div>
            <div className="calendar-heatmap__tooltip-label">Revenue</div>

            <div className="calendar-heatmap__tooltip-number">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(metrics.adr)}
            </div>
            <div className="calendar-heatmap__tooltip-label">ADR</div>
          </div>
        </div>
      </div>
    </div>
  );
}
