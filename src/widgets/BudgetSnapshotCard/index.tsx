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
  value: number;
  metric: ProductionSegment;
  color: string;
  varianceColor: string;
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
  value: number
): SegmentDatum => ({
  name: SEGMENT_CONFIG[metric].label,
  value,
  metric,
  color: SEGMENT_CONFIG[metric].color,
  varianceColor: SEGMENT_CONFIG[metric].varianceColor,
});

const HOTEL_DATA = {
  budget: [
    createSegment("transient", 1250),
    createSegment("group", 850),
    createSegment("crew", 320),
    createSegment("complimentary", 185),
    createSegment("other", 50),
  ],
  forecast: [
    createSegment("transient", 1100),
    createSegment("group", 920),
    createSegment("crew", 310),
    createSegment("complimentary", 210),
    createSegment("other", 45),
  ],
  stly: [
    createSegment("transient", 1180),
    createSegment("group", 790),
    createSegment("crew", 300),
    createSegment("complimentary", 170),
    createSegment("other", 60),
  ],
} satisfies Record<SnapshotTab, SegmentDatum[]>;

export default function BudgetSnapshotCard() {
  const [activeTab, setActiveTab] = useState<SnapshotTab>("budget");

  const currentData = HOTEL_DATA[activeTab];
  const totalSpend = useMemo(
    () => currentData.reduce((acc, curr) => acc + curr.value, 0),
    [currentData]
  );

  const getSubLabel = () => {
    switch (activeTab) {
      case "budget":
        return "total budget";
      case "forecast":
        return "expected otb";
      case "stly":
        return "prior year total";
      default:
        return "total spend";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-8 font-sans">
      <MetricCard
        title="Budget Breakdown"
        metric="total"
        headerAction={<MoreVertical className="h-5 w-5 cursor-pointer text-primary" />}
      >
        <MetricCardDescription description="Spend distribution across production segments." />

        <MetricCardTabs
          tabs={SNAPSHOT_TABS}
          value={activeTab}
          onValueChange={setActiveTab}
        />

        <div className="relative h-65 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={currentData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {currentData.map((entry) => (
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
                            className="metric-card__value fill-[var(--primary-b000)] text-2xl"
                          >
                            ${totalSpend.toLocaleString()}
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

        <div className="mb-2 flex justify-between px-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary-400">
          <span>Segment</span>
          <span>Amount / Share</span>
        </div>

        <div className="space-y-0">
          {currentData.map((item) => {
            const percentage = ((item.value / totalSpend) * 100).toFixed(1);

            return (
              <div key={item.metric} className={`group metric-card--${item.metric}`}>
                <Separator className="bg-slate-200/60" />
                <div className="flex cursor-default items-center justify-between px-2 py-3 transition-colors hover:bg-slate-50/80">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-4 w-1.5 rounded-full"
                      style={{ backgroundColor: "var(--metric-color)" }}
                    />
                    <span className="metric-card__label text-sm text-primary-700">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="metric-card__value text-sm font-normal text-[var(--primary-b000)]">
                      ${item.value.toLocaleString()}
                    </span>
                    <div
                      className="min-w-15 rounded px-2 py-1 text-center text-[10px] font-black text-[var(--primary-b000)]"
                      style={{
                        backgroundColor:
                          "color-mix(in oklch, var(--metric-color) 15%, transparent)",
                        border:
                          "1px solid color-mix(in oklch, var(--metric-variance-color) 30%, transparent)",
                      }}
                    >
                      {percentage}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <MetricInsight>
          {activeTab === "forecast"
            ? "Pacing is currently 4.2% ahead of STLY. Group bookings for Q3 are showing strong conversion."
            : "Spend distribution remains consistent with seasonal trends. No major variance detected."}
        </MetricInsight>
      </MetricCard>
    </div>
  );
}
