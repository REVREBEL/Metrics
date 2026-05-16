"use client";
// @ts-nocheck

import React, { Component, ErrorInfo, ReactNode } from "react";
import dynamic from "next/dynamic";

// Error boundary to prevent one broken widget from taking down the page
class ErrorBoundary extends Component<{children: ReactNode, name: string}, {hasError: boolean, error: any}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 text-red-800 rounded">
          <h3 className="font-bold">Failed to render {this.props.name}</h3>
          <p className="text-xs mt-2 overflow-auto max-h-32">{String(this.state.error)}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const Default_widgetsDailyPickupTable = dynamic(() => import("@/widgets/DailyPickupTable"), { ssr: false });
const Named_YearMonthSelector_widgetsYearMonthSelector = dynamic(() => import("@/widgets/YearMonthSelector").then(mod => mod.YearMonthSelector), { ssr: false });

export default function DailyPickupTable() {
  return (
    

    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">DailyPickupTable({51})</h1>        
        <div className="col-span-full border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/DailyPickupTable (Default)">@/widgets/DailyPickupTable (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/DailyPickupTable (Default)">
              <Default_widgetsDailyPickupTable />
            </ErrorBoundary>
          </div>
        </div>
    </div>
  </div>
  );
}
