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

export type MetricThemeToken = {
  label: string;
  value: string;
  cssVar: string;
  inverseVar?: string;
  varianceVar?: string;
  notes?: string;
};

export type MetricThemeGroup = {
  title: string;
  description: string;
  items: MetricThemeToken[];
};

export type WidgetUsageGroup = {
  title: string;
  description: string;
  examples: string[];
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

export const metricThemeGroups: MetricThemeGroup[] = [
  {
    title: "Metric Indicators",
    description: "Universal performance indicators used for trend states, totals, and variance accents.",
    items: [
      { label: "Positive", value: "positive", cssVar: "--color-positive", inverseVar: "--color-positive-inverse" },
      { label: "Negative", value: "negative", cssVar: "--color-negative", inverseVar: "--color-negative-inverse" },
      { label: "Total", value: "total", cssVar: "--color-total", inverseVar: "--color-total-inverse", varianceVar: "--color-total-var" },
    ],
  },
  {
    title: "Segments",
    description: "Hotel production segment tokens used by room night, ADR, revenue, pickup, and mix widgets.",
    items: [
      { label: "Transient", value: "transient", cssVar: "--color-transient", inverseVar: "--color-transient-inverse", varianceVar: "--color-transient-var" },
      { label: "Group", value: "group", cssVar: "--color-group", inverseVar: "--color-group-inverse", varianceVar: "--color-group-var" },
      { label: "Crew", value: "crew", cssVar: "--color-crew", inverseVar: "--color-crew-inverse", varianceVar: "--color-crew-var" },
      { label: "Complimentary", value: "complimentary", cssVar: "--color-complimentary", inverseVar: "--color-complimentary-inverse", varianceVar: "--color-complimentary-var" },
      { label: "Other", value: "other", cssVar: "--color-other", inverseVar: "--color-other-inverse", varianceVar: "--color-other-var", notes: "Catch-all production segment outside transient, group, crew, and comp." },
    ],
  },
  {
    title: "Channels",
    description: "OTA and booking channel tokens used for channel bars, icons, rankings, and source breakdowns.",
    items: [
      { label: "Expedia", value: "expedia", cssVar: "--color-expedia", inverseVar: "--color-expedia-inverse" },
      { label: "Booking", value: "booking", cssVar: "--color-booking", inverseVar: "--color-booking-inverse" },
      { label: "Agoda", value: "agoda", cssVar: "--color-agoda", inverseVar: "--color-agoda-inverse" },
      { label: "Priceline", value: "priceline", cssVar: "--color-priceline", inverseVar: "--color-priceline-inverse" },
      { label: "Hotelbeds", value: "hotelbeds", cssVar: "--color-hotelbeds", inverseVar: "--color-hotelbeds-inverse" },
      { label: "Hopper", value: "hopper", cssVar: "--color-hopper", inverseVar: "--color-hopper-inverse" },
    ],
  },
  {
    title: "Socials",
    description: "Social network tokens used by dashboard, content, campaign, and audience widgets.",
    items: [
      { label: "Facebook", value: "facebook", cssVar: "--color-facebook", inverseVar: "--color-facebook-inverse" },
      { label: "Instagram", value: "instagram", cssVar: "--color-instagram", inverseVar: "--color-instagram-inverse" },
      { label: "X", value: "x", cssVar: "--color-x", inverseVar: "--color-x-inverse" },
      { label: "LinkedIn", value: "linkedin", cssVar: "--color-linkedin", inverseVar: "--color-linkedin-inverse", notes: "Fallbacks can support the legacy --color-liinkedin token." },
      { label: "TikTok", value: "tiktok", cssVar: "--color-tiktok", inverseVar: "--color-tiktok-inverse" },
      { label: "Blog", value: "blog", cssVar: "--color-blog", inverseVar: "--color-blog-inverse" },
      { label: "Telegram", value: "telegram", cssVar: "--color-telegram", inverseVar: "--color-telegram-inverse" },
      { label: "Slack", value: "slack", cssVar: "--color-slack", inverseVar: "--color-slack-inverse" },
      { label: "YouTube", value: "youtube", cssVar: "--color-youtube", inverseVar: "--color-youtube-inverse" },
      { label: "Pinterest", value: "pinterest", cssVar: "--color-pinterest", inverseVar: "--color-pinterest-inverse" },
      { label: "GitHub", value: "github", cssVar: "--color-github", inverseVar: "--color-github-inverse" },
    ],
  },
  {
    title: "Review Sites",
    description: "Review and reputation source tokens used for ratings, sentiment, response, and review-mix widgets.",
    items: [
      { label: "Yelp", value: "yelp", cssVar: "--color-yelp", inverseVar: "--color-yelp-inverse" },
      { label: "Tripadvisor", value: "tripadvisor", cssVar: "--color-tripadvisor", inverseVar: "--color-tripadvisor-inverse" },
      { label: "Expedia", value: "expedia-review", cssVar: "--color-expedia", inverseVar: "--color-expedia-inverse" },
      { label: "Booking", value: "booking-review", cssVar: "--color-booking", inverseVar: "--color-booking-inverse" },
    ],
  },
];

export const widgetUsageGroups: WidgetUsageGroup[] = [
  {
    title: "Elements",
    description: "Small reusable primitives that can be placed inside any card or custom layout.",
    examples: ["MetricLayout", "MetricCardTitle", "MetricCardDescription", "MetricCardValue", "MetricCardLabel", "MetricInsight"],
  },
  {
    title: "Cards",
    description: "Self-contained widget cards with a standard header, description, metric theme, and content region.",
    examples: ["MetricCard", "BudgetSnapshotCard", "PageTrafficCard", "ModelComparisonCard", "PerformanceCard"],
  },
  {
    title: "Layouts",
    description: "Section-level patterns for grids, tables, dashboards, and grouped card systems.",
    examples: ["MetricLayoutGroup", "DashboardSection", "OverviewSection", "DailyPickupTable", "CalendarHeatmap"],
  },
];

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
    description: "Variance or comparison value displayed with the metric. When trend is auto, this value is used first to resolve positive or negative styling.",
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
    type: "auto | up | down | neutral",
    defaultValue: "auto",
    description: "Controls positive, negative, or neutral trend styling. Auto resolves from change first, then value. Up uses --color-positive / --color-positive-inverse. Down uses --color-negative / --color-negative-inverse.",
    example: "auto",
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
    description: "Visibility toggles for variance value, variance label, and the two-tone trend icon.",
    example: "false",
  },
  {
    name: "iconTrendSlot",
    type: "React.ReactNode",
    description: "Optional custom trend icon. If omitted, MetricLayout uses the native two-tone Rebel arrow-circle icon. Circle fill uses positive/negative color; arrow fill uses positive/negative inverse color.",
    example: "<CustomTrendIcon />",
  },
  {
    name: "Trend icon CSS variables",
    type: "CSS Custom Properties",
    description: "The default icon exposes --metric-layout-trend-circle-color and --metric-layout-trend-arrow-color. These resolve automatically from data-trend.",
    example: "--metric-layout-trend-circle-color: var(--color-positive);",
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
  change="4.2%"
  changeLabel="STLY"
  trend="auto"
  metric="transient"
  variant="row"
  size="md"
/>`;
