import type * as React from "react";
import type { MetricTheme } from "@/widgets/_shared/metric-theme";
import type { MetricSource, MetricSourceType } from "@/widgets/_shared/metric-source";

export type StandardMetricWidgetProps = {
  /** Main card headline. Renders through .metric-card__title. */
  title?: string;

  /** Optional small label above the title. Renders through .metric-card__eyebrow. */
  eyebrow?: string;

  /** Supporting copy below the title. Renders through .metric-card__description. */
  description?: React.ReactNode;

  /** Legacy/simple metric color scope. Prefer sourceType/source for new source-aware widgets. */
  metric?: MetricTheme;

  /** Explicit source category used by lookup/source-aware widgets. */
  sourceType?: MetricSourceType;

  /** Explicit source value within the selected sourceType. */
  source?: MetricSource;

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
      { label: "Positive", value: "indicator-positive", cssVar: "--color-indicator-positive-normal", inverseVar: "--color-indicator-positive-inverse", varianceVar: "--color-indicator-positive-var" },
      { label: "Negative", value: "indicator-negative", cssVar: "--color-indicator-negative-normal", inverseVar: "--color-indicator-negative-inverse", varianceVar: "--color-indicator-negative-var" },
      { label: "Total", value: "indicator-total", cssVar: "--color-indicator-total-normal", inverseVar: "--color-indicator-total-inverse", varianceVar: "--color-indicator-total-var" },
    ],
  },
  {
    title: "Segments",
    description: "Hotel production segment tokens used by room night, ADR, revenue, pickup, and mix widgets.",
    items: [
      { label: "Transient", value: "segment-transient", cssVar: "--color-segment-transient-normal", inverseVar: "--color-segment-transient-inverse", varianceVar: "--color-segment-transient-var" },
      { label: "Group", value: "segment-group", cssVar: "--color-segment-group-normal", inverseVar: "--color-segment-group-inverse", varianceVar: "--color-segment-group-var" },
      { label: "Crew", value: "segment-crew", cssVar: "--color-segment-crew-normal", inverseVar: "--color-segment-crew-inverse", varianceVar: "--color-segment-crew-var" },
      { label: "Complimentary", value: "segment-complimentary", cssVar: "--color-segment-complimentary-normal", inverseVar: "--color-segment-complimentary-inverse", varianceVar: "--color-segment-complimentary-var" },
      { label: "Other", value: "segment-other", cssVar: "--color-segment-other-normal", inverseVar: "--color-segment-other-inverse", varianceVar: "--color-segment-other-var", notes: "Catch-all production segment outside transient, group, crew, and comp." },
    ],
  },
  {
    title: "Channels",
    description: "OTA and booking channel tokens used for channel bars, icons, rankings, and source breakdowns.",
    items: [
      { label: "Expedia", value: "channel-expedia", cssVar: "--color-channel-expedia-normal", inverseVar: "--color-channel-expedia-inverse", varianceVar: "--color-channel-expedia-var" },
      { label: "Booking", value: "channel-booking", cssVar: "--color-channel-booking-normal", inverseVar: "--color-channel-booking-inverse", varianceVar: "--color-channel-booking-var" },
      { label: "Agoda", value: "channel-agoda", cssVar: "--color-channel-agoda-normal", inverseVar: "--color-channel-agoda-inverse", varianceVar: "--color-channel-agoda-var" },
      { label: "Priceline", value: "channel-priceline", cssVar: "--color-channel-priceline-normal", inverseVar: "--color-channel-priceline-inverse", varianceVar: "--color-channel-priceline-var" },
      { label: "Hotelbeds", value: "channel-hotelbeds", cssVar: "--color-channel-hotelbeds-normal", inverseVar: "--color-channel-hotelbeds-inverse", varianceVar: "--color-channel-hotelbeds-var" },
      { label: "Hopper", value: "channel-hopper", cssVar: "--color-channel-hopper-normal", inverseVar: "--color-channel-hopper-inverse", varianceVar: "--color-channel-hopper-var" },
      { label: "Hotwire", value: "channel-hotwire", cssVar: "--color-channel-hotwire-normal", inverseVar: "--color-channel-hotwire-inverse", varianceVar: "--color-channel-hotwire-var" },
      { label: "Airbnb", value: "channel-airbnb", cssVar: "--color-channel-airbnb-normal", inverseVar: "--color-channel-airbnb-inverse", varianceVar: "--color-channel-airbnb-var" },
    ],
  },
  {
    title: "Socials",
    description: "Social network tokens used by dashboard, content, campaign, and audience widgets.",
    items: [
      { label: "Facebook", value: "social-facebook", cssVar: "--color-social-facebook-normal", inverseVar: "--color-social-facebook-inverse", varianceVar: "--color-social-facebook-var" },
      { label: "Instagram", value: "social-instagram", cssVar: "--color-social-instagram-normal", inverseVar: "--color-social-instagram-inverse", varianceVar: "--color-social-instagram-var" },
      { label: "X", value: "social-x", cssVar: "--color-social-x-normal", inverseVar: "--color-social-x-inverse", varianceVar: "--color-social-x-var" },
      { label: "LinkedIn", value: "social-linkedin", cssVar: "--color-social-linkedin-normal", inverseVar: "--color-social-linkedin-inverse", varianceVar: "--color-social-linkedin-var" },
      { label: "TikTok", value: "social-tiktok", cssVar: "--color-social-tiktok-normal", inverseVar: "--color-social-tiktok-inverse", varianceVar: "--color-social-tiktok-var" },
      { label: "Blog", value: "social-blog", cssVar: "--color-social-blog-normal", inverseVar: "--color-social-blog-inverse", varianceVar: "--color-social-blog-var" },
      { label: "Telegram", value: "social-telegram", cssVar: "--color-social-telegram-normal", inverseVar: "--color-social-telegram-inverse", varianceVar: "--color-social-telegram-var" },
      { label: "Slack", value: "social-slack", cssVar: "--color-social-slack-normal", inverseVar: "--color-social-slack-inverse", varianceVar: "--color-social-slack-var" },
      { label: "YouTube", value: "social-youtube", cssVar: "--color-social-youtube-normal", inverseVar: "--color-social-youtube-inverse", varianceVar: "--color-social-youtube-var" },
      { label: "Pinterest", value: "social-pinterest", cssVar: "--color-social-pinterest-normal", inverseVar: "--color-social-pinterest-inverse", varianceVar: "--color-social-pinterest-var" },
      { label: "GitHub", value: "social-github", cssVar: "--color-social-github-normal", inverseVar: "--color-social-github-inverse", varianceVar: "--color-social-github-var" },
    ],
  },
  {
    title: "Review Sites",
    description: "Review and reputation source tokens used for ratings, sentiment, response, and review-mix widgets.",
    items: [
      { label: "Yelp", value: "review-yelp", cssVar: "--color-review-yelp-normal", inverseVar: "--color-review-yelp-inverse", varianceVar: "--color-review-yelp-var" },
      { label: "Tripadvisor", value: "review-tripadvisor", cssVar: "--color-review-tripadvisor-normal", inverseVar: "--color-review-tripadvisor-inverse", varianceVar: "--color-review-tripadvisor-var" },
      { label: "Expedia", value: "review-expedia", cssVar: "--color-review-expedia-normal", inverseVar: "--color-review-expedia-inverse", varianceVar: "--color-review-expedia-var" },
      { label: "Booking", value: "review-booking", cssVar: "--color-review-booking-normal", inverseVar: "--color-review-booking-inverse", varianceVar: "--color-review-booking-var" },
    ],
  },
  {
    title: "Room Types",
    description: "Property-specific room type names/codes should map into four generic visual buckets through lookup logic.",
    items: [
      { label: "Room Type 1", value: "room-type-room-type-1", cssVar: "--color-room-type-room-type-1-normal", inverseVar: "--color-room-type-room-type-1-inverse", varianceVar: "--color-room-type-room-type-1-var", notes: "Highest ranked room type in the selected lookup scope." },
      { label: "Room Type 2", value: "room-type-room-type-2", cssVar: "--color-room-type-room-type-2-normal", inverseVar: "--color-room-type-room-type-2-inverse", varianceVar: "--color-room-type-room-type-2-var" },
      { label: "Room Type 3", value: "room-type-room-type-3", cssVar: "--color-room-type-room-type-3-normal", inverseVar: "--color-room-type-room-type-3-inverse", varianceVar: "--color-room-type-room-type-3-var" },
      { label: "Room Type 4", value: "room-type-room-type-4", cssVar: "--color-room-type-room-type-4-normal", inverseVar: "--color-room-type-room-type-4-inverse", varianceVar: "--color-room-type-room-type-4-var", notes: "Fourth bucket and overflow bucket for lower-ranked room types." },
    ],
  },
  {
    title: "Room Categories",
    description: "Standardized category tokens once lookup tables normalize room, suite, studio, villa, residence, accessible, and other categories.",
    items: [
      { label: "Room", value: "room-category-room", cssVar: "--color-room-category-room-normal", inverseVar: "--color-room-category-room-inverse", varianceVar: "--color-room-category-room-var" },
      { label: "Suite", value: "room-category-suite", cssVar: "--color-room-category-suite-normal", inverseVar: "--color-room-category-suite-inverse", varianceVar: "--color-room-category-suite-var" },
      { label: "Studio", value: "room-category-studio", cssVar: "--color-room-category-studio-normal", inverseVar: "--color-room-category-studio-inverse", varianceVar: "--color-room-category-studio-var" },
      { label: "Villa", value: "room-category-villa", cssVar: "--color-room-category-villa-normal", inverseVar: "--color-room-category-villa-inverse", varianceVar: "--color-room-category-villa-var" },
      { label: "Residence", value: "room-category-residence", cssVar: "--color-room-category-residence-normal", inverseVar: "--color-room-category-residence-inverse", varianceVar: "--color-room-category-residence-var" },
      { label: "Accessible", value: "room-category-accessible", cssVar: "--color-room-category-accessible-normal", inverseVar: "--color-room-category-accessible-inverse", varianceVar: "--color-room-category-accessible-var" },
      { label: "Other", value: "room-category-other", cssVar: "--color-room-category-other-normal", inverseVar: "--color-room-category-other-inverse", varianceVar: "--color-room-category-other-var" },
    ],
  },
  {
    title: "Room Classes",
    description: "Standardized class/rank tokens derived from lookup-table logic.",
    items: [
      { label: "Standard", value: "room-class-standard", cssVar: "--color-room-class-standard-normal", inverseVar: "--color-room-class-standard-inverse", varianceVar: "--color-room-class-standard-var" },
      { label: "Deluxe", value: "room-class-deluxe", cssVar: "--color-room-class-deluxe-normal", inverseVar: "--color-room-class-deluxe-inverse", varianceVar: "--color-room-class-deluxe-var" },
      { label: "Premium", value: "room-class-premium", cssVar: "--color-room-class-premium-normal", inverseVar: "--color-room-class-premium-inverse", varianceVar: "--color-room-class-premium-var" },
      { label: "Executive", value: "room-class-executive", cssVar: "--color-room-class-executive-normal", inverseVar: "--color-room-class-executive-inverse", varianceVar: "--color-room-class-executive-var" },
      { label: "Best", value: "room-class-best", cssVar: "--color-room-class-best-normal", inverseVar: "--color-room-class-best-inverse", varianceVar: "--color-room-class-best-var" },
      { label: "Upgrade", value: "room-class-upgrade", cssVar: "--color-room-class-upgrade-normal", inverseVar: "--color-room-class-upgrade-inverse", varianceVar: "--color-room-class-upgrade-var" },
      { label: "Other", value: "room-class-other", cssVar: "--color-room-class-other-normal", inverseVar: "--color-room-class-other-inverse", varianceVar: "--color-room-class-other-var" },
    ],
  },
  {
    title: "Room Features",
    description: "Standardized room feature tokens for mapped feature attributes.",
    items: [
      { label: "None", value: "room-feature-none", cssVar: "--color-room-feature-none-normal", inverseVar: "--color-room-feature-none-inverse", varianceVar: "--color-room-feature-none-var" },
      { label: "View", value: "room-feature-view", cssVar: "--color-room-feature-view-normal", inverseVar: "--color-room-feature-view-inverse", varianceVar: "--color-room-feature-view-var" },
      { label: "Balcony", value: "room-feature-balcony", cssVar: "--color-room-feature-balcony-normal", inverseVar: "--color-room-feature-balcony-inverse", varianceVar: "--color-room-feature-balcony-var" },
      { label: "Corner", value: "room-feature-corner", cssVar: "--color-room-feature-corner-normal", inverseVar: "--color-room-feature-corner-inverse", varianceVar: "--color-room-feature-corner-var" },
      { label: "High Floor", value: "room-feature-high-floor", cssVar: "--color-room-feature-high-floor-normal", inverseVar: "--color-room-feature-high-floor-inverse", varianceVar: "--color-room-feature-high-floor-var" },
      { label: "Low Floor", value: "room-feature-low-floor", cssVar: "--color-room-feature-low-floor-normal", inverseVar: "--color-room-feature-low-floor-inverse", varianceVar: "--color-room-feature-low-floor-var" },
      { label: "Accessible", value: "room-feature-accessible", cssVar: "--color-room-feature-accessible-normal", inverseVar: "--color-room-feature-accessible-inverse", varianceVar: "--color-room-feature-accessible-var" },
      { label: "Other", value: "room-feature-other", cssVar: "--color-room-feature-other-normal", inverseVar: "--color-room-feature-other-inverse", varianceVar: "--color-room-feature-other-var" },
    ],
  },
  {
    title: "Bed Types",
    description: "Standardized bed type tokens after lookup-table normalization.",
    items: [
      { label: "King", value: "bed-type-king", cssVar: "--color-bed-type-king-normal", inverseVar: "--color-bed-type-king-inverse", varianceVar: "--color-bed-type-king-var" },
      { label: "Queen", value: "bed-type-queen", cssVar: "--color-bed-type-queen-normal", inverseVar: "--color-bed-type-queen-inverse", varianceVar: "--color-bed-type-queen-var" },
      { label: "Double", value: "bed-type-double", cssVar: "--color-bed-type-double-normal", inverseVar: "--color-bed-type-double-inverse", varianceVar: "--color-bed-type-double-var" },
      { label: "Twin", value: "bed-type-twin", cssVar: "--color-bed-type-twin-normal", inverseVar: "--color-bed-type-twin-inverse", varianceVar: "--color-bed-type-twin-var" },
      { label: "Multiple", value: "bed-type-multiple", cssVar: "--color-bed-type-multiple-normal", inverseVar: "--color-bed-type-multiple-inverse", varianceVar: "--color-bed-type-multiple-var" },
      { label: "Other", value: "bed-type-other", cssVar: "--color-bed-type-other-normal", inverseVar: "--color-bed-type-other-inverse", varianceVar: "--color-bed-type-other-var" },
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
    description: "Self-contained widget cards with a standard header, description, source theme, and content region.",
    examples: ["MetricCard", "BudgetSnapshotCard", "PageTrafficCard", "ModelComparisonCard", "PerformanceCard"],
  },
  {
    title: "Layouts",
    description: "Section-level patterns for grids, tables, dashboards, and grouped card systems.",
    examples: ["MetricLayoutGroup", "DashboardSection", "OverviewSection", "DailyPickupTable", "CalendarHeatmap"],
  },
  {
    title: "Lookup Sources",
    description: "Mapped lookup-table concepts that can drive source-aware visuals without hardcoding individual property labels.",
    examples: ["Room type buckets", "Room category badges", "Room class charts", "Bed type mix"],
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
    description: "Legacy/simple color scope for existing widgets. Prefer sourceType/source for new source-aware widgets.",
    example: "group",
  },
  {
    name: "sourceType",
    type: "MetricSourceType",
    description: "Explicit token category for source-aware widgets, such as channel, segment, room-type, room-category, room-class, room-feature, or bed-type.",
    example: "room-category",
  },
  {
    name: "source",
    type: "MetricSource",
    description: "Source value within sourceType. Example: sourceType='channel' source='expedia', or sourceType='room-type' source='room-type-1'.",
    example: "suite",
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
    description: "Controls positive, negative, or neutral trend styling. Auto resolves from change first, then value. Up uses --color-indicator-positive-normal / inverse. Down uses --color-indicator-negative-normal / inverse.",
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
    description: "Legacy/simple metric scope. Prefer sourceType/source for lookup-aware variants.",
    example: "transient",
  },
  {
    name: "sourceType / source",
    type: "MetricSourceType / MetricSource",
    description: "Explicit source-aware theme props. Useful for channels, socials, reviews, segments, and lookup-table categories like room-type or bed-type.",
    example: "sourceType='room-type' source='room-type-1'",
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
    example: "--metric-layout-trend-circle-color: var(--color-indicator-positive-normal);",
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
  sourceType = "segment",
  source = "total",
  value = 42500,
  ...cardProps
}: ExampleWidgetProps) {
  return (
    <MetricCard
      title={title}
      description={description}
      sourceType={sourceType}
      source={source}
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
  sourceType="room-type"
  source="room-type-1"
  variant="row"
  size="md"
/>`;

export const roomTypeLookupImplementationExample = `import {
  buildRoomTypeSourceMap,
  getRoomTypeSource,
} from "@/widgets/_shared/metric-source";

const sourceMap = buildRoomTypeSourceMap(roomTypes.map((roomType) => ({
  roomTypeCode: roomType.code,
  roomTypeName: roomType.name,
  rooms: roomType.rooms,
  revenue: roomType.revenue,
})));

const rows = roomTypes.map((roomType) => ({
  ...roomType,
  sourceType: "room-type" as const,
  source: getRoomTypeSource(roomType, sourceMap),
}));`;
