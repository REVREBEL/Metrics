"use client";

import React, { useEffect, useState } from "react";
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

const fallbackState: CardState = {
  summaryMetrics: [
    { label: "OCCP", value: 67.2, format: "percent", variance: -3 },
    { label: "Rms", value: 3340, format: "number", variance: 1645 },
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
      bookedColor: "var(--total-var)",
      remainingColor: "var(--total)",
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
      bookedColor: "var(--transient-var)",
      remainingColor: "var(--transient)",
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
      bookedColor: "var(--group-var)",
      remainingColor: "var(--group)",
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
  const tone = positive ? "var(--positive)" : "var(--negative)";

  return (
    <div className="mt-2 flex items-center text-sm font-serif" style={{ color: tone }}>
      <Icon className="mr-1 size-6 fill-current" />
      {formatValue(Math.abs(value), format)} var
    </div>
  );
}

function TooltipMetricRow({ label, booked, remaining }: TooltipRow) {
  return (
    <div className="flex items-baseline justify-between gap-6 text-sm text-[color:var(--primary)]">
      <span className="shrink-0 font-display font-bold uppercase">{label}</span>
      <span className="text-right font-serif">
        {booked} OTB <span className="mx-2 opacity-50">|</span> {remaining} Left to Book
      </span>
    </div>
  );
}

function DonutTooltip({ active, payload }: TooltipContentProps<number, string>) {
  if (!active || !payload?.length) {
    return null;
  }

  const ring = payload[0]?.payload?.ring as DonutRing | undefined;
  if (!ring) {
    return null;
  }

  return (
    <div className="relative z-[60] min-w-64 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-lg">
      <p className="mb-3 text-left font-display text-md font-bold uppercase text-[color:var(--primary)]">
        {ring.tooltipTitle}
      </p>
      <div className="flex flex-col gap-2">
        {ring.tooltipRows.map((row) => (
          <TooltipMetricRow key={row.label} {...row} />
        ))}
      </div>
    </div>
  );
}

function BarTooltip({ active, payload }: TooltipContentProps<number, string>) {
  if (!active || !payload?.length) {
    return null;
  }

  const datum = payload[0]?.payload as DailyBarDatum | undefined;
  if (!datum) {
    return null;
  }

  return (
    <div className="relative z-[60] min-w-72 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-lg">
      <p className="mb-3 text-left font-display text-md font-bold uppercase text-[color:var(--primary)]">
        {datum.dateLabel}
      </p>
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
      { label: "OCCP", value: occOtb * 100, format: "percent", variance: (occBudget - occOtb) * 100 },
      { label: "Rms", value: roomsOtb, format: "number", variance: roomsLeftToBook },
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
        bookedColor: "var(--total-var)",
        remainingColor: "var(--total)",
        innerRadius: 94,
        outerRadius: 118,
        tooltipTitle: METRIC_NAME,
        tooltipRows: [
          buildTooltipRow("Rooms", roomsOtb.toLocaleString(), roomsLeftToBook.toLocaleString()),
          buildTooltipRow("Revenue", formatCompactCurrency(revenueOtb), formatCompactCurrency(revenueLeftToBook)),
          buildTooltipRow("ADR", formatValue(adrOtb, "currency"), formatValue(Math.max(adrBudget - adrOtb, 0), "currency")),
        ],
      },
      buildSegmentRing("transient", "TRANSIENT", "var(--transient-var)", "var(--transient)", 68, 90),
      buildSegmentRing("group", "GROUP", "var(--group-var)", "var(--group)", 46, 64),
    ],
    barData,
  };
}

export default function HospitalityDashboard({ year, month }: { year: string; month: string }) {
  const { execute, isInitializing, error } = useDuckDb();
  const [cardState, setCardState] = useState<CardState>(fallbackState);

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
    <Card className="metrics w-full max-w-4xl border-none bg-[#f0f4f8] p-6 shadow-lg">
      <CardContent className="grid grid-cols-1 gap-8 p-0 md:grid-cols-2">
        <div className="flex flex-col justify-between gap-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-display text-2xl font-bold uppercase text-[color:var(--primary)]">{topLeft.label}</p>
              <p className="font-serif text-4xl text-[color:var(--primary)]">{formatValue(topLeft.value, topLeft.format)}</p>
              <Variance value={topLeft.variance} format={topLeft.format} />
            </div>
            <div>
              <p className="font-display text-2xl font-bold uppercase text-[color:var(--primary)]">{topRight.label}</p>
              <p className="font-serif text-4xl text-[color:var(--primary)]">{formatValue(topRight.value, topRight.format)}</p>
              <Variance value={topRight.variance} format={topRight.format} />
            </div>
          </div>

          <div>
            <p className="font-display text-7xl font-bold tracking-tighter uppercase text-[color:var(--primary)]">{cardState.heroMetric.label}</p>
            <p className="mt-2 font-serif text-6xl font-medium text-[color:var(--primary)]">{formatValue(cardState.heroMetric.value, "currency")}</p>
            <Variance value={cardState.heroMetric.variance} format="currency" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-display text-2xl font-bold uppercase text-[color:var(--primary)]">{bottomLeft.label}</p>
              <p className="font-serif text-4xl text-[color:var(--primary)]">{formatValue(bottomLeft.value, bottomLeft.format)}</p>
              <Variance value={bottomLeft.variance} format={bottomLeft.format} />
            </div>
            <div>
              <p className="font-display text-2xl font-bold uppercase text-[color:var(--primary)]">{bottomRight.label}</p>
              <p className="font-serif text-4xl text-[color:var(--primary)]">{formatValue(bottomRight.value, bottomRight.format)}</p>
              <Variance value={bottomRight.variance} format={bottomRight.format} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="relative flex h-[300px] items-center justify-center overflow-hidden border-none bg-[#e2edf7] p-4">
            <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center">
              <p className="font-serif text-2xl text-[color:var(--primary)]">{formatCompactCurrency(totalRemaining)}</p>
              <p className="font-display text-sm font-bold uppercase text-[color:var(--primary)] opacity-70">To Book</p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip cursor={false} content={<DonutTooltip />} />
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
                    endAngle={-270}
                    innerRadius={ring.innerRadius}
                    outerRadius={ring.outerRadius}
                    paddingAngle={0}
                    cornerRadius={999}
                    stroke="none"
                    isAnimationActive={false}
                  />
                ))}
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card className="flex h-[180px] items-end border-none bg-[#e2edf7] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cardState.barData} barGap={0} barCategoryGap="12%">
                <Tooltip cursor={false} content={<BarTooltip />} />
                <Bar dataKey="otbRooms" stackId="rooms" fill="var(--total-var)" stroke="none" radius={[0, 0, 4, 4]} />
                <Bar dataKey="leftToBookRooms" stackId="rooms" fill="var(--total)" stroke="none" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
