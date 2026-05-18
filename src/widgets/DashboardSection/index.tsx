"use client";

import type { ComponentProps, ComponentType } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  DollarSign,
  Eye,
  Heart,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { MetricCard } from "@/widgets/_shared/MetricCard";

type SocialKey = "facebook" | "instagram" | "x" | "linkedin" | "tiktok" | "blog";

type SummaryMetric = {
  title: string;
  value: string;
  change: string;
  icon: ComponentType<ComponentProps<"svg">>;
  social: SocialKey;
};

type PlatformMetric = {
  platform: string;
  followers: string;
  engagement: string;
  reach: string;
  social: SocialKey;
};

type TopPost = {
  platform: string;
  content: string;
  engagement: string;
  social: SocialKey;
};

export interface DashboardSectionProps {
  summaryMetrics?: SummaryMetric[];
  platformPosts?: { platform: string; posts: number; social: SocialKey }[];
  engagementMix?: { name: string; value: number; social: SocialKey }[];
  weeklyTrends?: { week: string; followers: number; impressions: number }[];
  platformMetrics?: PlatformMetric[];
  topPosts?: TopPost[];
}

const defaultSummaryMetrics: SummaryMetric[] = [
  { title: "Total Followers", value: "305.2K", change: "+12.3% from last month", icon: Users, social: "facebook" },
  { title: "Total Reach", value: "544K", change: "+8.7% from last month", icon: Eye, social: "instagram" },
  { title: "Engagement Rate", value: "4.8%", change: "+0.3% from last month", icon: Heart, social: "tiktok" },
  { title: "ROI", value: "3.2x", change: "+0.4x from last month", icon: DollarSign, social: "linkedin" },
];

const defaultPlatformPosts = [
  { platform: "Facebook", posts: 15, social: "facebook" },
  { platform: "Instagram", posts: 22, social: "instagram" },
  { platform: "X", posts: 18, social: "x" },
  { platform: "LinkedIn", posts: 8, social: "linkedin" },
  { platform: "TikTok", posts: 12, social: "tiktok" },
] satisfies { platform: string; posts: number; social: SocialKey }[];

const defaultEngagementMix = [
  { name: "Likes", value: 15420, social: "instagram" },
  { name: "Comments", value: 3280, social: "blog" },
  { name: "Shares", value: 1950, social: "tiktok" },
  { name: "Saves", value: 870, social: "linkedin" },
] satisfies { name: string; value: number; social: SocialKey }[];

const defaultWeeklyTrends = [
  { week: "Week 1", followers: 1250, impressions: 245 },
  { week: "Week 2", followers: 1890, impressions: 289 },
  { week: "Week 3", followers: 2340, impressions: 334 },
  { week: "Week 4", followers: 2890, impressions: 398 },
];

const defaultPlatformMetrics: PlatformMetric[] = [
  { platform: "Facebook", followers: "45.2K", engagement: "3.8%", reach: "120K", social: "facebook" },
  { platform: "Instagram", followers: "67.8K", engagement: "5.2%", reach: "89K", social: "instagram" },
  { platform: "X", followers: "23.1K", engagement: "2.9%", reach: "67K", social: "x" },
  { platform: "LinkedIn", followers: "12.4K", engagement: "4.1%", reach: "34K", social: "linkedin" },
  { platform: "TikTok", followers: "156.7K", engagement: "8.7%", reach: "234K", social: "tiktok" },
];

const defaultTopPosts: TopPost[] = [
  { platform: "Instagram", content: "Summer collection launch", engagement: "2.3K", social: "instagram" },
  { platform: "TikTok", content: "Behind the scenes video", engagement: "5.7K", social: "tiktok" },
  { platform: "Facebook", content: "Customer testimonial feature", engagement: "1.8K", social: "facebook" },
];

const platformPostsConfig: ChartConfig = {
  posts: { label: "Posts" },
};

const trendConfig: ChartConfig = {
  followers: { label: "Followers", color: "var(--color-positive)" },
  impressions: { label: "Impressions", color: "var(--color-total)" },
};

function getSocialColor(social: SocialKey) {
  return `var(--color-${social}, var(--foreground))`;
}

export default function DashboardSection({
  summaryMetrics = defaultSummaryMetrics,
  platformPosts = defaultPlatformPosts,
  engagementMix = defaultEngagementMix,
  weeklyTrends = defaultWeeklyTrends,
  platformMetrics = defaultPlatformMetrics,
  topPosts = defaultTopPosts,
}: DashboardSectionProps) {
  return (
    <section className="dashboard-section">
      <div className="dashboard-section__summary-grid">
        {summaryMetrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div key={metric.title} className="dashboard-section__summary-card" data-social={metric.social}>
              <div>
                <div className="dashboard-section__summary-label">{metric.title}</div>
                <div className="dashboard-section__summary-value">{metric.value}</div>
                <div className="dashboard-section__summary-change">{metric.change}</div>
              </div>
              <span className="dashboard-section__summary-icon" aria-hidden="true">
                <Icon className="size-5" />
              </span>
            </div>
          );
        })}
      </div>

      <div className="dashboard-section__chart-grid">
        <MetricCard
          title="Posts by Platform"
          description="Weekly content output across channels."
          metric="total"
          className="dashboard-section__chart-card"
        >
          <ChartContainer config={platformPostsConfig} className="h-64 w-full">
            <BarChart data={platformPosts} margin={{ top: 12, right: 12, left: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="platform" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="posts" radius={[2, 2, 0, 0]}>
                {platformPosts.map((entry) => (
                  <Cell key={entry.platform} fill={getSocialColor(entry.social)} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </MetricCard>

        <MetricCard
          title="Engagement Mix"
          description="Distribution of audience actions."
          metric="total"
          className="dashboard-section__chart-card"
        >
          <ChartContainer config={{ engagement: { label: "Engagement" } }} className="h-64 w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
              <Pie data={engagementMix} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={4}>
                {engagementMix.map((entry) => (
                  <Cell key={entry.name} fill={getSocialColor(entry.social)} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </MetricCard>

        <MetricCard
          title="Growth Trends"
          description="Followers and impressions over the last month."
          metric="positive"
          className="dashboard-section__chart-card"
        >
          <ChartContainer config={trendConfig} className="h-64 w-full">
            <LineChart data={weeklyTrends} margin={{ top: 12, right: 12, left: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="week" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line dataKey="followers" type="monotone" stroke="var(--color-followers)" strokeWidth={3} dot={false} />
              <Line dataKey="impressions" type="monotone" stroke="var(--color-impressions)" strokeWidth={3} dot={false} />
            </LineChart>
          </ChartContainer>
        </MetricCard>
      </div>

      <MetricCard
        title="Platform Performance Overview"
        description="Snapshot of reach and engagement by network."
        metric="total"
      >
        <div className="dashboard-section__platform-grid">
          {platformMetrics.map((platform) => (
            <div key={platform.platform} className="dashboard-section__platform-card" data-social={platform.social}>
              <div className="dashboard-section__platform-heading">
                <span className="dashboard-section__platform-dot" />
                <span className="dashboard-section__platform-name">{platform.platform}</span>
              </div>
              <dl className="dashboard-section__platform-list">
                <div className="dashboard-section__platform-row">
                  <dt className="dashboard-section__platform-label">Followers</dt>
                  <dd className="dashboard-section__platform-value">{platform.followers}</dd>
                </div>
                <div className="dashboard-section__platform-row">
                  <dt className="dashboard-section__platform-label">Engagement</dt>
                  <dd className="dashboard-section__platform-value">{platform.engagement}</dd>
                </div>
                <div className="dashboard-section__platform-row">
                  <dt className="dashboard-section__platform-label">Reach</dt>
                  <dd className="dashboard-section__platform-value">{platform.reach}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </MetricCard>

      <MetricCard
        title="Top Performing Posts"
        description="Recent content with the strongest engagement."
        metric="total"
      >
        <div className="dashboard-section__post-grid">
          {topPosts.map((post) => (
            <div key={`${post.platform}-${post.content}`} className="dashboard-section__post-card" data-social={post.social}>
              <span className="dashboard-section__post-dot" />
              <div className="dashboard-section__post-body">
                <div className="dashboard-section__post-topline">
                  <span className="dashboard-section__post-platform">{post.platform}</span>
                  <span className="dashboard-section__post-engagement">
                    <TrendingUp className="size-4" />
                    {post.engagement}
                  </span>
                </div>
                <p className="dashboard-section__post-content">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      </MetricCard>
    </section>
  );
}
