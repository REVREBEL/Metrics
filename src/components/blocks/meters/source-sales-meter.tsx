"use client";

import { useState } from "react";

import { IconCalendarDays, IconCheckIcon, IconChromeIcon, IconDribbbleIcon, IconFacebookIcon, IconGlobeIcon, IconInstagramIcon, Icon } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

type TimeRangeKey = "7d" | "30d" | "90d" | "year";

interface TimeRangeOption {
    value: TimeRangeKey;
    label: string;
}

const timeRanges: TimeRangeOption[] = [
    { value: "7d", label: "This Week" },
    { value: "30d", label: "This Month" },
    { value: "90d", label: "Last 3 Months" },
    { value: "year", label: "Year to Date" },
];

interface PlatformConfig {
    icon: typeof FacebookIcon;
    label: string;
    color: string;
    bg: string;
}

const platformConfigs: Record<string, PlatformConfig> = {
    facebook: {
        icon: FacebookIcon,
        label: "Facebook",
        color: "text-blue-600",
        bg: "bg-blue-50 dark:bg-blue-950/40",
    },
    instagram: {
        icon: InstagramIcon,
        label: "Instagram",
        color: "text-pink-600",
        bg: "bg-pink-50 dark:bg-pink-950/40",
    },
    dribbble: {
        icon: DribbbleIcon,
        label: "Dribbble",
        color: "text-rose-600",
        bg: "bg-rose-50 dark:bg-rose-950/40",
    },
    google: {
        icon: ChromeIcon,
        label: "Google",
        color: "text-amber-600",
        bg: "bg-amber-50 dark:bg-amber-950/40",
    },
};

function getPlatformConfig(source: string): PlatformConfig {
    return (
        platformConfigs[source] ?? {
            icon: GlobeIcon,
            label: source,
            color: "text-muted-foreground",
            bg: "bg-muted",
        }
    );
}

const apiData = [
    { source: "facebook", visitors: 12450, revenue: 45200, percent: 78 },
    { source: "instagram", visitors: 8300, revenue: 28500, percent: 62 },
    { source: "dribbble", visitors: 4100, revenue: 12100, percent: 45 },
    { source: "google", visitors: 2400, revenue: 8400, percent: 25 },
];

export const SourceSalesMeter = () => {
    const [range, setRange] = useState<TimeRangeKey>("30d");

    const selectedLabel = timeRanges.find((r) => r.value === range)?.label;

    return (
        <Card className="gap-3 max-md:py-4!">
            <CardHeader className="max-md:px-4">
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Revenue contribution from each traffic source</CardDescription>
                <CardAction>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2 max-md:size-8">
                                <CalendarDays className="text-muted-foreground size-4" />
                                <span className="max-md:hidden">{selectedLabel}</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                            {timeRanges.map((item) => (
                                <DropdownMenuItem
                                    key={item.value}
                                    onClick={() => setRange(item.value)}
                                    className="justify-between">
                                    {item.label}
                                    {range === item.value && <CheckIcon className="size-4" />}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardAction>
            </CardHeader>

            <CardContent className="flex flex-col gap-2.5 max-md:px-4">
                {apiData.map((item) => {
                    const config = getPlatformConfig(item.source);
                    const Icon = config.icon;

                    return (
                        <div key={item.source} className="flex flex-col gap-2 rounded-lg border p-3">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className={cn("rounded-md p-2", config.bg)}>
                                        <Icon className={cn("size-4", config.color)} strokeWidth={1.5} size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium leading-none">{config.label}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {item.visitors.toLocaleString()} visitors
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold">${item.revenue.toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground">Revenue</p>
                                </div>
                            </div>
                            <Progress value={item.percent} />
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
};
