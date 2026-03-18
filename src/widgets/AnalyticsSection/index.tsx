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
  BarChart3,
  Clock,
  Eye,
  Globe,
  MessageCircle,
  Target,
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

type MetricCard = {
  title: string
  value: string
  change: string
  icon: ComponentType<ComponentProps<"svg">>
}

export interface AnalyticsSectionProps {
  metrics?: MetricCard[]
  followerGrowth?: { month: string; Facebook: number; Instagram: number; TikTok: number }[]
  engagementRates?: { platform: string; rate: number; fill: string }[]
  reachDistribution?: { name: string; value: number; fill: string }[]
  audienceDemographics?: { range: string; share: number }[]
}

const defaultMetrics: MetricCard[] = [
  { title: "Total Reach", value: "556K", change: "+8.2% from last month", icon: Eye },
  { title: "Impressions", value: "2.4M", change: "+15.3% from last month", icon: BarChart3 },
  { title: "Engagement", value: "21.5K", change: "+12.7% from last month", icon: MessageCircle },
  { title: "Conversion Rate", value: "3.8%", change: "+0.5% from last month", icon: Target },
]

const defaultFollowerGrowth = [
  { month: "Jan", Facebook: 42000, Instagram: 58000, TikTok: 120000 },
  { month: "Feb", Facebook: 43200, Instagram: 61000, TikTok: 135000 },
  { month: "Mar", Facebook: 44100, Instagram: 63500, TikTok: 145000 },
  { month: "Apr", Facebook: 44800, Instagram: 65200, TikTok: 150000 },
  { month: "May", Facebook: 45000, Instagram: 66800, TikTok: 155000 },
  { month: "Jun", Facebook: 45200, Instagram: 67800, TikTok: 156700 },
]

const defaultEngagementRates = [
  { platform: "Facebook", rate: 3.8, fill: "#1877f2" },
  { platform: "Instagram", rate: 5.2, fill: "#e4405f" },
  { platform: "Twitter", rate: 2.9, fill: "#1da1f2" },
  { platform: "LinkedIn", rate: 4.1, fill: "#0077b5" },
  { platform: "TikTok", rate: 8.7, fill: "#111827" },
]

const defaultReachDistribution = [
  { name: "Organic", value: 320000, fill: "#10b981" },
  { name: "Paid", value: 180000, fill: "#f59e0b" },
  { name: "Viral", value: 44000, fill: "#6366f1" },
  { name: "Other", value: 12000, fill: "#ef4444" },
]

const defaultAudienceDemographics = [
  { range: "18-24", share: 25 },
  { range: "25-34", share: 35 },
  { range: "35-44", share: 22 },
  { range: "45-54", share: 12 },
  { range: "55+", share: 6 },
]

const growthConfig: ChartConfig = {
  Facebook: { label: "Facebook", color: "#1877f2" },
  Instagram: { label: "Instagram", color: "#e4405f" },
  TikTok: { label: "TikTok", color: "#111827" },
}

export default function AnalyticsSection({
  metrics = defaultMetrics,
  followerGrowth = defaultFollowerGrowth,
  engagementRates = defaultEngagementRates,
  reachDistribution = defaultReachDistribution,
  audienceDemographics = defaultAudienceDemographics,
}: AnalyticsSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold">Analytics &amp; Insights</h2>
        <p className="text-sm text-muted-foreground">A reusable analytics view for social channel performance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
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

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Follower Growth Trends</CardTitle>
            <CardDescription>Platform-specific growth over six months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={growthConfig} className="h-72 w-full">
              <LineChart data={followerGrowth}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line dataKey="Facebook" type="monotone" stroke="var(--color-Facebook)" strokeWidth={2} dot={false} />
                <Line dataKey="Instagram" type="monotone" stroke="var(--color-Instagram)" strokeWidth={2} dot={false} />
                <Line dataKey="TikTok" type="monotone" stroke="var(--color-TikTok)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Engagement Rates</CardTitle>
            <CardDescription>Relative engagement rate by channel.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ rate: { label: "Rate" } }} className="h-72 w-full">
              <BarChart data={engagementRates}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="platform" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
                  {engagementRates.map((entry) => (
                    <Cell key={entry.platform} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reach Distribution</CardTitle>
            <CardDescription>How your visibility is being generated.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ reach: { label: "Reach" } }} className="h-72 w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                <Pie data={reachDistribution} dataKey="value" nameKey="name" innerRadius={56} outerRadius={90}>
                  {reachDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audience Demographics</CardTitle>
            <CardDescription>Share of audience by age range.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ share: { label: "Share", color: "#6366f1" } }} className="h-72 w-full">
              <BarChart data={audienceDemographics}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="range" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="share" fill="var(--color-share)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="size-5" />
              Top Performing Countries
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {[
              { country: "United States", percentage: 45, followers: "137.3K" },
              { country: "United Kingdom", percentage: 18, followers: "54.9K" },
              { country: "Canada", percentage: 12, followers: "36.6K" },
              { country: "Australia", percentage: 8, followers: "24.4K" },
              { country: "Germany", percentage: 6, followers: "18.3K" },
            ].map((item) => (
              <div key={item.country} className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium">{item.country}</span>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-28 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${item.percentage}%` }} />
                  </div>
                  <span className="w-12 text-right text-sm text-muted-foreground">{item.percentage}%</span>
                  <span className="w-16 text-right text-sm font-medium">{item.followers}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-5" />
              Peak Engagement Times
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {[
              { time: "9:00 AM - 11:00 AM", platform: "LinkedIn", engagement: "High" },
              { time: "12:00 PM - 2:00 PM", platform: "Facebook", engagement: "Medium" },
              { time: "6:00 PM - 8:00 PM", platform: "Instagram", engagement: "Very High" },
              { time: "8:00 PM - 10:00 PM", platform: "TikTok", engagement: "High" },
            ].map((item) => (
              <div key={`${item.time}-${item.platform}`} className="rounded-lg border p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{item.time}</p>
                    <p className="text-sm text-muted-foreground">{item.platform}</p>
                  </div>
                  <p className="text-sm font-medium">{item.engagement}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
