import React, { useEffect, useMemo, useState } from "react";
import { Day, useDayPicker, type WeekProps } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useDuckDb } from "@/hooks/useDuckDb";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DAY_SIZE = "16px";
const DAY_MARGIN = "2px";

export interface CalendarHeatmapData {
    date: Date;
    count: number;
}

interface CalendarHeatmapProps {
    startDate: Date;
}

export default function CalendarHeatmap({
    startDate,
}: CalendarHeatmapProps): React.JSX.Element {
    const [heatmapData, setHeatmapData] = useState<CalendarHeatmapData[]>([]);
    const { execute, isInitializing, error } = useDuckDb();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isInitializing || !startDate) return;

        const endDate = new Date(startDate);
        endDate.setFullYear(startDate.getFullYear() + 1);

        async function loadData() {
            setLoading(true);
            try {
                const result = await execute(
                    `SELECT CAST(stay_date AS DATE) AS date, COUNT(*) AS count FROM 'dashboard_trend.parquet' WHERE stay_date >= '${startDate.toISOString().split('T')[0]}' AND stay_date < '${endDate.toISOString().split('T')[0]}' GROUP BY 1 ORDER BY 1`
                );
                const transformedData = result.map((row: any) => ({
                    date: new Date(row.date),
                    count: Number(row.count),
                }));
                setHeatmapData(transformedData);
            } catch (e) {
                console.error("Failed to fetch heatmap data", e);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [startDate, execute, isInitializing]);

    const formatCaption = (date: Date) => {
        return date.toLocaleString("default", { month: "short" });
    };
    const heatmapModify = (dataToModify: CalendarHeatmapData[]) => {
        const zero: Date[] = [];
        const one: Date[] = [];
        const two: Date[] = [];
        const three: Date[] = [];
        const four: Date[] = [];
        for (const item of dataToModify) {
            if (item.count === 0) {
                zero.push(item.date);
            } else if (item.count === 1) {
                one.push(item.date);
            } else if (item.count === 2) {
                two.push(item.date);
            } else if (item.count === 3) {
                three.push(item.date);
            } else if (item.count === 4) {
                four.push(item.date);
            }
        }
        return {
            zero: zero,
            one: one,
            two: two,
            three: three,
            four: four,
        };
    };
    const heatmapClassNames = {
        zero: "bg-gray-100 dark:bg-gray-800",
        one: "bg-[var(--chart-4)]",
        two: "bg-[var(--chart-5)]",
        three: "bg-[var(--chart-6)]",
        four: "bg-[var(--chart-7)]",
    };

    const HeatmapLegend = () => {
        return (
            <div className="flex space-x-2 text-sm text-gray-600">
                <span>less</span>
                <div className="flex items-center space-x-1">
                    <div
                        className={cn("h-[var(--box-size)] w-[var(--box-size)] rounded-sm",
                            heatmapClassNames.zero)}
                    ></div>
                    <div
                        className={cn("h-[var(--box-size)] w-[var(--box-size)] rounded-sm",
                            heatmapClassNames.one)}
                    ></div>
                    <div
                        className={cn("h-[var(--box-size)] w-[var(--box-size)] rounded-sm",
                            heatmapClassNames.two)}
                    ></div>
                    <div
                        className={cn("h-[var(--box-size)] w-[var(--box-size)] rounded-sm",
                            heatmapClassNames.three)}
                    ></div>
                    <div
                        className={cn("h-[var(--box-size)] w-[var(--box-size)] rounded-sm",
                            heatmapClassNames.four)}
                    ></div>
                </div>
                <span>more</span>
            </div>
        );
    };

    const dataMap = useMemo(() => {
        return heatmapData.reduce((acc, item) => {
            acc.set(item.date.toISOString().split("T")[0], item.count);
            return acc;
        }, new Map<string, number>());
    }, [heatmapData]);

    if (isInitializing || loading) {
        return <Skeleton className="h-[238px] w-full" />;
    }

    if (error) {
        return (
            <div className="flex h-[238px] w-full items-center justify-center rounded-md border">
                <p className="text-sm font-medium text-destructive">
                    Failed to load heatmap.
                </p>
            </div>
        );
    }

    return (
        <div
            className="flex flex-col rounded-md border"
            style={
                {
                    "--box-size": DAY_SIZE,
                    "--box-margin": DAY_MARGIN,
                } as React.CSSProperties
            }
        >
            <div className="flex items-center justify-between p-3">
                <h3 className="text-base font-semibold">Activity Heatmap</h3>
                <Tabs defaultValue="90d" className="w-auto">
                    <TabsList>
                        <TabsTrigger value="1d">Last 01 day</TabsTrigger>
                        <TabsTrigger value="3d">Last 03 days</TabsTrigger>
                        <TabsTrigger value="7d">Last 07 days</TabsTrigger>
                        <TabsTrigger value="14d">Last 14 days</TabsTrigger>
                        <TabsTrigger value="30d">Last 30 days</TabsTrigger>
                        <TabsTrigger value="60d">Last 60 days</TabsTrigger>
                        <TabsTrigger value="90d">Last 90 days</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="overflow-x-scroll px-3 pb-3">
                <Calendar
                    formatters={{ formatCaption }}
                    numberOfMonths={12}
                    defaultMonth={startDate}
                    className="items-center justify-center"
                    classNames={{
                        nav: "hidden",
                        caption: "text-xs",
                        caption_label: "font-normal",
                        tbody: "flex",
                        month: "!ml-0",
                        row: "[user-select:none;] flex flex-col",
                        day: "m-[var(--box-margin)] h-[var(--box-size)] w-[var(--box-size)] rounded-sm border bg-gray-100 text-xs text-transparent",
                        day_outside:
                            "border-transparent bg-transparent text-transparent",
                        day_today: "border-black text-transparent",
                    }}
                    modifiers={heatmapModify(heatmapData)}
                    modifiersClassNames={heatmapClassNames}
                    components={{
                        Weekdays: () => <></>,
                        Week: (props: WeekProps) => (
                            <CustomRow weekProps={props} dataMap={dataMap} />
                        ),
                    }}
                />
                <div className="mt-2 flex w-full justify-end pr-4">
                    <HeatmapLegend />
                </div>
            </div>
        </div>
    );
}

interface CustomWeekProps {
    weekProps: WeekProps;
    dataMap: Map<string, number>;
}

function CustomRow({ weekProps, dataMap }: CustomWeekProps): React.JSX.Element {
    const { styles, classNames, components } = useDayPicker();
    const DayComponent = components?.Day ?? Day;

    const { week } = weekProps;
    const { days } = week;

    const displayMonth = days[0].displayMonth;
    const thisMonth = displayMonth.getMonth();
    const monthOfData = days[6].date.getMonth();

    return (
        <TooltipProvider>
            <tr
                className={cn(
                    (classNames as any).tr,
                    thisMonth !== monthOfData &&
                    "last:-mr-[calc(var(--box-margin)+var(--box-size))]"
                )}
                style={
                    {
                        "--box-size": DAY_SIZE,
                        "--box-margin": DAY_MARGIN,
                        ...(styles as any)?.tr,
                    } as React.CSSProperties
                }
            >
                {days.map((day) => (
                    <Tooltip key={day.date.toISOString()}>
                        <TooltipContent>{`${dataMap.get(day.date.toISOString().split('T')[0]) || "No"
                            } activities on ${day.date.toDateString()}`}</TooltipContent>
                        <TooltipTrigger className="cursor-default">
                            <td
                                className={(classNames as any).td}
                                style={(styles as any)?.td}
                                role="presentation"
                            >
                                <DayComponent
                                    day={day}
                                    modifiers={(day as any).modifiers}
                                />
                            </td>
                        </TooltipTrigger>
                    </Tooltip>
                ))}
            </tr>
        </TooltipProvider>
    );
}