"use client"

import type { ComponentProps, ComponentType } from "react"
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
} from "recharts"
import {
  DollarSign,
  Eye,
  Heart,
  MessageCircle,
  TrendingUp,
  Users,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

type SummaryMetric = {
  title: string
  value: string
  change: string
  icon: ComponentType<ComponentProps<"svg">>
}

type PlatformMetric = {
  platform: string
  followers: string
  engagement: string
  reach: string
  color: string
}

type TopPost = {
  platform: string
  content: string
  engagement: string
  color: string
}

export interface DashboardSectionProps {
  summaryMetrics?: SummaryMetric[]
  platformPosts?: { platform: string; posts: number; fill: string }[]
  engagementMix?: { name: string; value: number; fill: string }[]
  weeklyTrends?: { week: string; followers: number; impressions: number }[]
  platformMetrics?: PlatformMetric[]
  topPosts?: TopPost[]
}

const defaultSummaryMetrics: SummaryMetric[] = [
  { title: "Total Followers", value: "305.2K", change: "+12.3% from last month", icon: Users },
  { title: "Total Reach", value: "544K", change: "+8.7% from last month", icon: Eye },
  { title: "Engagement Rate", value: "4.8%", change: "+0.3% from last month", icon: Heart },
  { title: "ROI", value: "3.2x", change: "+0.4x from last month", icon: DollarSign },
]

const defaultPlatformPosts = [
  { platform: "Facebook", posts: 15, fill: "#1877f2" },
  { platform: "Instagram", posts: 22, fill: "#e4405f" },
  { platform: "Twitter", posts: 18, fill: "#1da1f2" },
  { platform: "LinkedIn", posts: 8, fill: "#0077b5" },
  { platform: "TikTok", posts: 12, fill: "#111827" },
]

const defaultEngagementMix = [
  { name: "Likes", value: 15420, fill: "#ef4444" },
  { name: "Comments", value: 3280, fill: "#f59e0b" },
  { name: "Shares", value: 1950, fill: "#10b981" },
  { name: "Saves", value: 870, fill: "#6366f1" },
]

const defaultWeeklyTrends = [
  { week: "Week 1", followers: 1250, impressions: 245 },
  { week: "Week 2", followers: 1890, impressions: 289 },
  { week: "Week 3", followers: 2340, impressions: 334 },
  { week: "Week 4", followers: 2890, impressions: 398 },
]

const defaultPlatformMetrics: PlatformMetric[] = [
  { platform: "Facebook", followers: "45.2K", engagement: "3.8%", reach: "120K", color: "#1877f2" },
  { platform: "Instagram", followers: "67.8K", engagement: "5.2%", reach: "89K", color: "#e4405f" },
  { platform: "Twitter", followers: "23.1K", engagement: "2.9%", reach: "67K", color: "#1da1f2" },
  { platform: "LinkedIn", followers: "12.4K", engagement: "4.1%", reach: "34K", color: "#0077b5" },
  { platform: "TikTok", followers: "156.7K", engagement: "8.7%", reach: "234K", color: "#111827" },
]

const defaultTopPosts: TopPost[] = [
  { platform: "Instagram", content: "Summer collection launch", engagement: "2.3K", color: "#e4405f" },
  { platform: "TikTok", content: "Behind the scenes video", engagement: "5.7K", color: "#111827" },
  { platform: "Facebook", content: "Customer testimonial feature", engagement: "1.8K", color: "#1877f2" },
]

const platformPostsConfig: ChartConfig = {
  posts: { label: "Posts", color: "var(--chart-1)" },
}

const trendConfig: ChartConfig = {
  followers: { label: "Followers", color: "#10b981" },
  impressions: { label: "Impressions", color: "#6366f1" },
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
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryMetrics.map((metric) => {
          const Icon = metric.icon

          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
                <div className="flex flex-col gap-1">
                  <CardDescription>{metric.title}</CardDescription>
                  <CardTitle className="text-2xl">{metric.value}</CardTitle>
                </div>
                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{metric.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Posts by Platform</CardTitle>
            <CardDescription>Weekly content output across channels.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={platformPostsConfig} className="h-64 w-full">
              <BarChart data={platformPosts}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="platform" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="posts" radius={[8, 8, 0, 0]}>
                  {platformPosts.map((entry) => (
                    <Cell key={entry.platform} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Mix</CardTitle>
            <CardDescription>Distribution of audience actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ engagement: { label: "Engagement" } }} className="h-64 w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                <Pie data={engagementMix} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85}>
                  {engagementMix.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Trends</CardTitle>
            <CardDescription>Followers and impressions over the last month.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={trendConfig} className="h-64 w-full">
              <LineChart data={weeklyTrends}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="week" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line dataKey="followers" type="monotone" stroke="var(--color-followers)" strokeWidth={2} dot={false} />
                <Line dataKey="impressions" type="monotone" stroke="var(--color-impressions)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Performance Overview</CardTitle>
          <CardDescription>Snapshot of reach and engagement by network.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {platformMetrics.map((platform) => (
              <div key={platform.platform} className="flex flex-col gap-3 rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full" style={{ backgroundColor: platform.color }} />
                  <span className="font-medium">{platform.platform}</span>
                </div>
                <dl className="grid gap-2 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">Followers</dt>
                    <dd className="font-medium">{platform.followers}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">Engagement</dt>
                    <dd className="font-medium">{platform.engagement}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">Reach</dt>
                    <dd className="font-medium">{platform.reach}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Posts</CardTitle>
          <CardDescription>Recent content with the strongest engagement.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-3">
            {topPosts.map((post) => (
              <div key={`${post.platform}-${post.content}`} className="flex items-start gap-3 rounded-lg border p-4">
                <span className="mt-1 size-3 rounded-full" style={{ backgroundColor: post.color }} />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium">{post.platform}</span>
                    <span className="inline-flex items-center gap-1 text-sm text-emerald-600">
                      <TrendingUp className="size-4" />
                      {post.engagement}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
