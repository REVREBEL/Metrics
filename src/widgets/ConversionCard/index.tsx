import React, { useState, useMemo } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Label,
  AreaChart,
  Area
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
import { MoreVertical, Info, TrendingUp, TrendingDown, Share2, RefreshCw, Edit3 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * BRAND THEME CONFIGURATION
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

const sparklineData = [
  { value: 40 }, { value: 35 }, { value: 55 }, { value: 45 }, 
  { value: 70 }, { value: 65 }, { value: 85 }, { value: 75 }
];

const ConversionCard = () => {
  return (
    <Card className="w-full max-w-[500px] shadow-xl border-slate-200 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-[#0B1E3F] text-sm font-bold uppercase tracking-widest">
              Conversion rate
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1 text-xs">
              Compared to last month
            </CardDescription>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical className="h-5 w-5 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 p-0 overflow-hidden rounded-md border-slate-200 shadow-lg">
              <DropdownMenuItem className="py-2.5 px-4 text-xs font-semibold text-slate-600 focus:bg-slate-50 cursor-pointer border-b border-slate-100 flex gap-2">
                <Share2 className="h-3.5 w-3.5" /> Share
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2.5 px-4 text-xs font-semibold text-white bg-[#4ECDC4] focus:bg-[#45B8B0] focus:text-white cursor-pointer border-b border-slate-100 flex gap-2">
                <Edit3 className="h-3.5 w-3.5" /> Update
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2.5 px-4 text-xs font-semibold text-slate-600 focus:bg-slate-50 cursor-pointer flex gap-2">
                <RefreshCw className="h-3.5 w-3.5" /> Refresh
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Top Big Stat Section */}
        <div className="flex items-end justify-between px-1">
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-black text-[#0B1E3F]">92.8%</span>
            <div className="flex items-center text-[#0B1E3F] text-xs font-bold gap-1 mb-1">
              <TrendingUp className="h-3 w-3" /> 6.3%
            </div>
          </div>
          
          {/* Sparkline */}
          <div className="h-16 w-32 -mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F7C97E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F7C97E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#F7C97E" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#colorVal)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* List of Stats */}
        <div className="space-y-5 pt-2">
          {[
            { label: 'Impressions', sub: '12.2K Visits', val: '20.3%', up: true },
            { label: 'Added to cart', sub: '32 product in cart', val: '6.3%', up: true },
            { label: 'Checkout', sub: '15 Product checkout', val: '9.56%', up: false },
            { label: 'Purchased', sub: '12 orders', val: '2.62%', up: true },
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between items-center px-1">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-[#0B1E3F]">{item.label}</h4>
                <p className="text-[11px] text-slate-400 font-medium">{item.sub}</p>
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-bold ${item.up ? 'text-slate-700' : 'text-slate-700'}`}>
                {item.up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {item.val}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const App = () => {
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
    <div className="p-8 bg-slate-50 min-h-screen flex flex-col items-center gap-12 font-sans">
      
      {/* Existing Budget Breakdown Card */}
      <Card className="w-full max-w-[500px] shadow-xl border-slate-200 overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-[#0B1E3F] text-sm font-bold uppercase tracking-widest">
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
              <TabsTrigger value="budget" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-[10px] uppercase tracking-widest font-bold">
                Budget
              </TabsTrigger>
              <TabsTrigger value="forecast" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-[10px] uppercase tracking-widest font-bold">
                {isFutureDate ? 'OTB' : 'Actuals'}
              </TabsTrigger>
              <TabsTrigger value="stly" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-[10px] uppercase tracking-widest font-bold">
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
                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 20} className="fill-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
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

          <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 mb-2">
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
                      <span className="text-sm font-bold text-slate-700">{item.name}</span>
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

      {/* New Website Conversion Card */}
      <ConversionCard />

    </div>
  );
};

export default App;