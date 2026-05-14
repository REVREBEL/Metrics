"use client";

import * as React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { getMetricThemeClass, type MetricTheme } from "./metric-theme";

export type DevlinkMetricLayoutVariant =
  | "Base"
  | "Stacked 1col"
  | "Stacked 2col"
  | "Horizontal 1row"
  | "Horizontal 2row";

export type MetricLayoutVariant =
  | "stack"
  | "inline"
  | "split"
  | "row"
  | "hero"
  | "compact"
  | "tile"
  | DevlinkMetricLayoutVariant;

export type MetricLayoutSize = "xs" | "sm" | "base" | "md" | "lg" | "xl" | "xxl";
export type MetricLayoutAlign = "start" | "center" | "end";
export type MetricTrend = "up" | "down" | "neutral";
export type MetricValueFormat = "base" | "percent" | "currency" | "integer" | "compactCurrency";
export type MetricType =
  | "base"
  | "occupancy"
  | "rooms"
  | "adr"
  | "revenue"
  | "revpar"
  | "nights"
  | "reservations"
  | "guests";
export type VarianceType = "Base" | "to book" | "%chg" | "var" | "var STLY" | "var PY" | "var WOW";

export type MetricLayoutProps = {
  label?: React.ReactNode;
  value?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  description?: React.ReactNode;
  sublabel?: React.ReactNode;
  change?: React.ReactNode;
  changeLabel?: React.ReactNode;
  trend?: MetricTrend;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  progress?: number;
  metric?: MetricTheme;
  variant?: MetricLayoutVariant;
  size?: MetricLayoutSize;
  align?: MetricLayoutAlign;
  inverse?: boolean;
  bordered?: boolean;
  elevated?: boolean;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
  children?: React.ReactNode;

  /** DevLink/Webflow-compatible props from Dashboard-Concept-Components/devlink/MetricLayout.d.ts */
  layoutVariant?: DevlinkMetricLayoutVariant;
  metricFormat?: string;
  metricSlot?: React.ReactNode;
  metricType?: React.ReactNode;
  metricRuntimeProps?: React.HTMLAttributes<HTMLSpanElement>;
  metricVarSlot?: React.ReactNode;
  metricVarRuntimeProps?: React.HTMLAttributes<HTMLSpanElement>;
  varianceFormat?: string;
  varianceLabel?: React.ReactNode;
  varianceLabelVisibility?: boolean;
  varianceType?: VarianceType;
  varianceVisibility?: boolean;
  iconTrendSlot?: React.ReactNode;
  iconTrendRuntimeProps?: React.HTMLAttributes<HTMLSpanElement>;
  iconTrendVisibility?: boolean;
};

const metricLabelMap: Record<MetricType, { label: string; abbr: string; format: MetricValueFormat }> = {
  base: { label: "Metric", abbr: "Metric", format: "percent" },
  occupancy: { label: "Occupancy", abbr: "Occ", format: "percent" },
  rooms: { label: "Rooms", abbr: "Rms", format: "integer" },
  adr: { label: "ADR", abbr: "ADR", format: "currency" },
  revenue: { label: "Revenue", abbr: "Rev", format: "compactCurrency" },
  revpar: { label: "RevPAR", abbr: "RevPAR", format: "currency" },
  nights: { label: "Nights", abbr: "Nts", format: "integer" },
  reservations: { label: "Reservations", abbr: "Res", format: "integer" },
  guests: { label: "Guests", abbr: "Guests", format: "integer" },
};

function normalizeVariant(variant?: MetricLayoutVariant, layoutVariant?: DevlinkMetricLayoutVariant): Exclude<MetricLayoutVariant, DevlinkMetricLayoutVariant> {
  const next = layoutVariant ?? variant ?? "stack";

  if (next === "Base") return "stack";
  if (next === "Stacked 1col") return "stack";
  if (next === "Stacked 2col") return "split";
  if (next === "Horizontal 1row") return "row";
  if (next === "Horizontal 2row") return "inline";

  return next as Exclude<MetricLayoutVariant, DevlinkMetricLayoutVariant>;
}

function getTrendClass(trend?: MetricTrend) {
  if (trend === "up") return "metric-layout__change--up";
  if (trend === "down") return "metric-layout__change--down";
  return "metric-layout__change--neutral";
}

function TrendIcon({ trend }: { trend?: MetricTrend }) {
  if (trend === "up") return <ArrowUpRight className="metric-layout__trend-icon" />;
  if (trend === "down") return <ArrowDownRight className="metric-layout__trend-icon" />;
  return null;
}

function parseNumberish(value: React.ReactNode) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return null;

  const parsed = Number(value.replace(/[$,%]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatMetricValue(value: React.ReactNode, format: MetricValueFormat | string = "base") {
  const numericValue = parseNumberish(value);
  if (numericValue === null) return value;

  if (format === "percent") return `${numericValue.toFixed(1)}%`;
  if (format === "integer") return numericValue.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (format === "currency") {
    return numericValue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  if (format === "compactCurrency") {
    return numericValue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
  }

  return value;
}

export function getMetricTypeMeta(metricType: MetricType = "base", abbreviated = true) {
  const meta = metricLabelMap[metricType] ?? metricLabelMap.base;
  return {
    ...meta,
    displayLabel: abbreviated ? meta.abbr : meta.label,
  };
}

export function getVarianceLabel(varianceType?: VarianceType, fallback?: React.ReactNode) {
  if (fallback) return fallback;
  if (!varianceType || varianceType === "Base") return "STLY";
  if (varianceType === "%chg") return "%CHG";
  return varianceType.replace("var ", "").toUpperCase();
}

export function MetricLayout({
  label,
  value = "0.0%",
  prefix,
  suffix,
  description,
  sublabel,
  change = "0.0%",
  changeLabel,
  trend = "neutral",
  icon,
  action,
  progress,
  metric = "total",
  variant = "stack",
  layoutVariant,
  size = "md",
  align = "start",
  inverse = false,
  bordered = false,
  elevated = false,
  className,
  valueClassName,
  labelClassName,
  children,
  metricFormat,
  metricSlot,
  metricType,
  metricRuntimeProps,
  metricVarSlot,
  metricVarRuntimeProps,
  varianceFormat,
  varianceLabel,
  varianceLabelVisibility = true,
  varianceType,
  varianceVisibility = true,
  iconTrendSlot,
  iconTrendRuntimeProps,
  iconTrendVisibility = true,
}: MetricLayoutProps) {
  const progressValue = typeof progress === "number" ? Math.max(0, Math.min(progress, 100)) : null;
  const normalizedVariant = normalizeVariant(variant, layoutVariant);
  const finalLabel = label ?? metricType ?? "Metric";
  const finalValue = metricSlot ?? formatMetricValue(value, metricFormat);
  const finalChange = metricVarSlot ?? formatMetricValue(change, varianceFormat);
  const finalChangeLabel = getVarianceLabel(varianceType, varianceLabel ?? changeLabel ?? sublabel);
  const finalTrendIcon = iconTrendSlot ?? <TrendIcon trend={trend} />;

  return (
    <div
      className={cn(
        "metric-layout",
        getMetricThemeClass(metric),
        `metric-layout--${normalizedVariant}`,
        `metric-layout--${size}`,
        `metric-layout--align-${align}`,
        inverse && "metric-layout--inverse",
        bordered && "metric-layout--bordered",
        elevated && "metric-layout--elevated",
        className
      )}
      style={
        progressValue !== null
          ? ({ "--metric-layout-progress": `${progressValue}%` } as React.CSSProperties)
          : undefined
      }
    >
      {(icon || action) && (
        <div className="metric-layout__topline">
          {icon && <span className="metric-layout__icon">{icon}</span>}
          {action && <div className="metric-layout__action">{action}</div>}
        </div>
      )}

      <div className="metric-layout__body">
        <div className="metric-layout__main">
          {finalLabel && <div className={cn("metric-layout__label", labelClassName)}>{finalLabel}</div>}

          {finalValue !== undefined && finalValue !== null && (
            <div className={cn("metric-layout__value", valueClassName)} {...metricRuntimeProps}>
              {prefix && <span className="metric-layout__prefix">{prefix}</span>}
              <span className="metric-layout__value-main">{finalValue}</span>
              {suffix && <span className="metric-layout__suffix">{suffix}</span>}
              {iconTrendVisibility && finalTrendIcon && (
                <span className="metric-layout__trend-slot" {...iconTrendRuntimeProps}>
                  {finalTrendIcon}
                </span>
              )}
            </div>
          )}

          {description && <div className="metric-layout__description">{description}</div>}
          {children}
        </div>

        {varianceVisibility && (finalChange || finalChangeLabel) && (
          <div className="metric-layout__supporting">
            <div className={cn("metric-layout__change", getTrendClass(trend))} {...metricVarRuntimeProps}>
              {finalChange && <span className="metric-layout__change-value">{finalChange}</span>}
              {varianceLabelVisibility && finalChangeLabel && (
                <span className="metric-layout__change-label">{finalChangeLabel}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {progressValue !== null && (
        <div className="metric-layout__progress" aria-label={`Progress ${progressValue}%`}>
          <div className="metric-layout__progress-fill" />
        </div>
      )}
    </div>
  );
}

export type MetricLayoutGroupProps = {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5;
  className?: string;
};

export function MetricLayoutGroup({
  children,
  columns = 3,
  className,
}: MetricLayoutGroupProps) {
  return (
    <div className={cn("metric-layout-group", `metric-layout-group--${columns}`, className)}>
      {children}
    </div>
  );
}
