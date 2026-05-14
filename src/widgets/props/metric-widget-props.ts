import type * as React from "react";
import type { MetricTheme } from "@/widgets/_shared/metric-theme";

export type StandardMetricWidgetProps = {
  /** Main card headline. Renders through .metric-card__title. */
  title?: string;

  /** Optional small label above the title. Renders through .metric-card__eyebrow. */
  eyebrow?: string;

  /** Supporting copy below the title. Renders through .metric-card__description. */
  description?: React.ReactNode;

  /** Applies a predefined metric color scope to the card. */
  metric?: MetricTheme;

  /** Optional class on the outer MetricCard shell. */
  className?: string;

  /** Optional class on the MetricCard content/body area. */
  contentClassName?: string;

  /** Optional right-side header control, icon, menu, badge, or action. */
  headerAction?: React.ReactNode;
};

export type MetricTabOption<TValue extends string = string> = {
  label: React.ReactNode;
  value: TValue;
};

export type StandardMetricTabsProps<TValue extends string = string> = {
  tabs?: MetricTabOption<TValue>[];
  value?: TValue;
  defaultValue?: TValue;
  onValueChange?: (value: TValue) => void;
};

export type MetricWidgetPropDefinition = {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  example?: string;
};

export const metricThemeOptions = [
  "positive",
  "negative",
  "total",
  "transient",
  "group",
  "crew",
  "complimentary",
  "other",
] as const;

export const standardMetricWidgetPropDefinitions: MetricWidgetPropDefinition[] = [
  {
    name: "title",
    type: "string",
    description: "Primary card headline. Should always render through the metric-card title style.",
    example: "Budget Breakdown",
  },
  {
    name: "eyebrow",
    type: "string",
    description: "Optional small uppercase label above the headline. Useful for timeframe, source, or category.",
    example: "Rooms Revenue",
  },
  {
    name: "description",
    type: "React.ReactNode",
    description: "Optional explanatory copy directly beneath the headline.",
    example: "Spend distribution across production segments.",
  },
  {
    name: "metric",
    type: "MetricTheme",
    defaultValue: "total",
    description: "Controls the metric color scope for icons, accents, charts, progress bars, and related values.",
    example: "group",
  },
  {
    name: "className",
    type: "string",
    description: "Optional class applied to the outer card shell for layout-specific sizing or overflow behavior.",
    example: "xl:col-span-2 overflow-hidden",
  },
  {
    name: "contentClassName",
    type: "string",
    description: "Optional class applied to the card content area when a widget needs custom spacing or layout.",
    example: "gap-6",
  },
  {
    name: "headerAction",
    type: "React.ReactNode",
    description: "Optional right-aligned header control such as an overflow menu, icon, badge, or compact action.",
    example: "<MoreVertical className=\"size-5\" />",
  },
  {
    name: "tabs",
    type: "MetricTabOption[]",
    description: "Optional tabs rendered through MetricCardTabs for consistent metric-card tab styling.",
    example: "[{ label: 'Budget', value: 'budget' }]",
  },
  {
    name: "value / defaultValue / onValueChange",
    type: "string / function",
    description: "Controlled or uncontrolled tab state props for widgets that expose tabs.",
    example: "value={activeView} onValueChange={setActiveView}",
  },
];

export const metricLayoutPropDefinitions: MetricWidgetPropDefinition[] = [
  {
    name: "label",
    type: "React.ReactNode",
    description: "Primary metric label, such as ADR, REV, Rooms, Occupancy, or Metric.",
    example: "ADR",
  },
  {
    name: "value",
    type: "React.ReactNode",
    description: "Main metric value. Can be a formatted string, number, or custom rendered node.",
    example: "$362.47",
  },
  {
    name: "change",
    type: "React.ReactNode",
    description: "Variance or comparison value displayed with the metric.",
    example: "0.0%",
  },
  {
    name: "changeLabel / varianceLabel",
    type: "React.ReactNode",
    description: "Comparison label displayed next to the variance value.",
    example: "STLY",
  },
  {
    name: "trend",
    type: "up | down | neutral",
    defaultValue: "neutral",
    description: "Controls positive, negative, or neutral trend styling and default trend icon direction.",
    example: "up",
  },
  {
    name: "variant / layoutVariant",
    type: "stack | split | row | inline | hero | compact | tile",
    defaultValue: "stack",
    description: "Controls whether the metric renders stacked, horizontal, split-column, compact, or hero style.",
    example: "row",
  },
  {
    name: "size",
    type: "xs | sm | base | md | lg | xl | xxl",
    defaultValue: "md",
    description: "Scales label, value, variance, and trend icon sizing together.",
    example: "lg",
  },
  {
    name: "metric",
    type: "MetricTheme",
    defaultValue: "total",
    description: "Applies the same metric color scope used by MetricCard.",
    example: "transient",
  },
  {
    name: "metricFormat / varianceFormat",
    type: "base | percent | currency | integer | compactCurrency",
    description: "Optional formatting helpers for numeric metric and variance values.",
    example: "currency",
  },
  {
    name: "varianceVisibility / varianceLabelVisibility / iconTrendVisibility",
    type: "boolean",
    defaultValue: "true",
    description: "Visibility toggles for variance value, variance label, and trend icon.",
    example: "false",
  },
  {
    name: "suffix / iconTrendSlot",
    type: "React.ReactNode",
    description: "Optional custom trend icon or node displayed next to the metric value.",
    example: "<TrendDot />",
  },
];

export const metricWidgetImplementationExample = `import type { StandardMetricWidgetProps } from "@/widgets/props";
import { MetricCard } from "@/widgets/_shared/MetricCard";

export type ExampleWidgetProps = StandardMetricWidgetProps & {
  value?: number;
};

export function ExampleWidget({
  title = "Revenue Snapshot",
  description = "Revenue performance against selected comparison period.",
  metric = "total",
  value = 42500,
  ...cardProps
}: ExampleWidgetProps) {
  return (
    <MetricCard
      title={title}
      description={description}
      metric={metric}
      {...cardProps}
    >
      <div className="metric-card__value">
        {value.toLocaleString()}
      </div>
    </MetricCard>
  );
}`;

export const metricLayoutImplementationExample = `import { MetricLayout } from "@/widgets/_shared/MetricCard";

<MetricLayout
  label="ADR"
  value="$362.47"
  change="0.0%"
  changeLabel="STLY"
  trend="up"
  metric="transient"
  variant="row"
  size="md"
/>`;
