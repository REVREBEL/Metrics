"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Bell,
  Download,
  Globe,
  RefreshCw,
  Users,
  Wifi,
  WifiOff,
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
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type AudienceEntry = {
  label: string
  value: string
  percentage: number
}

export interface OverviewSectionProps {
  profileName?: string
  roleLabel?: string
  followerCount?: string
  monthlyReach?: string
  engagementRate?: string
  notifications?: string[]
  locations?: AudienceEntry[]
  ageGroups?: AudienceEntry[]
  activityMatrix?: number[][]
}

const defaultLocations: AudienceEntry[] = [
  { label: "United States", value: "197.5K", percentage: 100 },
  { label: "Brazil", value: "33.0K", percentage: 65 },
  { label: "Switzerland", value: "10.2K", percentage: 35 },
]

const defaultAgeGroups: AudienceEntry[] = [
  { label: "18-24", value: "89.2K", percentage: 85 },
  { label: "25-34", value: "156.8K", percentage: 100 },
  { label: "35-44", value: "32.5K", percentage: 45 },
]

const defaultActivityMatrix = [
  [0, 1, 1, 2, 0, 3, 1],
  [2, 0, 1, 3, 3, 2, 0],
  [1, 3, 0, 2, 1, 2, 2],
  [0, 1, 2, 3, 1, 1, 2],
  [2, 1, 3, 1, 2, 0, 1],
]

function activityClass(level: number) {
  if (level === 0) return "bg-muted"
  if (level === 1) return "bg-chart-3/35"
  if (level === 2) return "bg-chart-3/60"
  return "bg-chart-3"
}

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
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
  const [activeTab, setActiveTab] = useState<"locations" | "age">("locations")
  const [refreshing, setRefreshing] = useState(false)
  const [currentTime, setCurrentTime] = useState(() => new Date())
  const [online, setOnline] = useState(true)
  const [visibleNotifications, setVisibleNotifications] = useState(notifications)

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const audienceData = useMemo(
    () => (activeTab === "locations" ? locations : ageGroups),
    [activeTab, ageGroups, locations]
  )

  const exportSnapshot = (format: "json" | "csv") => {
    const data = {
      followerCount,
      monthlyReach,
      engagementRate,
      exportedAt: new Date().toISOString(),
      audience: audienceData,
    }

    if (format === "json") {
      downloadFile(
        `overview-snapshot-${new Date().toISOString().slice(0, 10)}.json`,
        JSON.stringify(data, null, 2),
        "application/json"
      )
      return
    }

    const rows = [
      ["Metric", "Value"],
      ["Followers", followerCount],
      ["Monthly Reach", monthlyReach],
      ["Engagement Rate", engagementRate],
      [],
      ["Audience", "Value", "Percent"],
      ...audienceData.map((entry) => [entry.label, entry.value, `${entry.percentage}%`]),
    ]
    downloadFile(
      `overview-snapshot-${new Date().toISOString().slice(0, 10)}.csv`,
      rows.map((row) => row.join(",")).join("\n"),
      "text/csv;charset=utf-8"
    )
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise((resolve) => window.setTimeout(resolve, 900))
    setRefreshing(false)
    setCurrentTime(new Date())
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {visibleNotifications.map((notification) => (
          <div
            key={notification}
            className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm shadow-sm"
          >
            <Bell className="size-4 text-muted-foreground" />
            <span>{notification}</span>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground"
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

      <Card>
        <CardContent className="flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Badge variant={online ? "default" : "destructive"}>
              {online ? <Wifi data-icon="inline-start" /> : <WifiOff data-icon="inline-start" />}
              {online ? "Online" : "Offline"}
            </Badge>
            <span className="text-muted-foreground">
              Last updated {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => exportSnapshot("json")}>
              <Download data-icon="inline-start" />
              JSON
            </Button>
            <Button variant="outline" size="sm" onClick={() => exportSnapshot("csv")}>
              <Download data-icon="inline-start" />
              CSV
            </Button>
            <Button size="sm" onClick={handleRefresh} disabled={refreshing}>
              <RefreshCw
                data-icon="inline-start"
                className={refreshing ? "animate-spin" : undefined}
              />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>{profileName}</CardTitle>
            <CardDescription>{roleLabel}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Followers</p>
                <p className="text-2xl font-semibold">{followerCount}</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Reach</p>
                <p className="text-2xl font-semibold">{monthlyReach}</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Engagement</p>
                <p className="text-2xl font-semibold">{engagementRate}</p>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="mb-3 flex items-center gap-2">
                <Users className="size-4 text-muted-foreground" />
                <p className="font-medium">Audience split</p>
              </div>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "locations" | "age")}>
                <TabsList>
                  <TabsTrigger value="locations">Locations</TabsTrigger>
                  <TabsTrigger value="age">Age Groups</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="mt-4 flex flex-col gap-4">
                {audienceData.map((item) => (
                  <div key={item.label} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span>{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                    <Progress value={item.percentage} />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Post Activity</CardTitle>
            <CardDescription>Publishing cadence over the last five weeks.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-7 gap-2">
              {activityMatrix.flatMap((row, rowIndex) =>
                row.map((value, columnIndex) => (
                  <div
                    key={`${rowIndex}-${columnIndex}`}
                    className={`aspect-square rounded-sm ${activityClass(value)}`}
                    title={`Activity level ${value}`}
                  />
                ))
              )}
            </div>
            <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
              <span>Less activity</span>
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3].map((level) => (
                  <span key={level} className={`size-3 rounded-sm ${activityClass(level)}`} />
                ))}
              </div>
              <span>More activity</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Action Queue</CardTitle>
            <CardDescription>High-level operational tasks for the team.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {[
              { title: "Schedule short-form video", note: "TikTok and Reels campaign", icon: Globe },
              { title: "Review audience growth", note: "Export this week’s segment snapshot", icon: Users },
              { title: "Clear notifications", note: `${visibleNotifications.length} active alerts`, icon: Bell },
            ].map((item) => {
              const Icon = item.icon

              return (
                <div key={item.title} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="size-4 text-muted-foreground" />
                    <p className="font-medium">{item.title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.note}</p>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
