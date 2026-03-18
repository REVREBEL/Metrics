"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"
import {
  DollarSign,
  Eye,
  PauseCircle,
  Plus,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { Progress } from "@/components/ui/progress"

type Platform = "Facebook" | "Instagram" | "Twitter" | "LinkedIn" | "TikTok"
type CampaignStatus = "active" | "paused" | "completed" | "draft"

export type Campaign = {
  id: string
  name: string
  platform: Platform
  status: CampaignStatus
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  roas: number
}

export interface CampaignsSectionProps {
  initialCampaigns?: Campaign[]
  onCreateCampaign?: () => void
}

const defaultCampaigns: Campaign[] = [
  { id: "1", name: "Summer Product Launch", platform: "Facebook", status: "active", budget: 5000, spent: 3200, impressions: 125000, clicks: 3850, conversions: 127, ctr: 3.08, cpc: 0.83, roas: 4.2 },
  { id: "2", name: "Brand Awareness Q2", platform: "Instagram", status: "active", budget: 3000, spent: 2100, impressions: 89000, clicks: 2670, conversions: 89, ctr: 3, cpc: 0.79, roas: 3.8 },
  { id: "3", name: "Holiday Promotion", platform: "Twitter", status: "completed", budget: 2000, spent: 1950, impressions: 67000, clicks: 2010, conversions: 56, ctr: 3, cpc: 0.97, roas: 3.1 },
  { id: "4", name: "B2B Lead Generation", platform: "LinkedIn", status: "active", budget: 4000, spent: 1800, impressions: 45000, clicks: 1350, conversions: 78, ctr: 3, cpc: 1.33, roas: 5.2 },
  { id: "5", name: "Gen Z Engagement", platform: "TikTok", status: "paused", budget: 1500, spent: 890, impressions: 156000, clicks: 4680, conversions: 234, ctr: 3, cpc: 0.19, roas: 2.8 },
]

const allocationConfig: ChartConfig = {
  budget: { label: "Budget" },
}

const performanceConfig: ChartConfig = {
  conversions: { label: "Conversions", color: "#10b981" },
  roas: { label: "ROAS", color: "#6366f1" },
}

function getPlatformColor(platform: Platform) {
  return {
    Facebook: "#1877f2",
    Instagram: "#e4405f",
    Twitter: "#1da1f2",
    LinkedIn: "#0077b5",
    TikTok: "#111827",
  }[platform]
}

function getStatusVariant(status: CampaignStatus): "default" | "secondary" | "outline" {
  if (status === "active") return "default"
  if (status === "paused") return "secondary"
  return "outline"
}

export default function CampaignsSection({
  initialCampaigns = defaultCampaigns,
  onCreateCampaign,
}: CampaignsSectionProps) {
  const [campaigns] = useState(initialCampaigns)

  const budgetByPlatform = campaigns.map((campaign) => ({
    platform: campaign.platform,
    budget: campaign.budget,
    fill: getPlatformColor(campaign.platform),
  }))

  const performanceTrend = [
    { week: "Week 1", conversions: 45, roas: 3.2 },
    { week: "Week 2", conversions: 67, roas: 3.8 },
    { week: "Week 3", conversions: 89, roas: 4.1 },
    { week: "Week 4", conversions: 127, roas: 4.2 },
  ]

  const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0)
  const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0)
  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0)
  const averageRoas = campaigns.reduce((sum, campaign) => sum + campaign.roas, 0) / campaigns.length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Campaign Management</h2>
          <p className="text-sm text-muted-foreground">Budget, conversion, and pacing visibility across paid channels.</p>
        </div>
        <Button onClick={onCreateCampaign}>
          <Plus data-icon="inline-start" />
          Create Campaign
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Budget", value: `$${totalBudget.toLocaleString()}`, note: "Across all campaigns", icon: DollarSign },
          { label: "Total Spent", value: `$${totalSpent.toLocaleString()}`, note: `${((totalSpent / totalBudget) * 100).toFixed(1)}% utilized`, icon: TrendingUp },
          { label: "Conversions", value: totalConversions.toLocaleString(), note: "Combined campaign conversions", icon: Users },
          { label: "Avg. ROAS", value: `${averageRoas.toFixed(1)}x`, note: "Return on ad spend", icon: Eye },
        ].map((stat) => {
          const Icon = stat.icon

          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
                <div className="flex flex-col gap-1">
                  <CardDescription>{stat.label}</CardDescription>
                  <CardTitle className="text-2xl">{stat.value}</CardTitle>
                </div>
                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{stat.note}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budget by Platform</CardTitle>
            <CardDescription>Current allocation across paid social.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={allocationConfig} className="h-72 w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="platform" />} />
                <Pie data={budgetByPlatform} dataKey="budget" nameKey="platform" innerRadius={56} outerRadius={92}>
                  {budgetByPlatform.map((entry) => (
                    <Cell key={entry.platform} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
            <CardDescription>Conversion volume and ROAS trend over the current month.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={performanceConfig} className="h-72 w-full">
              <AreaChart data={performanceTrend}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="week" tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area yAxisId="left" dataKey="conversions" type="monotone" stroke="var(--color-conversions)" fill="var(--color-conversions)" fillOpacity={0.15} />
                <Area yAxisId="right" dataKey="roas" type="monotone" stroke="var(--color-roas)" fill="var(--color-roas)" fillOpacity={0.08} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign List</CardTitle>
          <CardDescription>Active and historical campaigns with pacing detail.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="rounded-lg border p-4">
              <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <Badge variant={getStatusVariant(campaign.status)}>{campaign.status}</Badge>
                    <Badge variant="outline">{campaign.platform}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Target className="size-4" />
                      CTR {campaign.ctr.toFixed(2)}%
                    </span>
                    <span>CPC ${campaign.cpc.toFixed(2)}</span>
                    <span>ROAS {campaign.roas.toFixed(1)}x</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <PauseCircle className="size-4 text-muted-foreground" />
                  <span>
                    ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
                <div className="flex flex-col gap-3">
                  <Progress value={(campaign.spent / campaign.budget) * 100} />
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border p-3">
                      <p className="text-sm text-muted-foreground">Impressions</p>
                      <p className="text-lg font-semibold">{campaign.impressions.toLocaleString()}</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-sm text-muted-foreground">Clicks</p>
                      <p className="text-lg font-semibold">{campaign.clicks.toLocaleString()}</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-sm text-muted-foreground">Conversions</p>
                      <p className="text-lg font-semibold">{campaign.conversions.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-3 text-sm">
                  <p className="mb-2 font-medium">Budget pacing</p>
                  <p className="text-muted-foreground">
                    {(campaign.budget - campaign.spent).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    })} remaining
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
