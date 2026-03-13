"use client";

import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import ArrowCircleDown from "@/assets/rebel-icons/ArrowCircleDown";
import ArrowCircleUp from "@/assets/rebel-icons/ArrowCircleUp";
import { useDuckDb } from "@/hooks/useDuckDb";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  type PieSectorDataItem,
  type TooltipContentProps,
} from "recharts";

const METRIC_NAME = "BUDGET";

type ValueFormat = "currency" | "percent" | "number";

type SummaryMetric = {
  label: string;
  value: number;
  format: ValueFormat;
  variance: number;
};


type TooltipMetricRowProps = {
  label: string;
  booked: string;
  remaining: string;
};

type TooltipRow = {
  label: string;
  booked: string;
  remaining: string;
};

type DonutRing = {
  key: string;
  label: string;
  booked: number;
  remaining: number;
  bookedColor: string;
  remainingColor: string;
  innerRadius: number;
  outerRadius: number;
  tooltipTitle: string;
  tooltipRows: TooltipRow[];
};

type DailyBarDatum = {
  day: string;
  dateLabel: string;
  otbRooms: number;
  leftToBookRooms: number;
  otbAdr: number;
  leftToBookAdr: number;
  otbRevenue: number;
  leftToBookRevenue: number;
};

type CurrentMonthlyRow = {
  rooms_otb: number | string;
  revenue_otb: number | string;
  available_rooms: number | string;
  rooms_budget: number | string;
  revenue_budget: number | string;
  rooms_left_to_book: number | string;
  revenue_left_to_book: number | string;
  adr_otb: number | string;
  adr_budget: number | string;
  revpar_otb: number | string;
  revpar_budget: number | string;
  occ_otb: number | string;
  occ_budget: number | string;
};

type SegmentMonthlyRow = {
  segmentGroup: string;
  rooms_otb: number | string;
  revenue_otb: number | string;
  rooms_left_to_book: number | string;
  adr_otb: number | string;
};

type DailyCurrentRow = {
  stay_date: string;
  otbRooms: number | string;
  leftToBookRooms: number | string;
  otbRevenue: number | string;
  leftToBookRevenue: number | string;
  otbAdr: number | string;
};

type CardState = {
  summaryMetrics: SummaryMetric[];
  heroMetric: {
    label: string;
    value: number;
    variance: number;
  };
  donutRings: DonutRing[];
  barData: DailyBarDatum[];
};

const DONUT_TOOLTIP_WIDTH = 320;
const DONUT_TOOLTIP_HEIGHT = 150;
const DONUT_TOOLTIP_OFFSET = 16;

const fallbackState: CardState = {
  summaryMetrics: [
    { label: "Occupancy", value: 67.2, format: "percent", variance: -3 },
    { label: "Rooms", value: 3340, format: "number", variance: 1645 },
    { label: "ADR", value: 323.19, format: "currency", variance: -32.99 },
    { label: "REVPAR", value: 156.16, format: "currency", variance: 6.34 },
  ],
  heroMetric: {
    label: METRIC_NAME,
    value: 670_146,
    variance: 262_125,
  },
  donutRings: [
    {
      key: "total",
      label: "Total",
      booked: 408_021,
      remaining: 262_125,
      bookedColor: "var(--color-total-var)",
      remainingColor: "color-mix(in oklch, var(--color-total) 20%, transparent)",
      innerRadius: 94,
      outerRadius: 118,
      tooltipTitle: METRIC_NAME,
      tooltipRows: [
        { label: "Rooms", booked: "3,340", remaining: "1,645" },
        { label: "Revenue", booked: "$408k", remaining: "$262k" },
        { label: "ADR", booked: "$323", remaining: "$33" },
      ],
    },
    {
      key: "transient",
      label: "Transient",
      booked: 280_000,
      remaining: 140_000,
      bookedColor: "var(--color-transient-var)",
      remainingColor: "color-mix(in oklch, var(--color-transient) 20%, transparent)",
      innerRadius: 68,
      outerRadius: 90,
      tooltipTitle: "TRANSIENT",
      tooltipRows: [
        { label: "Rooms", booked: "2,200", remaining: "800" },
        { label: "Revenue", booked: "$280k", remaining: "$140k" },
        { label: "ADR", booked: "$127", remaining: "$64" },
      ],
    },
    {
      key: "group",
      label: "Group",
      booked: 128_021,
      remaining: 122_125,
      bookedColor: "var(--color-group-var)",
      remainingColor: "color-mix(in oklch, var(--color-group) 20%, transparent)",
      innerRadius: 46,
      outerRadius: 64,
      tooltipTitle: "GROUP",
      tooltipRows: [
        { label: "Rooms", booked: "1,140", remaining: "845" },
        { label: "Revenue", booked: "$128k", remaining: "$122k" },
        { label: "ADR", booked: "$112", remaining: "$54" },
      ],
    },
  ],
  barData: Array.from({ length: 31 }, (_, index) => ({
    day: String(index + 1),
    dateLabel: format(new Date(2026, 0, index + 1), "EEEE, MMM d"),
    otbRooms: 0,
    leftToBookRooms: 0,
    otbAdr: 0,
    leftToBookAdr: 0,
    otbRevenue: 0,
    leftToBookRevenue: 0,
  })),
};


function TooltipMetricRow({
  label,
  booked,
  remaining,
}: TooltipMetricRowProps) {
  return (
    <div className="grid grid-cols-[3fr_1fr_3fr_1fr_3fr] items-center gap-x-3">
      <span className="text-left items-end font-display font-bold uppercase text-foreground">{label}</span>
      <span className="text-left items-end font-serif text-sm text-muted-foreground"> OTB</span>
      <span className="text-left items-end font-serif text-muted-foreground">{booked} </span>
      <span className="text-left items-end font-serif text-sm text-muted-foreground"> Reach</span>
      <span className="text-left items-end font-serif text-foreground">{remaining}</span>
    </div>
  );
}


function toNumber(value: number | string | null | undefined) {
  if (value == null) return 0;
  const next = Number(value);
  return Number.isFinite(next) ? next : 0;
}

function formatValue(value: number, format: ValueFormat) {
  if (format === "currency") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  }

  if (format === "percent") {
    return `${value.toFixed(1)}%`;
  }

  return value.toLocaleString();
}

function formatCompactCurrency(value: number) {
  const compactValue = Math.round(value / 1000);
  return `$${compactValue.toLocaleString()}k`;
}

function buildTooltipRow(label: string, booked: string, remaining: string): TooltipRow {
  return { label, booked, remaining };
}

function Variance({ value, format }: { value: number; format: ValueFormat }) {
  const positive = value >= 0;
  const Icon = positive ? ArrowCircleUp : ArrowCircleDown;
  const tone = positive ? "var(--color-positive)" : "var(--color-negative)";

  return (
    <div className="mt-2 flex items-center text-sm font-serif" style={{ color: tone }}>
      <Icon className="mr-1 size-6 fill-current" />
      {formatValue(Math.abs(value), format)} var
    </div>
  );
}

function HeroMetricVariance({ value, format }: { value: number; format: ValueFormat }) {
  const positive = value >= 0;
  const Icon = positive ? ArrowCircleUp : ArrowCircleDown;
  const tone = positive ? "var(--color-positive)" : "var(--color-negative)";

  return (
    <div className="mt-2 flex items-center text-lg font-serif" style={{ color: tone }}>
      <Icon className="mr-1 size-8 fill-current" />
      {formatValue(Math.abs(value), format)} var
    </div>
  );
}

function DonutTooltipCard({
  ring,
  shouldAnimateIn,
}: {
  ring: DonutRing;
  shouldAnimateIn: boolean;
}) {
  return (
    <div
      className={`relative z-[60] min-w-100 rounded-lg border border-border bg-card px-4 py-3 shadow-xl transition-all duration-200 ease-out ${shouldAnimateIn
        ? "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95"
        : ""
        }`}
    >
      <p className="text-left font-display text-md font-bold uppercase text-primary">
        {ring.tooltipTitle}
      </p>

      <div className="my-3 h-[2px] bg-primary" />

      <div className="flex flex-col gap-2">
        {ring.tooltipRows.map((row) => (
          <TooltipMetricRow key={row.label} {...row} />
        ))}
      </div>
    </div>
  );
}

function BarTooltip({ active, payload }: TooltipContentProps<any, any>) {
  // function BarTooltip({ active, payload }: TooltipContentProps<number, string>) {
  const wasActiveRef = useRef(false);
  const [shouldAnimateIn, setShouldAnimateIn] = useState(false);

  useEffect(() => {
    if (active && !wasActiveRef.current) {
      setShouldAnimateIn(true);

      const timeoutId = window.setTimeout(() => {
        setShouldAnimateIn(false);
      }, 200);

      wasActiveRef.current = true;

      return () => window.clearTimeout(timeoutId);
    }

    if (!active) {
      wasActiveRef.current = false;
      setShouldAnimateIn(false);
    }
  }, [active]);

  if (!active || !payload?.length) {
    return null;
  }

  const datum = payload[0]?.payload as DailyBarDatum | undefined;
  if (!datum) {
    return null;
  }

  return (
    <div
      className={`relative z-[60] min-w-100 rounded-lg border border-border bg-card px-4 py-3 shadow-xl transition-all duration-200 ease-out ${shouldAnimateIn
        ? "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95"
        : ""
        }`}
    >
      <p className="text-left font-display text-md font-bold uppercase text-primary">
        {datum.dateLabel}
      </p>

      <div className="my-3 h-[2px] bg-primary" />

      <div className="flex flex-col gap-2">
        <TooltipMetricRow
          label="Rooms"
          booked={datum.otbRooms.toLocaleString()}
          remaining={datum.leftToBookRooms.toLocaleString()}
        />
        <TooltipMetricRow
          label="ADR"
          booked={formatValue(datum.otbAdr, "currency")}
          remaining={formatValue(datum.leftToBookAdr, "currency")}
        />
        <TooltipMetricRow
          label="Revenue"
          booked={formatCompactCurrency(datum.otbRevenue)}
          remaining={formatCompactCurrency(datum.leftToBookRevenue)}
        />
      </div>
    </div>
  );
}

function buildCardState(currentRow: CurrentMonthlyRow | undefined, segmentRows: SegmentMonthlyRow[], dailyRows: DailyCurrentRow[]): CardState {
  if (!currentRow) {
    return fallbackState;
  }

  const roomsOtb = toNumber(currentRow.rooms_otb);
  const roomsBudget = toNumber(currentRow.rooms_budget);
  const roomsLeftToBook = Math.max(toNumber(currentRow.rooms_left_to_book), 0);
  const revenueOtb = toNumber(currentRow.revenue_otb);
  const revenueBudget = toNumber(currentRow.revenue_budget);
  const revenueLeftToBook = Math.max(toNumber(currentRow.revenue_left_to_book), 0);
  const availableRooms = toNumber(currentRow.available_rooms);
  const occOtb = toNumber(currentRow.occ_otb);
  const occBudget = toNumber(currentRow.occ_budget);
  const adrOtb = toNumber(currentRow.adr_otb);
  const adrBudget = toNumber(currentRow.adr_budget);
  const revparOtb = toNumber(currentRow.revpar_otb);
  const revparBudget = toNumber(currentRow.revpar_budget);

  const segmentMap = new Map(segmentRows.map((row) => [row.segmentGroup, row]));

  const buildSegmentRing = (
    key: "transient" | "group",
    title: string,
    bookedColor: string,
    remainingColor: string,
    innerRadius: number,
    outerRadius: number,
  ): DonutRing => {
    const segmentRow = segmentMap.get(title === "TRANSIENT" ? "Transient" : "Group");
    const segmentRoomsOtb = toNumber(segmentRow?.rooms_otb);
    const segmentRoomsLeft = Math.max(toNumber(segmentRow?.rooms_left_to_book), 0);
    const segmentAdrOtb = toNumber(segmentRow?.adr_otb);
    const segmentRevenueOtb = toNumber(segmentRow?.revenue_otb);
    const segmentRevenueLeft = segmentRoomsLeft * segmentAdrOtb;

    return {
      key,
      label: title,
      booked: segmentRevenueOtb,
      remaining: segmentRevenueLeft,
      bookedColor,
      remainingColor,
      innerRadius,
      outerRadius,
      tooltipTitle: title,
      tooltipRows: [
        buildTooltipRow("Rooms", segmentRoomsOtb.toLocaleString(), segmentRoomsLeft.toLocaleString()),
        buildTooltipRow("Revenue", formatCompactCurrency(segmentRevenueOtb), formatCompactCurrency(segmentRevenueLeft)),
        buildTooltipRow("ADR", formatValue(segmentAdrOtb, "currency"), formatValue(segmentRoomsLeft > 0 ? segmentAdrOtb : 0, "currency")),
      ],
    };
  };

  const barData = dailyRows.map((row) => {
    const otbRooms = toNumber(row.otbRooms);
    const leftToBookRooms = Math.max(toNumber(row.leftToBookRooms), 0);
    const otbRevenue = toNumber(row.otbRevenue);
    const leftToBookRevenue = Math.max(toNumber(row.leftToBookRevenue), 0);
    const otbAdr = toNumber(row.otbAdr);
    const leftToBookAdr = leftToBookRooms > 0 ? leftToBookRevenue / leftToBookRooms : 0;
    const date = new Date(row.stay_date);

    return {
      day: format(date, "d"),
      dateLabel: format(date, "EEEE, MMM d"),
      otbRooms,
      leftToBookRooms,
      otbAdr,
      leftToBookAdr,
      otbRevenue,
      leftToBookRevenue,
    };
  });

  return {
    summaryMetrics: [
      { label: "Occupancy", value: occOtb * 100, format: "percent", variance: (occBudget - occOtb) * 100 },
      { label: "Rooms", value: roomsOtb, format: "number", variance: roomsLeftToBook },
      { label: "ADR", value: adrOtb, format: "currency", variance: adrBudget - adrOtb },
      { label: "REVPAR", value: revparOtb, format: "currency", variance: revparBudget - revparOtb },
    ],
    heroMetric: {
      label: METRIC_NAME,
      value: revenueBudget,
      variance: revenueLeftToBook,
    },

    donutRings: [
      {
        key: "total",
        label: "Total",
        booked: revenueOtb,
        remaining: revenueLeftToBook,
        bookedColor: "var(--color-total-var)",
        remainingColor: "color-mix(in oklch, var(--color-total) 20%, transparent)",
        innerRadius: 94,
        outerRadius: 118,
        tooltipTitle: METRIC_NAME,
        tooltipRows: [
          buildTooltipRow("Rooms", roomsOtb.toLocaleString(), roomsLeftToBook.toLocaleString()),
          buildTooltipRow("Revenue", formatCompactCurrency(revenueOtb), formatCompactCurrency(revenueLeftToBook)),
          buildTooltipRow("ADR", formatValue(adrOtb, "currency"), formatValue(Math.max(adrBudget - adrOtb, 0), "currency")),
        ],
      },
      buildSegmentRing("transient", "TRANSIENT", "var(--color-transient)", "color-mix(in oklch, var(--color-transient-var) 20%, transparent)", 68, 90),
      buildSegmentRing("group", "GROUP", "var(--color-group)", "color-mix(in oklch, var(--color-group-var) 20%, transparent)", 46, 64),
    ],
    barData,
  };
}

function getDonutTooltipPosition(
  event: React.MouseEvent<SVGGraphicsElement>,
  container: HTMLDivElement,
) {
  const rect = container.getBoundingClientRect();
  const overflowX = rect.width / 2;
  const overflowY = rect.height / 2;
  const minX = -overflowX;
  const minY = -overflowY;
  const maxX = rect.width + overflowX - DONUT_TOOLTIP_WIDTH;
  const maxY = rect.height + overflowY - DONUT_TOOLTIP_HEIGHT;

  return {
    x: Math.max(
      minX,
      Math.min(event.clientX - rect.left + DONUT_TOOLTIP_OFFSET, maxX)
    ),
    y: Math.max(
      minY,
      Math.min(event.clientY - rect.top + DONUT_TOOLTIP_OFFSET, maxY)
    ),
  };
}

export default function HospitalityDashboard({ year, month }: { year: string; month: string }) {
  const { execute, isInitializing, error } = useDuckDb();
  const [cardState, setCardState] = useState<CardState>(fallbackState);
  const donutCardRef = useRef<HTMLDivElement | null>(null);
  const [donutTooltipState, setDonutTooltipState] = useState<
    { ring: DonutRing; x: number; y: number } | null
  >(null);
  const [donutTooltipShouldAnimateIn, setDonutTooltipShouldAnimateIn] = useState(false);

  useEffect(() => {
    if (!donutTooltipState) {
      setDonutTooltipShouldAnimateIn(false);
      return;
    }

    setDonutTooltipShouldAnimateIn(true);

    const timeoutId = window.setTimeout(() => {
      setDonutTooltipShouldAnimateIn(false);
    }, 180);

    return () => window.clearTimeout(timeoutId);
  }, [donutTooltipState?.ring.key]);

  useEffect(() => {
    async function fetchData() {
      if (isInitializing || error || !year || !month) {
        return;
      }

      try {
        const currentQuery = `
          SELECT
            CAST(SUM(rooms_cy) AS DOUBLE) AS rooms_otb,
            CAST(SUM(revenue_cy) AS DOUBLE) AS revenue_otb,
            CAST(SUM(available_rooms) AS DOUBLE) AS available_rooms,
            CAST(SUM(rooms_budget) AS DOUBLE) AS rooms_budget,
            CAST(SUM(rev_budget) AS DOUBLE) AS revenue_budget,
            CAST(SUM(rooms_budget_var) AS DOUBLE) AS rooms_left_to_book,
            CAST(SUM(revenue_budget_var) AS DOUBLE) AS revenue_left_to_book,
            CAST(SUM(revenue_cy) / NULLIF(SUM(rooms_cy), 0) AS DOUBLE) AS adr_otb,
            CAST(SUM(rev_budget) / NULLIF(SUM(rooms_budget), 0) AS DOUBLE) AS adr_budget,
            CAST(SUM(revenue_cy) / NULLIF(SUM(available_rooms), 0) AS DOUBLE) AS revpar_otb,
            CAST(SUM(rev_budget) / NULLIF(SUM(available_rooms), 0) AS DOUBLE) AS revpar_budget,
            CAST(SUM(rooms_cy) / NULLIF(SUM(available_rooms), 0) AS DOUBLE) AS occ_otb,
            CAST(SUM(rooms_budget) / NULLIF(SUM(available_rooms), 0) AS DOUBLE) AS occ_budget
          FROM 'dashboard_current.parquet'
          WHERE YEAR(stay_date) = ${year}
            AND strftime(stay_date, '%b') = '${month}'
        `;

        const segmentQuery = `
          SELECT
            segmentGroup,
            CAST(SUM(rooms) AS DOUBLE) AS rooms_otb,
            CAST(SUM(revenue) AS DOUBLE) AS revenue_otb,
            CAST(SUM(varBudget) AS DOUBLE) AS rooms_left_to_book,
            CAST(SUM(revenue) / NULLIF(SUM(rooms), 0) AS DOUBLE) AS adr_otb
          FROM 'dashboard_segments.parquet'
          WHERE YEAR(stay_date) = ${year}
            AND strftime(stay_date, '%b') = '${month}'
          GROUP BY segmentGroup
        `;

        const dailyQuery = `
          SELECT
            strftime(stay_date, '%Y-%m-%d') AS stay_date,
            CAST(SUM(rooms_cy) AS DOUBLE) AS otbRooms,
            CAST(SUM(rooms_budget_var) AS DOUBLE) AS leftToBookRooms,
            CAST(SUM(revenue_cy) AS DOUBLE) AS otbRevenue,
            CAST(SUM(revenue_budget_var) AS DOUBLE) AS leftToBookRevenue,
            CAST(SUM(revenue_cy) / NULLIF(SUM(rooms_cy), 0) AS DOUBLE) AS otbAdr
          FROM 'dashboard_current.parquet'
          WHERE YEAR(stay_date) = ${year}
            AND strftime(stay_date, '%b') = '${month}'
          GROUP BY stay_date
          ORDER BY stay_date
        `;

        const [currentRows, segmentRows, dailyRows] = await Promise.all([
          execute(currentQuery),
          execute(segmentQuery),
          execute(dailyQuery),
        ]);

        setCardState(
          buildCardState(
            currentRows[0] as CurrentMonthlyRow | undefined,
            segmentRows as SegmentMonthlyRow[],
            dailyRows as DailyCurrentRow[],
          ),
        );
      } catch (fetchError) {
        console.error("Failed to load performance card data", fetchError);
      }
    }

    fetchData();
  }, [execute, isInitializing, error, year, month]);

  const [topLeft, topRight, bottomLeft, bottomRight] = cardState.summaryMetrics;
  const totalRemaining = cardState.donutRings[0]?.remaining ?? 0;

  return (
    <Card className="metrics shadow-none retro-shadow-primary-lg w-full max-w-2xl border-2x border-color-primary bg-card p-6">
      <CardContent className="grid grid-cols-1 column-gap-2 p-0 md:grid-cols-2">
        <div className="flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="font-display text-lg font-bold uppercase text-primary">{topLeft.label}</p>
              <p className="font-serif text-3xl text-primary">{formatValue(topLeft.value, topLeft.format)}</p>
              <Variance value={topLeft.variance} format={topLeft.format} />
            </div>
            <div>
              <p className="font-display text-lg font-bold uppercase text-primary">{topRight.label}</p>
              <p className="font-serif text-3xl text-primary">{formatValue(topRight.value, topRight.format)}</p>
              <Variance value={topRight.variance} format={topRight.format} />
            </div>
          </div>

          <div>
            <p className="font-display text-7xl font-bold tracking-tighter uppercase text-primary">{cardState.heroMetric.label}</p>
            <p className=" font-serif text-6xl font-medium text-primary">{formatValue(cardState.heroMetric.value, "currency")}</p>
            <HeroMetricVariance value={cardState.heroMetric.variance} format="currency" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-display text-lg font-bold uppercase text-primary">{bottomLeft.label}</p>
              <p className="font-serif text-3xl text-primary">{formatValue(bottomLeft.value, bottomLeft.format)}</p>
              <Variance value={bottomLeft.variance} format={bottomLeft.format} />
            </div>
            <div>
              <p className="font-display text-lg font-bold uppercase text-primary">{bottomRight.label}</p>
              <p className="font-serif text-3xl text-primary">{formatValue(bottomRight.value, bottomRight.format)}</p>
              <Variance value={bottomRight.variance} format={bottomRight.format} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card
            ref={donutCardRef}
            className="relative flex h-[275px] items-center justify-center overflow-visible border-none bg-secondary p-4"
          >
            <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center">
              <p className="font-serif text-2xl text-primary">{formatCompactCurrency(totalRemaining)}</p>
              <p className="font-display text-sm font-bold uppercase text-primary opacity-70">To Book</p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                {cardState.donutRings.map((ring) => (
                  <Pie
                    key={ring.key}
                    data={[
                      {
                        name: `${ring.key}-booked`,
                        value: ring.booked,
                        fill: ring.bookedColor,
                        ring,
                      },
                      {
                        name: `${ring.key}-remaining`,
                        value: ring.remaining,
                        fill: ring.remainingColor,
                        ring,
                      },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    startAngle={90}
                    endAngle={-370}
                    innerRadius={ring.innerRadius}
                    outerRadius={ring.outerRadius}
                    paddingAngle={0}
                    cornerRadius={2}
                    stroke="none"
                    isAnimationActive={true}
                    onMouseEnter={(_data: PieSectorDataItem, _index, event) => {
                      const container = donutCardRef.current;
                      if (!container) return;
                      const position = getDonutTooltipPosition(event, container);

                      setDonutTooltipState({
                        ring,
                        ...position,
                      });
                    }}
                    onMouseMove={(_data: PieSectorDataItem, _index, event) => {
                      const container = donutCardRef.current;
                      if (!container) return;
                      const position = getDonutTooltipPosition(event, container);

                      setDonutTooltipState({ ring, ...position });
                    }}
                    onMouseLeave={() => setDonutTooltipState(null)}
                  />
                ))}
              </PieChart>
            </ResponsiveContainer>
            {donutTooltipState && (
              <div
                className="pointer-events-none absolute z-[60]"
                style={{
                  left: `${donutTooltipState.x}px`,
                  top: `${donutTooltipState.y}px`,
                }}
              >
                <DonutTooltipCard
                  ring={donutTooltipState.ring}
                  shouldAnimateIn={donutTooltipShouldAnimateIn}
                />
              </div>
            )}
          </Card>

          <Card className="flex h-[120px] items-end border-none bg-secondary p-2">
            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={cardState.barData}
                barGap={0}
                barCategoryGap="12%"
              >
                <Tooltip
                  cursor={false}
                  allowEscapeViewBox={{ x: true, y: true }}
                  isAnimationActive={true}
                  animationEasing="ease-out"
                  animationDuration={320}
                  wrapperStyle={{ zIndex: 60, pointerEvents: "none" }}
                  content={(props) => <BarTooltip {...props} />}
                />

                <Bar
                  dataKey="otbRooms"
                  stackId="rooms"
                  fill="var(--color-total-var)"
                  stroke="none"
                  radius={[0, 0, 1, 1]}
                  isAnimationActive={true}
                />

                <Bar
                  dataKey="leftToBookRooms"
                  stackId="rooms"
                  fill="var(--color-total)"
                  stroke="none"
                  radius={[1, 1, 0, 0]}
                  isAnimationActive={true}
                />

              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
