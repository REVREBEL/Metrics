export type ProductionSegment =
  | "total"
  | "transient"
  | "group"
  | "crew"
  | "complimentary"
  | "other";

export type SocialMetric =
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

export type ReviewMetric =
  | "yelp"
  | "tripadvisor"
  | "expedia"
  | "booking";

export type MetricTheme = ProductionSegment | SocialMetric | ReviewMetric;

export const productionSegmentLabels = {
  total: "Total",
  transient: "Transient",
  group: "Group",
  crew: "Crew",
  complimentary: "Complimentary",
  other: "Other",
} satisfies Record<ProductionSegment, string>;

export const socialMetricLabels = {
  facebook: "Facebook",
  instagram: "Instagram",
  x: "X",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  blog: "Blog",
  telegram: "Telegram",
  slack: "Slack",
  youtube: "YouTube",
  pinterest: "Pinterest",
  github: "GitHub",
} satisfies Record<SocialMetric, string>;

export const reviewMetricLabels = {
  yelp: "Yelp",
  tripadvisor: "Tripadvisor",
  expedia: "Expedia",
  booking: "Booking",
} satisfies Record<ReviewMetric, string>;

export function getMetricThemeClass(metric: MetricTheme = "total") {
  return `metric-card--${metric}`;
}
