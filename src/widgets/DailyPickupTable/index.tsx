"use client";

import React, { useState } from "react";
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
} from "recharts";
import { CalendarDays } from "lucide-react";

import ArrowCircleDown from "@/assets/RebelIconsReact/ArrowCircleDown";
import ArrowCircleUp from "@/assets/RebelIconsReact/ArrowCircleUp";
import { MetricCardTabs } from "@/widgets/_shared/MetricCard";

const SEGMENT_TABS = [
  { label: "Transient", value: "transient" },
  { label: "Group", value: "group" },
  { label: "Crew", value: "crew" },
  { label: "Comp", value: "complimentary" },
  { label: "Other", value: "other" },
] as const;

const DAILY_DATA = [
  { dow: "Mon", date: "09-01", bar: 319, eventsCy: null, eventsPy: null, occ: 3, rooms: 3, adr: 231.53, rev: 695, revpar: 6.95, trans: 70, group: 20, crew: 5, comp: 2, other: 3, pu1: 0, pu3: 0, pu7: 0, pu14: 2, pu21: 3, pu30: 3, pu60: 5, pu90: 5 },
  { dow: "Tue", date: "09-02", bar: 329, eventsCy: null, eventsPy: null, occ: 1, rooms: 1, adr: 225.83, rev: 226, revpar: 2.26, trans: 88, group: 0, crew: 5, comp: 2, other: 5, pu1: 0, pu3: 0, pu7: 0, pu14: 0, pu21: 0, pu30: 1, pu60: 1, pu90: 1 },
  { dow: "Wed", date: "09-03", bar: 369, eventsCy: "Green Day at Co...", eventsPy: null, occ: 11, rooms: 11, adr: 292.35, rev: 3216, revpar: 32.16, trans: 50, group: 40, crew: 4, comp: 2, other: 4, pu1: 0, pu3: 0, pu7: 0, pu14: 0, pu21: 10, pu30: 11, pu60: 11, pu90: 11 },
  { dow: "Thu", date: "09-04", bar: 379, eventsCy: null, eventsPy: null, occ: 14, rooms: 14, adr: 409.50, rev: 5733, revpar: 57.33, trans: 60, group: 30, crew: 4, comp: 2, other: 4, pu1: 0, pu3: 0, pu7: 4, pu14: 4, pu21: 14, pu30: 14, pu60: 14, pu90: 14 },
  { dow: "Fri", date: "09-05", bar: 439, eventsCy: null, eventsPy: null, occ: 13, rooms: 13, adr: 330.86, rev: 4301, revpar: 43.01, trans: 80, group: 10, crew: 4, comp: 2, other: 4, pu1: 0, pu3: 0, pu7: 0, pu14: 2, pu21: 12, pu30: 12, pu60: 12, pu90: 12 },
  { dow: "Sat", date: "09-06", bar: 459, eventsCy: null, eventsPy: null, occ: 42, rooms: 42, adr: 461.46, rev: 19381, revpar: 193.81, trans: 40, group: 50, crew: 4, comp: 2, other: 4, pu1: 1, pu3: 2, pu7: 5, pu14: 8, pu21: 15, pu30: 20, pu60: 25, pu90: 30 },
  { dow: "Sun", date: "09-07", bar: 329, eventsCy: "Lions non-impact...", eventsPy: null, occ: 21, rooms: 21, adr: 298.19, rev: 6262, revpar: 62.62, trans: 86, group: 5, crew: 4, comp: 2, other: 3, pu1: 0, pu3: 0, pu7: 0, pu14: 2, pu21: 3, pu30: 3, pu60: 3, pu90: 3 },
  { dow: "Mon", date: "09-08", bar: 349, eventsCy: null, eventsPy: null, occ: 18, rooms: 18, adr: 309.00, rev: 5562, revpar: 55.62, trans: 70, group: 20, crew: 4, comp: 2, other: 4, pu1: 0, pu3: 0, pu7: 0, pu14: 0, pu21: 0, pu30: 0, pu60: 0, pu90: 0 },
  { dow: "Tue", date: "09-09", bar: 419, eventsCy: "Tigers Game Col...", eventsPy: null, occ: 52, rooms: 52, adr: 358.62, rev: 18648, revpar: 186.48, trans: 30, group: 60, crew: 4, comp: 2, other: 4, pu1: 0, pu3: 0, pu7: 0, pu14: 0, pu21: -2, pu30: 29, pu60: 40, pu90: 50 },
  { dow: "Wed", date: "09-10", bar: 419, eventsCy: "Tigers Game Col...", eventsPy: null, occ: 39, rooms: 39, adr: 382.85, rev: 14931, revpar: 149.31, trans: 40, group: 50, crew: 4, comp: 2, other: 4, pu1: 0, pu3: 0, pu7: 0, pu14: 5, pu21: 3, pu30: 34, pu60: 40, pu90: 45 },
];

type SegmentValue = (typeof SEGMENT_TABS)[number]["value"];

type VarianceProps = {
  value: string;
  isNegative: boolean;
};

type SummaryCardProps = {
  title: string;
  value: string;
  subValue: string;
  isNegative: boolean;
};

type HeatmapCellProps = {
  value: number;
  max: number;
  type?: "occ" | "currency" | "revpar";
};

type MarketMixBarProps = {
  transient: number;
  group: number;
  crew: number;
  complimentary: number;
  other: number;
};

const MARKET_MIX_DATA = [
  { name: "Transient", value: 55, segment: "transient", fill: "var(--color-transient)" },
  { name: "Group", value: 25, segment: "group", fill: "var(--color-group)" },
  { name: "Crew", value: 8, segment: "crew", fill: "var(--color-crew)" },
  { name: "Comp", value: 5, segment: "complimentary", fill: "var(--color-complimentary)" },
  { name: "Other", value: 7, segment: "other", fill: "var(--color-other, var(--base-grey-l700))" },
];

function Variance({ value, isNegative }: VarianceProps) {
  const positive = !isNegative;
  const Icon = positive ? ArrowCircleUp : ArrowCircleDown;

  return (
    <div
      className="daily-pickup__variance"
      style={{ "--variance-color": positive ? "var(--color-positive)" : "var(--color-negative)" } as React.CSSProperties}
    >
      <Icon className="size-5 fill-current" />
      {value}
    </div>
  );
}

function SummaryCard({ title, value, subValue, isNegative }: SummaryCardProps) {
  return (
    <div className="daily-pickup__summary-card">
      <div className="daily-pickup__summary-label">{title}</div>
      <div className="daily-pickup__summary-value">{value}</div>
      <Variance value={subValue} isNegative={isNegative} />
    </div>
  );
}

function HeatmapCell({ value, max, type = "occ" }: HeatmapCellProps) {
  const intensity = Math.min(value / max, 1);

  return (
    <td
      className="daily-pickup__heat-cell daily-pickup__table-number"
      style={{ "--heat-intensity": intensity } as React.CSSProperties}
    >
      {type === "occ" ? `${value}%` : `$${value.toFixed(2)}`}
    </td>
  );
}

function MarketMixBar({ transient, group, crew, complimentary, other }: MarketMixBarProps) {
  const segments = [
    { key: "transient", value: transient },
    { key: "group", value: group },
    { key: "crew", value: crew },
    { key: "complimentary", value: complimentary },
    { key: "other", value: other },
  ];

  return (
    <td className="daily-pickup__mix-bar">
      <div className="daily-pickup__mix-track">
        {segments.map((segment) => (
          <div
            key={segment.key}
            className="daily-pickup__mix-fill"
            data-segment={segment.key}
            style={{ width: `${segment.value}%` }}
          />
        ))}
      </div>
    </td>
  );
}

interface DailyPickupTableProps {
  year?: string;
  month?: string;
}

export default function DailyPickupTable({ year = "2025", month = "Sep" }: DailyPickupTableProps) {
  const [activeSegment, setActiveSegment] = useState<SegmentValue>("transient");

  return (
    <div className="daily-pickup">
      <div className="daily-pickup__inner">
        <header className="daily-pickup__header">
          <div className="daily-pickup__title-bar">
            <h1 className="daily-pickup__title">Daily Pickup Metric</h1>
          </div>

          <div className="daily-pickup__summary">
            <div className="daily-pickup__summary-top">
              <div>
                <div className="daily-pickup__month">{month} {year}</div>
                <div className="daily-pickup__subline">
                  <CalendarDays className="size-4" />
                  OTB Summary
                </div>
              </div>

              <div className="daily-pickup__mix">
                <div className="daily-pickup__mix-copy">
                  <span className="daily-pickup__mix-title">Market Mix OTB</span>
                  <div className="daily-pickup__legend">
                    {MARKET_MIX_DATA.map((item) => (
                      <span key={item.name} className="daily-pickup__legend-label" data-segment={item.segment}>
                        <span className="daily-pickup__legend-dot" />
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="daily-pickup__pie">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={MARKET_MIX_DATA}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={18}
                        outerRadius={36}
                        paddingAngle={2}
                        startAngle={90}
                        endAngle={-270}
                        stroke="var(--card)"
                        isAnimationActive={false}
                      >
                        {MARKET_MIX_DATA.map((entry) => (
                          <Cell key={entry.name} fill={entry.fill} />
                        ))}
                      </Pie>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="daily-pickup__summary-cards">
              <SummaryCard title="Occupancy" value="29.2%" subValue="-11.60%" isNegative />
              <SummaryCard title="Rooms" value="876" subValue="-348" isNegative />
              <SummaryCard title="ADR" value="$362.47" subValue="-$10.30" isNegative />
              <SummaryCard title="Revenue" value="$317,520" subValue="-$138,742" isNegative />
              <SummaryCard title="RevPAR" value="$105.84" subValue="-$46.25" isNegative />
            </div>
          </div>
        </header>

        <div className="daily-pickup__controls">
          <span className="daily-pickup__control-label">Segment Filter:</span>
          <MetricCardTabs
            tabs={[...SEGMENT_TABS]}
            value={activeSegment}
            onValueChange={setActiveSegment}
            className="daily-pickup__tabs"
          />
        </div>

        <div className="daily-pickup__table-card">
          <div className="daily-pickup__table-scroll">
            <table className="daily-pickup__table">
              <thead>
                <tr className="daily-pickup__table-group-row">
                  <th colSpan={5}>Operational Log</th>
                  <th colSpan={6} className="daily-pickup__section-label--performance">Daily Performance Metrics (OTB)</th>
                  <th colSpan={8} className="daily-pickup__section-label--pickup">Velocity Delta (Pickup)</th>
                </tr>
                <tr className="daily-pickup__table-header-row">
                  <th>DOW</th>
                  <th>Date</th>
                  <th>BAR Rate</th>
                  <th>Event CY</th>
                  <th>Event PY</th>
                  <th>Occ OTB</th>
                  <th>Rooms</th>
                  <th>Mix</th>
                  <th>ADR</th>
                  <th>Revenue</th>
                  <th>RevPAR</th>
                  {["01d", "03d", "07d", "14d", "21d", "30d", "60d", "90d"].map((pu) => (
                    <th key={pu}>{pu}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DAILY_DATA.map((row) => (
                  <tr key={`${row.dow}-${row.date}`}>
                    <td className={row.dow === "Sat" || row.dow === "Sun" ? "daily-pickup__table-number" : "daily-pickup__muted"}>{row.dow}</td>
                    <td className="daily-pickup__table-number">{row.date}</td>
                    <td className="daily-pickup__table-number">${row.bar}</td>
                    <td className="daily-pickup__event" title={row.eventsCy || undefined}>{row.eventsCy || "—"}</td>
                    <td className="daily-pickup__event daily-pickup__muted">{row.eventsPy || "—"}</td>
                    <HeatmapCell value={row.occ} max={100} type="occ" />
                    <td className="daily-pickup__table-number">{row.rooms}</td>
                    <MarketMixBar transient={row.trans} group={row.group} crew={row.crew} complimentary={row.comp} other={row.other} />
                    <td className="daily-pickup__table-number">${row.adr.toFixed(2)}</td>
                    <td className="daily-pickup__table-number">${row.rev.toLocaleString()}</td>
                    <HeatmapCell value={row.revpar} max={350} type="revpar" />
                    {[row.pu1, row.pu3, row.pu7, row.pu14, row.pu21, row.pu30, row.pu60, row.pu90].map((val, index) => (
                      <td
                        key={`${row.date}-${index}`}
                        className={`daily-pickup__table-number ${val > 0 ? "daily-pickup__pickup-positive" : val < 0 ? "daily-pickup__pickup-negative" : "daily-pickup__pickup-empty"}`}
                      >
                        {val === 0 ? "—" : val > 0 ? `+${val}` : val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
