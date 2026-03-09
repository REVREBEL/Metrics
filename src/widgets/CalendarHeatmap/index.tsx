import React, { useEffect, useMemo, useState } from "react";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { useDuckDb } from "@/hooks/useDuckDb";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const DAY_SIZE = "16px";
const DAY_MARGIN = "2px";

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

interface CalendarHeatmapProps {
    startDate: Date;
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

type HeatmapBucket = "zero" | "one" | "two" | "three" | "four";

const heatmapStyles: Record<HeatmapBucket, { backgroundColor: string }> = {
  zero: { backgroundColor: "var(--muted)" },
  one: { backgroundColor: "var(--chart-4)" },
  two: { backgroundColor: "var(--chart-5)" },
  three: { backgroundColor: "var(--chart-6)" },
  four: { backgroundColor: "var(--chart-7)" },
};

function getHeatmapBucket(
    rooms: number,
    minCount: number,
    maxCount: number,
): HeatmapBucket {
    if (rooms === 0) {
        return "zero";
    }

    const range = maxCount - minCount || 1;
    const ratio = (rooms - minCount) / range;

    if (ratio <= 0.25) return "one";
    if (ratio <= 0.5) return "two";
    if (ratio <= 0.75) return "three";
    return "four";
}

export default function CalendarHeatmap({
    startDate,
}: CalendarHeatmapProps): React.JSX.Element {
    const [heatmapData, setHeatmapData] = useState<CalendarHeatmapData[]>([]);
    const [selectedRange, setSelectedRange] = useState("3d");
    const [loadError, setLoadError] = useState<string | null>(null);
    const { execute, isInitializing, error } = useDuckDb();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isInitializing || !startDate) return;

        const endDate = new Date(startDate);
        endDate.setFullYear(startDate.getFullYear() + 1);
        const lookbackDays = Number.parseInt(selectedRange.replace("d", ""), 10);

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
                    AND stay_date >= '${formatLocalYYYYMMDD(startDate)}'
                    AND stay_date < '${formatLocalYYYYMMDD(endDate)}'
                  ORDER BY 1
                `);
                const transformedData = result.map((row) => {
                  const pickupRow = row as PickupQueryRow;
                  const [y, m, d] = pickupRow.dateStr.split("-");
                  const localDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
                  const rooms = Number(pickupRow.rooms);
                  const revenue = Number(pickupRow.revenue);
                  return {
                    dateStr: pickupRow.dateStr,
                    date: localDate,
                    rooms: rooms,
                    revenue: revenue,
                    adr: Number(pickupRow.adr) || 0,
                  };
                });
                setHeatmapData(transformedData);
            } catch (e) {
                const message = e instanceof Error ? e.message : String(e);
                if (message.includes('dashboard_pickup.parquet')) {
                    setLoadError("Pickup data is missing. Run the property pace sync again to regenerate dashboard pickup data.");
                } else {
                    setLoadError("Failed to load heatmap.");
                }
                console.error("Failed to fetch heatmap data", e);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [startDate, selectedRange, execute, isInitializing]);

    const formatCaption = (date: Date) => {
        return date.toLocaleString("default", { month: "short" });
    };
    const heatmapModify = (dataToModify: CalendarHeatmapData[]) => {
        const zero: Date[] = [];
        const one: Date[] = [];
        const two: Date[] = [];
        const three: Date[] = [];
        const four: Date[] = [];
        const counts = dataToModify.map((d) => d.rooms);
        const maxCount = Math.max(...counts, 1);
        const minCount = Math.min(...counts, 0);
        const range = maxCount - minCount || 1;

        for (const item of dataToModify) {
            if (item.rooms === 0) {
              zero.push(item.date);
            } else {
              const ratio = (item.rooms - minCount) / range;
              if (ratio <= 0.25) {
                one.push(item.date);
              } else if (ratio <= 0.5) {
                two.push(item.date);
              } else if (ratio <= 0.75) {
                three.push(item.date);
              } else {
                four.push(item.date);
              }
            }
        }
        return {
            zero: zero,
            one: one,
            two: two,
            three: three,
            four: four,
        };
    };
    const HeatmapLegend = () => {
        return (
          <div className="flex content-center space-x-4 text-sm text-gray-600">
            <span>less</span>
            <div className="flex items-center space-x-6">
              <div
                className="h-[var(--box-size)] w-[var(--box-size)] rounded-sm"
                style={heatmapStyles.zero}></div>
              <div
                className="h-[var(--box-size)] w-[var(--box-size)] rounded-sm"
                style={heatmapStyles.one}></div>
              <div
                className="h-[var(--box-size)] w-[var(--box-size)] rounded-sm"
                style={heatmapStyles.two}></div>
              <div
                className="h-[var(--box-size)] w-[var(--box-size)] rounded-sm"
                style={heatmapStyles.three}></div>
              <div
                className="h-[var(--box-size)] w-[var(--box-size)] rounded-sm"
                style={heatmapStyles.four}></div>
            </div>
            <span>more</span>
          </div>
        );
    };

    const dataMap = useMemo(() => {
        return heatmapData.reduce((acc, item) => {
          acc.set(item.dateStr, { rooms: item.rooms, revenue: item.revenue, adr: item.adr });
          return acc;
        }, new Map<string, Omit<CalendarHeatmapData, "date" | "dateStr">>());
    }, [heatmapData]);

    const accentColorMap = useMemo(() => {
        const counts = heatmapData.map((item) => item.rooms);
        const maxCount = Math.max(...counts, 1);
        const minCount = Math.min(...counts, 0);

        return heatmapData.reduce((acc, item) => {
            const bucket = getHeatmapBucket(item.rooms, minCount, maxCount);
            acc.set(item.dateStr, heatmapStyles[bucket].backgroundColor);
            return acc;
        }, new Map<string, string>());
    }, [heatmapData]);

    if (isInitializing || loading) {
        return <Skeleton className="h-[238px] w-full" />;
    }

    if (error || loadError) {
        return (
            <div className="flex h-[238px] w-full items-center justify-center rounded-md border">
                <p className="text-sm font-medium text-destructive">
                    {loadError ?? "Failed to load heatmap."}
                </p>
            </div>
        );
    }

    return (
      <div
        className="flex w-fit flex-col rounded-md border"
        style={
          {
            "--box-size": DAY_SIZE,
            "--box-margin": DAY_MARGIN,
            borderColor: "color-mix(in oklab, var(--primary) 50%, transparent)",
          } as React.CSSProperties
        }>
        <div className="flex flex-row !shadow-none">
          <div className="flex w-32 flex-shrink-0 items-center justify-center border-r p-7 pt-0">
            <ToggleGroup
              type="single"
              value={selectedRange}
              onValueChange={(value) => {
                if (value) setSelectedRange(value);
              }}
              className="flex h-auto w-auto flex-col gap-4 py-4"
            >
                <ToggleGroupItem
                  value="1d"
                  className="py-4 font-display font-bold uppercase data-[state=on]:!bg-[var(--color-4-inverse)] data-[state=on]:!text-white shadow-none">
                  Last 01 day
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="3d"
                  className="py-4 font-display font-bold uppercase data-[state=on]:!bg-[var(--color-4-inverse)] data-[state=on]:!text-white shadow-none">
                  Last 03 days
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="7d"
                  className="py-4 font-display font-bold uppercase data-[state=on]:!bg-[var(--color-4-inverse)] data-[state=on]:!text-white shadow-none">
                  Last 07 days
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="14d"
                  className="py-4 font-display font-bold uppercase data-[state=on]:!bg-[var(--color-4-inverse)] data-[state=on]:!text-white shadow-none">
                  Last 14 days
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="30d"
                  className="py-4 font-display font-bold uppercase data-[state=on]:!bg-[var(--color-4-inverse)] data-[state=on]:!text-white shadow-none">
                  Last 30 days
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="60d"
                  className="py-4 font-display font-bold uppercase data-[state=on]:!bg-[var(--color-4-inverse)] data-[state=on]:!text-white shadow-none">
                  Last 60 days
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="90d"
                  className="py-4 font-display font-bold uppercase data-[state=on]:!bg-[var(--color-4-inverse)] data-[state=on]:!text-white shadow-none">
                  Last 90 days
                </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex-1 overflow-y-auto px-6 pb-8 pt-4">
            <div className="mt-8 mb-4 flex items-center justify-center">
              <h3 className="text-base font-display font-bold uppercase">Activity Heatmap</h3>
            </div>
            <Calendar
              formatters={{ formatCaption }}
              numberOfMonths={12}
              defaultMonth={startDate}
              className="items-start justify-center"
              classNames={{
                nav: "hidden",
                months: "grid grid-cols-2 gap-x-4 gap-y-1 p-4",
                month: "flex flex-col gap-0",
                month_caption: "relative flex items-center justify-center pt-4 text-sm font-display font-bold",
                caption: "relative flex items-center justify-center py-2",
                caption_label: "text-sm font-bold uppercase font-display",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-muted-foreground rounded-md w-[var(--box-size)] m-[var(--box-margin)] font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                day: "m-[var(--box-margin)] h-[var(--box-size)] w-[var(--box-size)] rounded-sm border bg-gray-100 text-xs text-transparent",
                day_outside: "border-transparent bg-transparent text-transparent",
                day_today: "border-black text-transparent",
              }}
              modifiers={heatmapModify(heatmapData)}
              modifiersStyles={heatmapStyles}
              modifiersClassNames={{
                zero: "border-transparent !text-transparent",
                one: "border-transparent !text-transparent",
                two: "border-transparent !text-transparent",
                three: "border-transparent !text-transparent",
                four: "border-transparent !text-transparent",
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
            <div className="mt-6 flex w-full justify-center pb-8">
              <HeatmapLegend />
            </div>
          </div>
        </div>
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
  const accentColor = accentColorMap.get(dayStr) ?? "var(--muted)";
  const formattedDate = day.date
    .toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
    .replace(",", ", ");

  return (
    <div className="group relative inline-flex">
      <CalendarDayButton {...dayProps} />
      <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 hidden -translate-x-1/2 group-hover:block group-focus-within:block">
        <div className="rounded-md border border-[color-mix(in_srgb,var(--primary)_35%,transparent)] bg-white px-8 py-6 text-center shadow-lg">
          <div className="mb-4 text-center font-display text-2xl font-bold uppercase tracking-tight text-[var(--color-4-inverse)]">
            {formattedDate}
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_4px_minmax(0,1fr)] items-center gap-x-6 gap-y-2 text-[1.05rem] text-[var(--color-4-inverse)]">
            <div className="text-right">{metrics.rooms.toLocaleString()}</div>
            <div
              className="row-span-3 h-full min-h-22 rounded-sm"
              style={{ backgroundColor: accentColor }}
            />
            <div className="text-left font-medium">Rooms</div>

            <div className="text-right">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(metrics.revenue)}
            </div>
            <div className="text-left font-medium">Revenue</div>

            <div className="text-right">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(metrics.adr)}
            </div>
            <div className="text-left font-medium">ADR</div>
          </div>
        </div>
      </div>
    </div>
  );
}
