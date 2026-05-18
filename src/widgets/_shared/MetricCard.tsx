"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { MetricCardShell } from "./MetricCardShell";
import type { MetricTheme } from "./metric-theme";

export { MetricCardShell };
export { MetricLayout, MetricLayoutGroup } from "./MetricLayout";
export type {
  MetricLayoutAlign,
  MetricLayoutProps,
  MetricLayoutSize,
  MetricLayoutVariant,
  MetricTrend,
  MetricLayoutGroupProps,
} from "./MetricLayout";

type MetricCardProps = React.ComponentProps<typeof MetricCardShell>;

/**
 * Primary card component for metric widgets.
 * This wraps the shadcn Card and applies the standard metric-card styles,
 * including background, shadow, spacing, responsive width, and metric theme class.
 */
export function MetricCard(props: MetricCardProps) {
  return <MetricCardShell {...props} />;
}

/**
 * Backward-compatible alias while older widgets migrate from MetricCardRoot.
 */
export function MetricCardRoot(props: MetricCardProps) {
  return <MetricCardShell {...props} />;
}

type MetricCardTitleProps = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  as?: "h2" | "h3" | "h4" | "div" | "p";
  className?: string;
};

export function MetricCardTitle({
  title,
  children,
  as: Component = "h3",
  className,
}: MetricCardTitleProps) {
  const content = children ?? title;

  if (!content) return null;

  return <Component className={cn("metric-card__title", className)}>{content}</Component>;
}

type MetricCardDescriptionProps = {
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export function MetricCardDescription({
  description,
  children,
  className,
}: MetricCardDescriptionProps) {
  const content = children ?? description;

  if (!content) return null;

  return <p className={cn("metric-card__description", className)}>{content}</p>;
}

type MetricCardTabsOption<TValue extends string = string> = {
  label: React.ReactNode;
  value: TValue;
};

type MetricCardTabsProps<TValue extends string = string> = {
  tabs: MetricCardTabsOption<TValue>[];
  value?: TValue;
  defaultValue?: TValue;
  onValueChange?: (value: TValue) => void;
  className?: string;
  listClassName?: string;
};

export function MetricCardTabs<TValue extends string = string>({
  tabs,
  value,
  defaultValue,
  onValueChange,
  className,
  listClassName,
}: MetricCardTabsProps<TValue>) {
  return (
    <Tabs
      value={value}
      defaultValue={defaultValue}
      className={cn("metric-card-tabs-root", className)}
      onValueChange={(nextValue) => onValueChange?.(nextValue as TValue)}
    >
      <TabsList className={cn("metric-card-tabs", listClassName)}>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="metric-card-tab">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

type MetricInsightProps = {
  label?: React.ReactNode;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

export function MetricInsight({
  label = "Insight:",
  children,
  icon,
  className,
}: MetricInsightProps) {
  return (
    <div className={cn("metric-card__insight", className)}>
      <span className="metric-card__insight-icon" aria-hidden="true">
        {icon ?? <Info className="h-4 w-4" />}
      </span>
      <p className="metric-card__insight-copy">
        {label && <strong className="metric-card__insight-label">{label}</strong>} {children}
      </p>
    </div>
  );
}

type MetricCardSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export function MetricCardSection({ children, className }: MetricCardSectionProps) {
  return <div className={cn("metric-card__section", className)}>{children}</div>;
}

type MetricCardValueProps = {
  children: React.ReactNode;
  className?: string;
};

export function MetricCardValue({ children, className }: MetricCardValueProps) {
  return <div className={cn("metric-card__value", className)}>{children}</div>;
}

type MetricCardLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function MetricCardLabel({ children, className }: MetricCardLabelProps) {
  return <div className={cn("metric-card__label", className)}>{children}</div>;
}

type MetricCardColorScopeProps = {
  metric: MetricTheme;
  children: React.ReactNode;
  className?: string;
};

export function MetricCardColorScope({ metric, children, className }: MetricCardColorScopeProps) {
  return <div className={cn(`metric-card--${metric}`, className)}>{children}</div>;
}
