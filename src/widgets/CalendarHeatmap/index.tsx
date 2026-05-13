"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Calendar, CalendarDayButton } from "@/widgets/CalendarHeatmap/components/calendar";
import { useDuckDb } from "@/hooks/useDuckDb";
import { Skeleton } from "@/components/ui/skeleton";
import { MetricCard, MetricCardTabs } from "@/widgets/_shared/MetricCard";

const DAY_SIZE = "24px";
const DAY_MARGIN = "1px";
const PLACEHOLDER_AVAILABLE_ROOMS = 100;
const DEMO_PICKUP_SCALE = 0.3;

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
type HeatmapBucket = "empty" | "low" | "mediumLow" | "mediumHigh" | "high" | "extreme";

const heatmapClassMap: Record<HeatmapBucket, string> = {
  empty: "metric-card-heatmmap-empty",
  low: "metric-card-heatmmap-low",
  mediumLow: "metric-card-heatmmap-medium-low",
  mediumHigh: "metric-card-heatmmap-medium-high",
  high: "metric-card-heatmmap-high",
  extreme: "metric-card-heatmmap-extreme",
};

const heatmapColorMap: Record<HeatmapBucket, string> = {
  empty: "var(--color-smoke-fade, var(--muted))",
  low: "var(--color-light-blue, var(--base-color-4))",
  mediumLow: "var(--color-yellow, var(--base-color-5))",
  mediumHigh: "var(--color-orange, var(--base-color-6))",
  high: "var(--color-red, var(--base-color-7))",
  extreme: "var(--color-purple, var(--base-color-8))",
};

function getHeatmapColor(bucket: HeatmapBucket) {
  return heatmapColorMap[bucket];
}

function getLookbackDays(selectedRange: PickupWindow) {
  return Number.parseInt(selectedRange.replace("d", ""), 10);
}

function getHeatmapBucket(rooms: number, availableRooms = PLACEHOLDER_AVAILABLE_ROOMS): HeatmapBucket {
  if (rooms <= 0) return "empty";

  const pickupRatio = rooms / availableRooms;

  if (pickupRatio <= 0.02) return "low";
  if (pickupRatio <= 0.05) return "mediumLow";
  if (pickupRatio <= 0.1) return "mediumHigh";
  if (pickupRatio <= 0.2) return "high";
  return "extreme";
}

function scaleDemoRooms(rooms: number) {
  return Math.max(rooms > 0 ? 1 : 0, Math.round(rooms * DEMO_PICKUP_SCALE));
}

function createMockHeatmapData(startDate: Date, months: number, lookbackDays: number): CalendarHeatmapData[] {
  const start = startOfMonth(startDate);
  const end = addMonths(start, months);
  const data: CalendarHeatmapData[] = [];

  for (let cursor = new Date(start); cursor < end; cursor.setDate(cursor.getDate() + 1)) {
    const date = new Date(cursor);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const isWeekend = [0, 6].includes(date.getDay());
    const lookbackFactor = Math.min(1.75, Math.max(0.35, lookbackDays / 30));
    const seasonalLift = monthIndex >= 4 && monthIndex <= 8 ? 1.25 : 0.85;
    const basePattern = (day * 7 + monthIndex * 11) % 28;

    let rooms = Math.round((basePattern * lookbackFactor + (isWeekend ? 5 : 1)) * seasonalLift);

    if (day === 5 || day === 19) rooms = Math.max(rooms, 2);
    if (day === 8 || day === 22) rooms = Math.max(rooms, 5);
    if (day === 12 || day === 26) rooms = Math.max(rooms, 10);
    if (day === 15) rooms = Math.max(rooms, 20);
    if (day === 28) rooms = Math.max(rooms, 24);

    rooms = scaleDemoRooms(rooms);

    const adr = 165 + ((monthIndex * 9 + day * 2) % 75);
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

function hasVisiblePickup(data: CalendarHeatmapData[]) {
  return data.some((item) => item.rooms > 0);
}

export default function CalendarHeatmap({
  startDate,
}: CalendarHeatmapProps): React.JSX.Element {
  const calendarStartDate = useMemo(() => startOfMonth(startDate ?? new Date()), [startDate]);
  const [selectedRange, setSelectedRange] = useState<PickupWindow>("7d");
  const initialDemoData = useMemo(
    () => createMockHeatmapData(calendarStartDate, 12, getLookbackDays(selectedRange)),
    [calendarStartDate, selectedRange],
  );
  const [heatmapData, setHeatmapData] = useState<CalendarHeatmapData[]>(initialDemoData);
  const [loadError, setLoadError] = useState<string | null>(null);
  const { execute, isInitializing, error } = useDuckDb();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const endDate = addMonths(calendarStartDate, 12);
    const lookbackDays = getLookbackDays(selectedRange);
    const demoData = createMockHeatmapData(calendarStartDate, 12, lookbackDays);

    if (isInitializing) {
      setHeatmapData(demoData);
      return;
    }

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
        setHeatmapData(hasVisiblePickup(transformedData) ? transformedData : demoData);
      } catch (e) {
        setLoadError(null);
        setHeatmapData(demoData);
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
    const maxCount = Math.max(...heatmapData.map((item) => item.rooms), 0);
    const totalRooms = heatmapData.reduce((sum, item) => sum + item.rooms, 0);

    return { maxCount, totalRooms };
  }, [heatmapData]);

  const bucketMap = useMemo(() => {
    return heatmapData.reduce((acc, item) => {
      acc.set(item.dateStr, getHeatmapBucket(item.rooms));
      return acc;
    }, new Map<string, HeatmapBucket>());
  }, [heatmapData]);

  const modifierDates = useMemo(() => {
    return heatmapData.reduce(
      (acc, item) => {
        const bucket = getHeatmapBucket(item.rooms);
        acc[bucket].push(item.date);
        return acc;
      },
      {
        empty: [] as Date[],
        low: [] as Date[],
        mediumLow: [] as Date[],
        mediumHigh: [] as Date[],
        high: [] as Date[],
        extreme: [] as Date[],
      },
    );
  }, [heatmapData]);

  if (loading && !heatmapData.length) {
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
            <div className="metric-card__label mb-1">Available Rooms</div>
            <div className="metric-card__number text-4xl">{PLACEHOLDER_AVAILABLE_ROOMS}</div>
          </div>
          <div>
            <div className="metric-card__label mb-1">Rooms Picked Up</div>
            <div className="metric-card__number text-4xl">{heatmapStats.totalRooms.toLocaleString()}</div>
          </div>
          <div>
            <div className="metric-card__label mb-1">Peak Pickup Day</div>
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
          modifiers={modifierDates}
          modifiersClassNames={{
            empty: heatmapClassMap.empty,
            low: heatmapClassMap.low,
            mediumLow: heatmapClassMap.mediumLow,
            mediumHigh: heatmapClassMap.mediumHigh,
            high: heatmapClassMap.high,
            extreme: heatmapClassMap.extreme,
          }}
          modifiersStyles={{
            empty: { backgroundColor: getHeatmapColor("empty") },
            low: { backgroundColor: getHeatmapColor("low") },
            mediumLow: { backgroundColor: getHeatmapColor("mediumLow") },
            mediumHigh: { backgroundColor: getHeatmapColor("mediumHigh") },
            high: { backgroundColor: getHeatmapColor("high") },
            extreme: { backgroundColor: getHeatmapColor("extreme") },
          }}
          components={{
            Weekdays: () => <></>,
            DayButton: (props: DayButtonComponentProps) => (
              <CustomDayButton
                dayProps={props}
                dataMap={dataMap}
                bucketMap={bucketMap}
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
  const legendItems: Array<{ label: string; bucket: HeatmapBucket }> = [
    { label: "1-2%", bucket: "low" },
    { label: "≤5%", bucket: "mediumLow" },
    { label: "≤10%", bucket: "mediumHigh" },
    { label: "≤20%", bucket: "high" },
    { label: "21%+", bucket: "extreme" },
  ];

  return (
    <div className="calendar-heatmap__legend">
      <span>Low</span>
      <div className="calendar-heatmap__legend-scale">
        {legendItems.map((item) => (
          <div key={item.bucket} className="calendar-heatmap__legend-item">
            <div
              className={`calendar-heatmap__legend-box ${heatmapClassMap[item.bucket]}`}
              style={{ backgroundColor: getHeatmapColor(item.bucket) }}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <span>Extreme</span>
    </div>
  );
}

interface CustomDayButtonProps {
  dayProps: DayButtonComponentProps;
  dataMap: Map<string, Omit<CalendarHeatmapData, "date" | "dateStr">>;
  bucketMap: Map<string, HeatmapBucket>;
}

function CustomDayButton({
  dayProps,
  dataMap,
  bucketMap,
}: CustomDayButtonProps): React.JSX.Element {
  const { day } = dayProps;
  const dayStr = formatLocalYYYYMMDD(day.date);
  const metrics = dataMap.get(dayStr) || { rooms: 0, revenue: 0, adr: 0 };
  const bucket = bucketMap.get(dayStr) ?? "empty";
  const bucketClassName = heatmapClassMap[bucket];
  const heatmapColor = getHeatmapColor(bucket);
  const occupancyPct = (metrics.rooms / PLACEHOLDER_AVAILABLE_ROOMS) * 100;
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
        className={`calendar-heatmap__day-button ${bucketClassName}`}
        style={{ backgroundColor: heatmapColor } as React.CSSProperties}
      />
      <div className="calendar-heatmap__tooltip-wrap">
        <div className="calendar-heatmap__tooltip retro-shadow-base">
          <div className="calendar-heatmap__tooltip-date">
            {formattedDate}
          </div>
          <div className="calendar-heatmap__tooltip-grid">
            <div className="calendar-heatmap__tooltip-number">
              {occupancyPct.toFixed(1)}%
            </div>
            <div
              className={`calendar-heatmap__tooltip-accent ${bucketClassName}`}
              style={{ backgroundColor: heatmapColor }}
            />
            <div className="calendar-heatmap__tooltip-label">Occupancy</div>

            <div className="calendar-heatmap__tooltip-number">{metrics.rooms.toLocaleString()}</div>
            <div className="calendar-heatmap__tooltip-label">Rooms</div>
          </div>
        </div>
      </div>
    </div>
  );
}
