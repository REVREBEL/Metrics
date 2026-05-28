"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Download,
  Globe,
  RefreshCw,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";

import { MetricCard, MetricCardTabs } from "@/widgets/_shared/MetricCard";

type AudienceEntry = {
  label: string;
  value: string;
  percentage: number;
};

export interface OverviewSectionProps {
  profileName?: string;
  roleLabel?: string;
  followerCount?: string;
  monthlyReach?: string;
  engagementRate?: string;
  notifications?: string[];
  locations?: AudienceEntry[];
  ageGroups?: AudienceEntry[];
  activityMatrix?: number[][];
}

const defaultLocations: AudienceEntry[] = [
  { label: "United States", value: "197.5K", percentage: 100 },
  { label: "Brazil", value: "33.0K", percentage: 65 },
  { label: "Switzerland", value: "10.2K", percentage: 35 },
];

const defaultAgeGroups: AudienceEntry[] = [
  { label: "18-24", value: "89.2K", percentage: 85 },
  { label: "25-34", value: "156.8K", percentage: 100 },
  { label: "35-44", value: "32.5K", percentage: 45 },
];

const defaultActivityMatrix = [
  [0, 1, 1, 2, 0, 3, 1],
  [2, 0, 1, 3, 3, 2, 0],
  [1, 3, 0, 2, 1, 2, 2],
  [0, 1, 2, 3, 1, 1, 2],
  [2, 1, 3, 1, 2, 0, 1],
];

const audienceTabs = [
  { label: "Locations", value: "locations" },
  { label: "Age Groups", value: "age" },
] as const;

function activityClass(level: number) {
  return `overview-section__activity-level-${level}`;
}

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function OverviewSection({
  profileName = "RevRebel Social",
  roleLabel = "Multi-platform publisher",
  followerCount = "278.5K",
  monthlyReach = "5.2M",
  engagementRate = "98.2%",
  notifications = [
    "New follower milestone reached",
    "Five posts are scheduled for today",
  ],
  locations = defaultLocations,
  ageGroups = defaultAgeGroups,
  activityMatrix = defaultActivityMatrix,
}: OverviewSectionProps) {
  const [activeTab, setActiveTab] = useState<"locations" | "age">("locations");
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [online, setOnline] = useState(true);
  const [visibleNotifications, setVisibleNotifications] = useState(notifications);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const audienceData = useMemo(
    () => (activeTab === "locations" ? locations : ageGroups),
    [activeTab, ageGroups, locations]
  );

  const exportSnapshot = (format: "json" | "csv") => {
    const data = {
      followerCount,
      monthlyReach,
      engagementRate,
      exportedAt: new Date().toISOString(),
      audience: audienceData,
    };

    if (format === "json") {
      downloadFile(
        `overview-snapshot-${new Date().toISOString().slice(0, 10)}.json`,
        JSON.stringify(data, null, 2),
        "application/json"
      );
      return;
    }

    const rows = [
      ["Metric", "Value"],
      ["Followers", followerCount],
      ["Monthly Reach", monthlyReach],
      ["Engagement Rate", engagementRate],
      [],
      ["Audience", "Value", "Percent"],
      ...audienceData.map((entry) => [entry.label, entry.value, `${entry.percentage}%`]),
    ];
    downloadFile(
      `overview-snapshot-${new Date().toISOString().slice(0, 10)}.csv`,
      rows.map((row) => row.join(",")).join("\n"),
      "text/csv;charset=utf-8"
    );
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setRefreshing(false);
    setCurrentTime(new Date());
  };

  return (
    <section className="overview-section">
      {visibleNotifications.length ? (
        <div className="overview-section__notifications">
          {visibleNotifications.map((notification) => (
            <div key={notification} className="overview-section__notification">
              <Bell className="size-4" />
              <span>{notification}</span>
              <button
                type="button"
                className="overview-section__notification-close"
                onClick={() =>
                  setVisibleNotifications((current) =>
                    current.filter((item) => item !== notification)
                  )
                }
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <div className="overview-section__status-bar">
        <div className="overview-section__status-left">
          <span
            className="overview-section__status-badge"
            data-status={online ? "online" : "offline"}
          >
            {online ? <Wifi className="size-4" /> : <WifiOff className="size-4" />}
            {online ? "Online" : "Offline"}
          </span>
          <span className="overview-section__updated">
            Last updated {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </span>
        </div>
        <div className="overview-section__actions">
          <button className="overview-section__button" type="button" onClick={() => exportSnapshot("json")}>
            <Download className="size-4" />
            JSON
          </button>
          <button className="overview-section__button" type="button" onClick={() => exportSnapshot("csv")}>
            <Download className="size-4" />
            CSV
          </button>
          <button
            className="overview-section__button overview-section__button--primary"
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`size-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      <div className="overview-section__grid">
        <MetricCard title={profileName} description={roleLabel} metric="total">
          <div className="overview-section__metric-grid">
            <div className="overview-section__mini-card" data-metric="followers">
              <p className="overview-section__mini-label">Followers</p>
              <p className="overview-section__mini-value">{followerCount}</p>
            </div>
            <div className="overview-section__mini-card" data-metric="reach">
              <p className="overview-section__mini-label">Reach</p>
              <p className="overview-section__mini-value">{monthlyReach}</p>
            </div>
            <div className="overview-section__mini-card" data-metric="engagement">
              <p className="overview-section__mini-label">Engagement</p>
              <p className="overview-section__mini-value">{engagementRate}</p>
            </div>
          </div>

          <div className="overview-section__panel mt-5">
            <div className="overview-section__panel-heading">
              <Users className="size-4" />
              <p className="overview-section__panel-label">Audience Split</p>
            </div>
            <MetricCardTabs
              tabs={[...audienceTabs]}
              value={activeTab}
              onValueChange={setActiveTab}
              className="overview-section__tabs"
            />
            <div className="overview-section__audience-list">
              {audienceData.map((item) => (
                <div key={item.label}>
                  <div className="overview-section__audience-topline">
                    <span className="overview-section__audience-name">{item.label}</span>
                    <span className="overview-section__audience-value">{item.value}</span>
                  </div>
                  <div className="overview-section__progress-track mt-2">
                    <div
                      className="overview-section__progress-fill"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MetricCard>

        <MetricCard
          title="Post Activity"
          description="Publishing cadence over the last five weeks."
          metric="positive"
        >
          <div className="overview-section__activity-grid">
            {activityMatrix.flatMap((row, rowIndex) =>
              row.map((value, columnIndex) => (
                <div
                  key={`${rowIndex}-${columnIndex}`}
                  className={`overview-section__activity-cell ${activityClass(value)}`}
                  title={`Activity level ${value}`}
                />
              ))
            )}
          </div>
          <div className="overview-section__activity-footer">
            <span className="overview-section__activity-legend">Less activity</span>
            <div className="overview-section__activity-scale">
              {[0, 1, 2, 3].map((level) => (
                <span
                  key={level}
                  className={`overview-section__activity-dot ${activityClass(level)}`}
                />
              ))}
            </div>
            <span className="overview-section__activity-legend">More activity</span>
          </div>
        </MetricCard>

        <MetricCard
          title="Action Queue"
          description="High-level operational tasks for the team."
          metric="total"
        >
          <div className="overview-section__tasks">
            {[
              { title: "Schedule short-form video", note: "TikTok and Reels campaign", icon: Globe, metric: "engagement" },
              { title: "Review audience growth", note: "Export this week’s segment snapshot", icon: Users, metric: "followers" },
              { title: "Clear notifications", note: `${visibleNotifications.length} active alerts`, icon: Bell, metric: "reach" },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="overview-section__task-card" data-metric={item.metric}>
                  <div className="overview-section__task-heading">
                    <Icon className="size-4" />
                    <p className="overview-section__task-title">{item.title}</p>
                  </div>
                  <p className="overview-section__task-note">{item.note}</p>
                </div>
              );
            })}
          </div>
        </MetricCard>
      </div>
    </section>
  );
}
