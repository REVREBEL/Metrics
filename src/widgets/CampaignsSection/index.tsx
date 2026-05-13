"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Label,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  DollarSign,
  Eye,
  PauseCircle,
  Plus,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  MetricCard,
  MetricCardTitle,
  MetricInsight,
} from "@/widgets/_shared/MetricCard";

type Platform = "Facebook" | "Instagram" | "X" | "LinkedIn" | "TikTok";
type CampaignStatus = "active" | "paused" | "completed" | "draft";
type SocialKey = "facebook" | "instagram" | "x" | "linkedin" | "tiktok";

export type Campaign = {
  id: string;
  name: string;
  platform: Platform;
  status: CampaignStatus;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roas: number;
};

export interface CampaignsSectionProps {
  initialCampaigns?: Campaign[];
  onCreateCampaign?: () => void;
}

const defaultCampaigns: Campaign[] = [
  { id: "1", name: "Summer Product Launch", platform: "Facebook", status: "active", budget: 5000, spent: 3200, impressions: 125000, clicks: 3850, conversions: 127, ctr: 3.08, cpc: 0.83, roas: 4.2 },
  { id: "2", name: "Brand Awareness Q2", platform: "Instagram", status: "active", budget: 3000, spent: 2100, impressions: 89000, clicks: 2670, conversions: 89, ctr: 3, cpc: 0.79, roas: 3.8 },
  { id: "3", name: "Holiday Promotion", platform: "X", status: "completed", budget: 2000, spent: 1950, impressions: 67000, clicks: 2010, conversions: 56, ctr: 3, cpc: 0.97, roas: 3.1 },
  { id: "4", name: "B2B Lead Generation", platform: "LinkedIn", status: "active", budget: 4000, spent: 1800, impressions: 45000, clicks: 1350, conversions: 78, ctr: 3, cpc: 1.33, roas: 5.2 },
  { id: "5", name: "Gen Z Engagement", platform: "TikTok", status: "paused", budget: 1500, spent: 890, impressions: 156000, clicks: 4680, conversions: 234, ctr: 3, cpc: 0.19, roas: 2.8 },
];

const allocationConfig: ChartConfig = {
  budget: { label: "Budget" },
};

const performanceConfig: ChartConfig = {
  conversions: { label: "Conversions", color: "var(--color-positive)" },
  roas: { label: "ROAS", color: "var(--color-total)" },
};

function getPlatformSocial(platform: Platform): SocialKey {
  return {
    Facebook: "facebook",
    Instagram: "instagram",
    X: "x",
    LinkedIn: "linkedin",
    TikTok: "tiktok",
  }[platform];
}

function getPlatformColor(platform: Platform) {
  const social = getPlatformSocial(platform);
  return `var(--color-${social === "linkedin" ? "linkedin" : social}, var(--metric-color))`;
}

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function CampaignsSection({
  initialCampaigns = defaultCampaigns,
  onCreateCampaign,
}: CampaignsSectionProps) {
  const [campaigns] = useState(initialCampaigns);

  const budgetByPlatform = campaigns.map((campaign) => ({
    platform: campaign.platform,
    budget: campaign.budget,
    fill: getPlatformColor(campaign.platform),
    social: getPlatformSocial(campaign.platform),
  }));

  const performanceTrend = [
    { week: "Week 1", conversions: 45, roas: 3.2 },
    { week: "Week 2", conversions: 67, roas: 3.8 },
    { week: "Week 3", conversions: 89, roas: 4.1 },
    { week: "Week 4", conversions: 127, roas: 4.2 },
  ];

  const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0);
  const averageRoas = campaigns.reduce((sum, campaign) => sum + campaign.roas, 0) / campaigns.length;
  const totalImpressions = campaigns.reduce((sum, campaign) => sum + campaign.impressions, 0);

  const summaryStats = [
    { label: "Total Budget", value: formatCurrency(totalBudget), note: "Across all campaigns", icon: DollarSign, social: "facebook" },
    { label: "Total Spent", value: formatCurrency(totalSpent), note: `${((totalSpent / totalBudget) * 100).toFixed(1)}% utilized`, icon: TrendingUp, social: "instagram" },
    { label: "Conversions", value: totalConversions.toLocaleString(), note: "Combined campaign conversions", icon: Users, social: "tiktok" },
    { label: "Avg. ROAS", value: `${averageRoas.toFixed(1)}x`, note: "Return on ad spend", icon: Eye, social: "linkedin" },
  ] satisfies Array<{ label: string; value: string; note: string; icon: typeof DollarSign; social: SocialKey }>;

  return (
    <section className="campaigns-section">
      <div className="campaigns-section__header">
        <div>
          <MetricCardTitle as="h2">Campaign Management</MetricCardTitle>
          <p className="metric-card__description">Budget, conversion, and pacing visibility across paid channels.</p>
        </div>
        <Button onClick={onCreateCampaign} className="campaigns-section__button">
          <Plus data-icon="inline-start" />
          Create Campaign
        </Button>
      </div>

      <div className="campaigns-section__summary-grid">
        {summaryStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="campaigns-section__summary-card" data-social={stat.social}>
              <div>
                <div className="campaigns-section__summary-label">{stat.label}</div>
                <div className="campaigns-section__summary-value">{stat.value}</div>
                <div className="campaigns-section__summary-note">{stat.note}</div>
              </div>
              <span className="campaigns-section__summary-icon" aria-hidden="true">
                <Icon className="size-5" />
              </span>
            </div>
          );
        })}
      </div>

      <div className="campaigns-section__chart-grid">
        <MetricCard
          title="Budget by Platform"
          description="Current allocation across paid social."
          metric="total"
          className="campaigns-section__chart-card"
        >
          <ChartContainer config={allocationConfig} className="h-72 w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="platform" />} />
              <Pie data={budgetByPlatform} dataKey="budget" nameKey="platform" innerRadius={56} outerRadius={92} paddingAngle={4}>
                {budgetByPlatform.map((entry) => (
                  <Cell key={entry.platform} fill={entry.fill} />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="metric-card__value fill-(--primary-b000) text-2xl">
                            {formatCurrency(totalBudget)}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 20} className="metric-card__label fill-(--muted-foreground)">
                            Budget
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
          title="Weekly Performance"
          description="Conversion volume and ROAS trend over the current month."
          metric="total"
          className="campaigns-section__chart-card"
        >
          <ChartContainer config={performanceConfig} className="h-72 w-full">
            <AreaChart data={performanceTrend} margin={{ top: 12, right: 12, left: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="week" tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area yAxisId="left" dataKey="conversions" type="monotone" stroke="var(--color-conversions)" fill="var(--color-conversions)" fillOpacity={0.15} />
              <Area yAxisId="right" dataKey="roas" type="monotone" stroke="var(--color-roas)" fill="var(--color-roas)" fillOpacity={0.08} />
            </AreaChart>
          </ChartContainer>
          <MetricInsight>
            {totalConversions.toLocaleString()} conversions generated from {totalImpressions.toLocaleString()} impressions across active paid channels.
          </MetricInsight>
        </MetricCard>
      </div>

      <MetricCard
        title="Campaign List"
        description="Active and historical campaigns with pacing detail."
        metric="total"
      >
        <div className="campaigns-section__campaign-list">
          {campaigns.map((campaign) => {
            const social = getPlatformSocial(campaign.platform);
            const spentPct = (campaign.spent / campaign.budget) * 100;
            const remaining = campaign.budget - campaign.spent;

            return (
              <div
                key={campaign.id}
                className="campaigns-section__campaign-row"
                data-social={social}
                data-status={campaign.status}
              >
                <div className="campaigns-section__campaign-header">
                  <div>
                    <div className="campaigns-section__campaign-name">{campaign.name}</div>
                    <div className="campaigns-section__campaign-tags">
                      <span className="campaigns-section__status">{campaign.status}</span>
                      <span className="campaigns-section__platform">{campaign.platform}</span>
                    </div>
                    <div className="campaigns-section__campaign-meta">
                      <span>
                        <Target className="size-4" />
                        CTR {campaign.ctr.toFixed(2)}%
                      </span>
                      <span>CPC ${campaign.cpc.toFixed(2)}</span>
                      <span>ROAS {campaign.roas.toFixed(1)}x</span>
                    </div>
                  </div>

                  <div className="campaigns-section__budget-line">
                    <PauseCircle className="size-4" />
                    <span>{formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}</span>
                  </div>
                </div>

                <div className="campaigns-section__campaign-body">
                  <div>
                    <div className="campaigns-section__progress-track" aria-label={`${campaign.name} budget pacing`}>
                      <div className="campaigns-section__progress-fill" style={{ width: `${spentPct}%` }} />
                    </div>
                    <div className="campaigns-section__metrics-grid">
                      <div className="campaigns-section__metric-box">
                        <div className="campaigns-section__campaign-label">Impressions</div>
                        <div className="campaigns-section__metric-value">{campaign.impressions.toLocaleString()}</div>
                      </div>
                      <div className="campaigns-section__metric-box">
                        <div className="campaigns-section__campaign-label">Clicks</div>
                        <div className="campaigns-section__metric-value">{campaign.clicks.toLocaleString()}</div>
                      </div>
                      <div className="campaigns-section__metric-box">
                        <div className="campaigns-section__campaign-label">Conversions</div>
                        <div className="campaigns-section__metric-value">{campaign.conversions.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="campaigns-section__pacing-card">
                    <div>
                      <div className="campaigns-section__pacing-title">Budget Pacing</div>
                      <p className="campaigns-section__pacing-copy">Remaining campaign budget</p>
                    </div>
                    <div className="campaigns-section__budget-value text-3xl">{formatCurrency(remaining)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </MetricCard>
    </section>
  );
}
