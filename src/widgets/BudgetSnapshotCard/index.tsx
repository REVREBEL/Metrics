"use client"

import React, { useState, useMemo } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Label 
} from 'recharts';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { MoreVertical, Info } from 'lucide-react';

/**
 * BRAND THEME CONFIGURATION
 * In a real shadcn setup, these would map to CSS variables in globals.css
 * e.g. color: "var(--chart-1)"
 */
const CHART_CONFIG = {
  transient: { label: "Transient", color: "#A7C7D7" },
  group: { label: "Group", color: "#F7C97E" },
  contract: { label: "Contract", color: "#E15D24" },
  ancillary: { label: "F&B Ancillary", color: "#CD2100" },
  other: { label: "Other Revenue", color: "#7C2D5C" },
};

const HOTEL_DATA = {
  budget: [
    { name: 'Transient', value: 1250, color: CHART_CONFIG.transient.color },
    { name: 'Group', value: 850, color: CHART_CONFIG.group.color },
    { name: 'Contract', value: 320, color: CHART_CONFIG.contract.color },
    { name: 'F&B Ancillary', value: 185, color: CHART_CONFIG.ancillary.color },
    { name: 'Other Revenue', value: 50, color: CHART_CONFIG.other.color },
  ],
  forecast: [
    { name: 'Transient', value: 1100, color: CHART_CONFIG.transient.color },
    { name: 'Group', value: 920, color: CHART_CONFIG.group.color },
    { name: 'Contract', value: 310, color: CHART_CONFIG.contract.color },
    { name: 'F&B Ancillary', value: 210, color: CHART_CONFIG.ancillary.color },
    { name: 'Other Revenue', value: 45, color: CHART_CONFIG.other.color },
  ],
  stly: [
    { name: 'Transient', value: 1180, color: CHART_CONFIG.transient.color },
    { name: 'Group', value: 790, color: CHART_CONFIG.group.color },
    { name: 'Contract', value: 300, color: CHART_CONFIG.contract.color },
    { name: 'F&B Ancillary', value: 170, color: CHART_CONFIG.ancillary.color },
    { name: 'Other Revenue', value: 60, color: CHART_CONFIG.other.color },
  ]
};

export default function BudgetSnapshotCard() {
  const [activeTab, setActiveTab] = useState('budget');
  const isFutureDate = true; 
  
  const currentData = HOTEL_DATA[activeTab];
  const totalSpend = useMemo(() => 
    currentData.reduce((acc, curr) => acc + curr.value, 0), 
    [currentData]
  );

  const getSubLabel = () => {
    switch(activeTab) {
      case 'budget': return 'total budget';
      case 'forecast': return isFutureDate ? 'expected otb' : 'actual revenue';
      case 'stly': return 'prior year total';
      default: return 'total spend';
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen flex items-center justify-center font-sans">
      <Card className="w-full max-w-[500px] shadow-xl border-slate-200 overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              {/* THEME APPLIED: Uppercase, tracking-wider, bold */}
              <CardTitle className="text-[#0B1E3F] text-sm font-display font-bold uppercase tracking-widest">
                Budget Breakdown
              </CardTitle>
              <CardDescription className="text-slate-500 mt-1 text-xs">
                Spend distribution across teams and cost categories.
              </CardDescription>
            </div>
            <MoreVertical className="h-5 w-5 text-slate-400 cursor-pointer" />
          </div>

          <Tabs defaultValue="budget" className="w-full mt-6" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-slate-100/50 p-1 rounded-lg">
              {/* THEME APPLIED: Uppercase tab labels via utility classes */}
              <TabsTrigger value="budget" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-[10px] font-display uppercase tracking-widest font-bold">
                Budget
              </TabsTrigger>
              <TabsTrigger value="forecast" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-[10px] font-display uppercase tracking-widest font-bold">
                {isFutureDate ? 'OTB' : 'Actuals'}
              </TabsTrigger>
              <TabsTrigger value="stly" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-[10px] font-display uppercase tracking-widest font-bold">
                STLY
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="h-[260px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {currentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} className="outline-none" />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-[#0B1E3F] text-2xl font-black">
                              ${totalSpend.toLocaleString()}
                            </tspan>
                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 20} className="fill-slate-400 text-[10px] font-display font-bold uppercase tracking-[0.2em]">
                              {getSubLabel()}
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between text-[10px] font-display font-black text-slate-400 uppercase tracking-[0.2em] px-2 mb-2">
            <span>Segment</span>
            <span>Amount / Share</span>
          </div>

          <div className="space-y-0">
            {currentData.map((item) => {
              const percentage = ((item.value / totalSpend) * 100).toFixed(1);
              return (
                <div key={item.name} className="group">
                  <Separator className="bg-slate-200/60" />
                  <div className="flex items-center justify-between py-3 px-2 transition-colors hover:bg-slate-50/80 cursor-default">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-display font-bold text-slate-700 uppercase tracking-widest">{item.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-black text-[#0B1E3F]">
                        ${item.value.toLocaleString()}
                      </span>
                      <div 
                        className="min-w-[60px] text-center py-1 px-2 rounded text-[10px] font-black"
                        style={{ 
                          backgroundColor: `${item.color}15`, 
                          color: '#0B1E3F',
                          border: `1px solid ${item.color}30`
                        }}
                      >
                        {percentage}%
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
            <Info className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              <strong className="text-slate-700 uppercase tracking-wider text-[9px]">Insight:</strong> {activeTab === 'forecast' 
                ? "Pacing is currently 4.2% ahead of STLY. Group bookings for Q3 are showing strong conversion." 
                : "Spend distribution remains consistent with seasonal trends. No major variance detected."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
