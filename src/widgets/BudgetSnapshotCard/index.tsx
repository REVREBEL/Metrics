"use client";

import React, { useMemo, useState } from "react";
import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";
import { Separator } from "@/components/ui/separator";
import { MoreVertical } from "lucide-react";
import {
  MetricCard,
  MetricCardDescription,
  MetricCardTabs,
  MetricInsight,
} from "@/widgets/_shared/MetricCard";
import type { ProductionSegment } from "@/widgets/_shared/metric-theme";

type SnapshotTab = "budget" | "forecast" | "stly";

type SegmentDatum = {
  name: string;
  rooms: number;
  adr: number;
  revenue: number;
  metric: ProductionSegment;
  color: string;
  varianceColor: string;
};

type ChartDatum = SegmentDatum & {
  value: number;
  mix: number;
};

const SNAPSHOT_TABS = [
  { label: "Budget", value: "budget" },
  { label: "OTB", value: "forecast" },
  { label: "STLY", value: "stly" },
] satisfies Array<{ label: string; value: SnapshotTab }>;

const SEGMENT_CONFIG = {
  transient: {
    label: "Transient",
    color: "var(--color-transient)",
    varianceColor: "var(--color-transient-var)",
  },
  group: {
    label: "Group",
    color: "var(--color-group)",
    varianceColor: "var(--color-group-var)",
  },
  crew: {
    label: "Crew",
    color: "var(--color-crew)",
    varianceColor: "var(--color-crew-var)",
  },
  complimentary: {
    label: "Complimentary",
    color: "var(--color-complimentary)",
    varianceColor: "var(--color-complimentary-var)",
  },
  other: {
    label: "Other",
    color: "var(--color-other)",
    varianceColor: "var(--color-other-var)",
  },
} satisfies Record<Exclude<ProductionSegment, "total">, {
  label: string;
  color: string;
  varianceColor: string;
}>;

const createSegment = (
  metric: Exclude<ProductionSegment, "total">,
  rooms: number,
  adr: number
): SegmentDatum => ({
  name: SEGMENT_CONFIG[metric].label,
  rooms,
  adr,
  revenue: Math.round(rooms * adr),
  metric,
  color: SEGMENT_CONFIG[metric].color,
  varianceColor: SEGMENT_CONFIG[metric].varianceColor,
});

const HOTEL_DATA = {
  budget: [
    createSegment("transient", 47, 255.32),
    createSegment("group", 32, 218.75),
    createSegment("crew", 12, 120),
    createSegment("complimentary", 7, 0),
    createSegment("other", 2, 175),
  ],
  forecast: [
    createSegment("transient", 43, 248.84),
    createSegment("group", 36, 225),
    createSegment("crew", 12, 118.5),
    createSegment("complimentary", 8, 0),
    createSegment("other", 3, 165),
  ],
  stly: [
    createSegment("transient", 45, 238.5),
    createSegment("group", 30, 210),
    createSegment("crew", 11, 115),
    createSegment("complimentary", 6, 0),
    createSegment("other", 3, 150),
  ],
} satisfies Record<SnapshotTab, SegmentDatum[]>;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const formatAdr = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const MIX_LABEL_INSIDE_THRESHOLD = 22;

export default function BudgetSnapshotCard() {
  const [activeTab, setActiveTab] = useState<SnapshotTab>("budget");

  const currentData = HOTEL_DATA[activeTab];
  const totalRooms = useMemo(
    () => currentData.reduce((acc, curr) => acc + curr.rooms, 0),
    [currentData]
  );
  const totalRevenue = useMemo(
    () => currentData.reduce((acc, curr) => acc + curr.revenue, 0),
    [currentData]
  );
  const chartData = useMemo<ChartDatum[]>(
    () =>
      currentData.map((item) => ({
        ...item,
        value: item.rooms,
        mix: totalRooms ? (item.rooms / totalRooms) * 100 : 0,
      })),
    [currentData, totalRooms]
  );

  const getSubLabel = () => {
    switch (activeTab) {
      case "budget":
        return "budget rooms";
      case "forecast":
        return "expected otb";
      case "stly":
        return "prior year rooms";
      default:
        return "total rooms";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-8 font-sans">
      <MetricCard
        title="Budget Breakdown"
        metric="total"
        headerAction={<MoreVertical className="h-5 w-5 cursor-pointer text-primary" />}
      >
        <MetricCardDescription description="Rooms, ADR, and revenue distribution across production segments." />

        <MetricCardTabs
          tabs={SNAPSHOT_TABS}
          value={activeTab}
          onValueChange={setActiveTab}
        />

        <div className="metric-card__chart-section">
          <div className="relative h-65 w-full max-w-75">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={entry.metric}
                      fill={entry.color}
                      className="outline-none"
                    />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="metric-card__value fill-(--primary-b000) text-2xl"
                            >
                              {totalRooms.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 20}
                              className="metric-card__label fill-slate-400 tracking-[0.2em]"
                            >
                              {getSubLabel()}
                            </tspan>
                          </text>
                        );
                      }

                      return null;
                    }}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-[minmax(130px,1.35fr)_minmax(180px,1.2fr)_minmax(110px,0.9fr)_minmax(120px,1fr)] gap-4 border-b border-(--color-dark-blue-200) px-2 pb-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary-400">
          <span>Segment</span>
          <span className="text-right">Rooms / % Mix</span>
          <span className="text-right">ADR</span>
          <span className="text-right">Revenue</span>
        </div>

        <div className="space-y-0">
          {chartData.map((item) => {
            const percentage = item.mix.toFixed(1);
            const mixWidth = `${Math.max(item.mix, 1.5)}%`;
            const shouldPlaceLabelInside = item.mix >= MIX_LABEL_INSIDE_THRESHOLD;

            return (
              <div key={item.metric} className={`group metric-card--${item.metric}`}>
                <div className="grid grid-cols-[minmax(130px,1.35fr)_minmax(180px,1.2fr)_minmax(110px,0.9fr)_minmax(120px,1fr)] items-center gap-4 px-2 py-3 transition-colors hover:bg-slate-50/80">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-4 w-1.5 rounded-full"
                      style={{ backgroundColor: "var(--metric-color)" }}
                    />
                    <span className="metric-card__label text-sm text-primary-700">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-3 text-right">
                    <span className="metric-card__number">
                      {item.rooms.toLocaleString()}
                    </span>
                    <span className="metric-card__unit">rn</span>
                    <div
                      className="metric-card__mix"
                      style={{ "--mix-width": mixWidth } as React.CSSProperties}
                    >
                      <div className="metric-card__mix-track">
                        <div
                          className="metric-card__mix-bar"
                          style={{ width: mixWidth }}
                        />
                        <span
                          className={
                            shouldPlaceLabelInside
                              ? "metric-card__mix-label metric-card__mix-label--inside"
                              : "metric-card__mix-label metric-card__mix-label--outside"
                          }
                        >
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="metric-card__number">{formatAdr(item.adr)}</span>{" "}
                    <span className="metric-card__unit">adr</span>
                  </div>

                  <div className="text-right">
                    <span className="metric-card__number">
                      {formatCurrency(item.revenue)}
                    </span>{" "}
                    <span className="metric-card__unit">rev</span>
                  </div>
                </div>
                <Separator className="bg-slate-200/60" />
              </div>
            );
          })}
        </div>

        <MetricInsight>
          {activeTab === "forecast"
            ? `${formatCurrency(totalRevenue)} in forecasted revenue, with group room nights showing strong conversion.`
            : `${totalRooms.toLocaleString()} room nights and ${formatCurrency(totalRevenue)} in revenue are distributed across the current segment mix.`}
        </MetricInsight>
      </MetricCard>
    </div>
  );
}
