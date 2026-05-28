export type MetricSourceType = "indicator" | "segment" | "channel" | "social" | "review";

export type IndicatorSource = "positive" | "negative" | "total";

export type SegmentSource =
  | "total"
  | "transient"
  | "group"
  | "crew"
  | "complimentary"
  | "other";

export type ChannelSource =
  | "expedia"
  | "booking"
  | "agoda"
  | "hopper"
  | "hoteltonight"
  | "hotelbeds"
  | "priceline"
  | "airbnb"
  | "hotwire";

export type SocialSource =
  | "facebook"
  | "instagram"
  | "x"
  | "linkedin"
  | "tiktok"
  | "blog"
  | "telegram"
  | "slack"
  | "youtube"
  | "pinterest"
  | "github";

export type ReviewSource = "yelp" | "tripadvisor" | "expedia" | "booking";

export type MetricSource = IndicatorSource | SegmentSource | ChannelSource | SocialSource | ReviewSource;

export type MetricSourceProps = {
  sourceType?: MetricSourceType;
  source?: MetricSource;
};

export function getMetricSourceClass(sourceType?: MetricSourceType, source?: MetricSource) {
  if (!sourceType || !source) return undefined;
  return `metric-source metric-source--${sourceType}-${source}`;
}

export function getMetricSourceDataAttributes(sourceType?: MetricSourceType, source?: MetricSource) {
  if (!sourceType || !source) return {};

  return {
    "data-source-type": sourceType,
    "data-source": source,
  };
}

export function getSourceTypeForLegacyMetric(metric?: string): MetricSourceType | undefined {
  if (!metric) return undefined;
  if (["positive", "negative"].includes(metric)) return "indicator";
  if (["total", "transient", "group", "crew", "complimentary", "other"].includes(metric)) return "segment";
  if (["facebook", "instagram", "x", "linkedin", "tiktok", "blog", "telegram", "slack", "youtube", "pinterest", "github"].includes(metric)) return "social";
  if (["yelp", "tripadvisor"].includes(metric)) return "review";
  return undefined;
}
