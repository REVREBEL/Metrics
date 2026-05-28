"use client";

import type { ComponentProps, ComponentType } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  BarChart3,
  Clock,
  Eye,
  Globe,
  MessageCircle,
  Target,
} from "lucide-react";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  MetricCard,
  MetricCardLabel,
  MetricCardTitle,
  MetricInsight,
} from "@/widgets/_shared/MetricCard";

type SocialKey = "facebook" | "instagram" | "x" | "linkedin" | "tiktok" | "blog";

type SummaryMetric = {
  title: string;
  value: string;
  change: string;
  icon: ComponentType<ComponentProps<"svg">>;
  social: SocialKey;
};

export interface AnalyticsSectionProps {
  metrics?: SummaryMetric[];
  followerGrowth?: { month: string; Facebook: number; Instagram: number; TikTok: number }[];
  engagementRates?: { platform: string; rate: number; social: SocialKey }[];
  reachDistribution?: { name: string; value: number; social: SocialKey }[];
  audienceDemographics?: { range: string; share: number }[];
}

const defaultMetrics: SummaryMetric[] = [
  { title: "Total Reach", value: "556K", change: "+8.2% from last month", icon: Eye, social: "facebook" },
  { title: "Impressions", value: "2.4M", change: "+15.3% from last month", icon: BarChart3, social: "instagram" },
  { title: "Engagement", value: "21.5K", change: "+12.7% from last month", icon: MessageCircle, social: "tiktok" },
  { title: "Conversion Rate", value: "3.8%", change: "+0.5% from last month", icon: Target, social: "linkedin" },
];

const defaultFollowerGrowth = [
  { month: "Jan", Facebook: 42000, Instagram: 58000, TikTok: 120000 },
  { month: "Feb", Facebook: 43200, Instagram: 61000, TikTok: 135000 },
  { month: "Mar", Facebook: 44100, Instagram: 63500, TikTok: 145000 },
  { month: "Apr", Facebook: 44800, Instagram: 65200, TikTok: 150000 },
  { month: "May", Facebook: 45000, Instagram: 66800, TikTok: 155000 },
  { month: "Jun", Facebook: 45200, Instagram: 67800, TikTok: 156700 },
];

const defaultEngagementRates = [
  { platform: "Facebook", rate: 3.8, social: "facebook" },
  { platform: "Instagram", rate: 5.2, social: "instagram" },
  { platform: "X", rate: 2.9, social: "x" },
  { platform: "LinkedIn", rate: 4.1, social: "linkedin" },
  { platform: "TikTok", rate: 8.7, social: "tiktok" },
] satisfies { platform: string; rate: number; social: SocialKey }[];

const defaultReachDistribution = [
  { name: "Organic", value: 320000, social: "facebook" },
  { name: "Paid", value: 180000, social: "instagram" },
  { name: "Viral", value: 44000, social: "tiktok" },
  { name: "Other", value: 12000, social: "blog" },
] satisfies { name: string; value: number; social: SocialKey }[];

const defaultAudienceDemographics = [
  { range: "18-24", share: 25 },
  { range: "25-34", share: 35 },
  { range: "35-44", share: 22 },
  { range: "45-54", share: 12 },
  { range: "55+", share: 6 },
];

const topCountries = [
  { country: "United States", percentage: 45, followers: "137.3K", social: "facebook" },
  { country: "United Kingdom", percentage: 18, followers: "54.9K", social: "instagram" },
  { country: "Canada", percentage: 12, followers: "36.6K", social: "linkedin" },
  { country: "Australia", percentage: 8, followers: "24.4K", social: "tiktok" },
  { country: "Germany", percentage: 6, followers: "18.3K", social: "blog" },
] satisfies Array<{ country: string; percentage: number; followers: string; social: SocialKey }>;

const peakTimes = [
  { time: "9:00 AM - 11:00 AM", platform: "LinkedIn", engagement: "High", social: "linkedin" },
  { time: "12:00 PM - 2:00 PM", platform: "Facebook", engagement: "Medium", social: "facebook" },
  { time: "6:00 PM - 8:00 PM", platform: "Instagram", engagement: "Very High", social: "instagram" },
  { time: "8:00 PM - 10:00 PM", platform: "TikTok", engagement: "High", social: "tiktok" },
] satisfies Array<{ time: string; platform: string; engagement: string; social: SocialKey }>;

const growthConfig: ChartConfig = {
  Facebook: { label: "Facebook", color: "var(--color-facebook)" },
  Instagram: { label: "Instagram", color: "var(--color-instagram)" },
  TikTok: { label: "TikTok", color: "var(--color-tiktok)" },
};

const getSocialColor = (social: SocialKey) => `var(--color-${social === "linkedin" ? "linkedin" : social}, var(--metric-color))`;

export default function AnalyticsSection({
  metrics = defaultMetrics,
  followerGrowth = defaultFollowerGrowth,
  engagementRates = defaultEngagementRates,
  reachDistribution = defaultReachDistribution,
  audienceDemographics = defaultAudienceDemographics,
}: AnalyticsSectionProps) {
  const totalReach = reachDistribution.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="analytics-section">
      <div className="analytics-section__header">
        <MetricCardTitle as="h2">Analytics &amp; Insights</MetricCardTitle>
        <p className="metric-card__description">
          A reusable analytics view for social channel performance.
        </p>
      </div>

      <div className="analytics-section__summary-grid">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.title}
              className="analytics-section__summary-card"
              data-social={metric.social}
            >
              <div>
                <div className="analytics-section__summary-label">{metric.title}</div>
                <div className="analytics-section__summary-value">{metric.value}</div>
                <div className="analytics-section__summary-change">{metric.change}</div>
              </div>
              <span className="analytics-section__summary-icon" aria-hidden="true">
                <Icon className="size-5" />
              </span>
            </div>
          );
        })}
      </div>

      <div className="analytics-section__chart-grid">
        <MetricCard
          title="Follower Growth Trends"
          description="Platform-specific growth over six months."
          metric="total"
          className="analytics-section__chart-card"
        >
          <ChartContainer config={growthConfig} className="h-72 w-full">
            <LineChart data={followerGrowth} margin={{ top: 12, right: 12, left: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line dataKey="Facebook" type="monotone" stroke="var(--color-Facebook)" strokeWidth={3} dot={false} />
              <Line dataKey="Instagram" type="monotone" stroke="var(--color-Instagram)" strokeWidth={3} dot={false} />
              <Line dataKey="TikTok" type="monotone" stroke="var(--color-TikTok)" strokeWidth={3} dot={false} />
            </LineChart>
          </ChartContainer>
          <MetricInsight className="analytics-section__chart-footer">
            TikTok is driving the fastest audience growth while Instagram continues to compound steadily.
          </MetricInsight>
        </MetricCard>

        <MetricCard
          title="Platform Engagement Rates"
          description="Relative engagement rate by channel."
          metric="total"
          className="analytics-section__chart-card"
        >
          <ChartContainer config={{ rate: { label: "Rate" } }} className="h-72 w-full">
            <BarChart data={engagementRates} margin={{ top: 12, right: 12, left: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="platform" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="rate" radius={[2, 2, 0, 0]}>
                {engagementRates.map((entry) => (
                  <Cell key={entry.platform} fill={getSocialColor(entry.social)} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </MetricCard>

        <MetricCard
          title="Reach Distribution"
          description="How your visibility is being generated."
          metric="total"
          className="analytics-section__chart-card"
        >
          <ChartContainer config={{ reach: { label: "Reach" } }} className="h-72 w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
              <Pie data={reachDistribution} dataKey="value" nameKey="name" innerRadius={56} outerRadius={90} paddingAngle={4}>
                {reachDistribution.map((entry) => (
                  <Cell key={entry.name} fill={getSocialColor(entry.social)} />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="metric-card__value fill-(--primary-b000) text-2xl">
                            {(totalReach / 1000).toFixed(0)}K
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 20} className="metric-card__label fill-(--muted-foreground)">
                            Reach
                          </tspan>
                        </text>
                      );
                    }

                    return null;
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </MetricCard>

        <MetricCard
          title="Audience Demographics"
          description="Share of audience by age range."
          metric="total"
          className="analytics-section__chart-card"
        >
          <ChartContainer config={{ share: { label: "Share", color: "var(--color-blog)" } }} className="h-72 w-full">
            <BarChart data={audienceDemographics} margin={{ top: 12, right: 12, left: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="range" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="share" fill="var(--color-share)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </MetricCard>
      </div>

      <div className="analytics-section__chart-grid">
        <MetricCard
          title="Top Performing Countries"
          description="Audience share and follower contribution by geography."
          metric="total"
          className="analytics-section__list-card"
          headerAction={<Globe className="size-5 text-(--primary-b000)" />}
        >
          <div className="analytics-section__list">
            {topCountries.map((item) => (
              <div key={item.country} className="analytics-section__country-row" data-social={item.social}>
                <div>
                  <div className="analytics-section__country-name">{item.country}</div>
                  <div className="analytics-section__country-meta">{item.followers} followers</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="analytics-section__country-bar">
                    <div className="analytics-section__country-bar-fill" style={{ width: `${item.percentage}%` }} />
                  </div>
                  <span className="analytics-section__country-value">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </MetricCard>

        <MetricCard
          title="Peak Engagement Times"
          description="Best-performing posting windows by platform."
          metric="total"
          className="analytics-section__list-card"
          headerAction={<Clock className="size-5 text-(--primary-b000)" />}
        >
          <div className="analytics-section__list">
            {peakTimes.map((item) => (
              <div key={`${item.time}-${item.platform}`} className="analytics-section__time-row" data-social={item.social}>
                <div>
                  <div className="analytics-section__time-main">{item.time}</div>
                  <div className="analytics-section__time-meta">{item.platform}</div>
                </div>
                <span className="analytics-section__pill">{item.engagement}</span>
              </div>
            ))}
          </div>
        </MetricCard>
      </div>
    </section>
  );
}
