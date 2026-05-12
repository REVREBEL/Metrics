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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MoreVertical, TrendingUp, Info } from 'lucide-react';

// --- MOCK DATA GENERATOR ---
// In a real app, this would come from your global filters/API
const HOTEL_DATA = {
  budget: [
    { name: 'Transient', value: 1250, color: '#A7C7D7' },
    { name: 'Group', value: 850, color: '#F7C97E' },
    { name: 'Contract', value: 320, color: '#E15D24' },
    { name: 'F&B Ancillary', value: 185, color: '#CD2100' },
    { name: 'Other Revenue', value: 50, color: '#7C2D5C' },
  ],
  forecast: [
    { name: 'Transient', value: 1100, color: '#A7C7D7' },
    { name: 'Group', value: 920, color: '#F7C97E' },
    { name: 'Contract', value: 310, color: '#E15D24' },
    { name: 'F&B Ancillary', value: 210, color: '#CD2100' },
    { name: 'Other Revenue', value: 45, color: '#7C2D5C' },
  ],
  stly: [
    { name: 'Transient', value: 1180, color: '#A7C7D7' },
    { name: 'Group', value: 790, color: '#F7C97E' },
    { name: 'Contract', value: 300, color: '#E15D24' },
    { name: 'F&B Ancillary', value: 170, color: '#CD2100' },
    { name: 'Other Revenue', value: 60, color: '#7C2D5C' },
  ]
};

const App = () => {
  const [activeTab, setActiveTab] = useState('budget');
  
  // Logic to determine if we show "Actuals" or "OTB"
  // If the selected month is in the past, we show "Actuals". 
  // If in the future, we show "OTB" (On The Books).
  const isFutureDate = true; // This would be calculated based on your dashboard date filter
  
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
    <div className="p-8 bg-slate-50 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-[500px] shadow-xl border-slate-200">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-[#0B1E3F] text-xl font-bold">Top Line Revenue</CardTitle>
              <CardDescription className="text-slate-500 mt-1">
                Distribution across market segments & departments.
              </CardDescription>
            </div>
            <MoreVertical className="h-5 w-5 text-slate-400 cursor-pointer" />
          </div>

          <Tabs defaultValue="budget" className="w-full mt-6" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-slate-100/50 p-1 rounded-lg">
              <TabsTrigger value="budget" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-semibold">
                Budget
              </TabsTrigger>
              <TabsTrigger value="forecast" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-semibold">
                {isFutureDate ? 'Forecast/OTB' : 'Actuals'}
              </TabsTrigger>
              <TabsTrigger value="stly" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-semibold">
                STLY
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Chart Section */}
          <div className="h-[280px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {currentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-[#0B1E3F] text-3xl font-bold"
                            >
                              ${totalSpend.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 20}
                              className="fill-slate-500 text-xs font-medium uppercase tracking-wider"
                            >
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

          {/* Table Headers */}
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">
            <span>Segment</span>
            <span>Amount / Share</span>
          </div>

          {/* Breakdown List */}
          <div className="space-y-1">
            {currentData.map((item) => {
              const percentage = ((item.value / totalSpend) * 100).toFixed(1);
              return (
                <div key={item.name} className="group">
                  <Separator className="opacity-50" />
                  <div className="flex items-center justify-between py-3 px-2 transition-colors hover:bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-1 h-5 rounded-full" 
                        style={{ backgroundColor: item.color }} 
                      />
                      <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-slate-900">
                        ${item.value.toLocaleString()}
                      </span>
                      <div 
                        className="min-w-[55px] text-center py-1 px-2 rounded text-[11px] font-bold"
                        style={{ 
                          backgroundColor: `${item.color}20`, 
                          color: '#0B1E3F',
                          border: `1px solid ${item.color}40`
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

          {/* Footer Info */}
          <div className="mt-6 p-3 bg-[#E0F2F1]/30 rounded-lg border border-[#B2DFDB]/30 flex items-start gap-3">
            <Info className="h-4 w-4 text-[#00796B] mt-0.5" />
            <p className="text-[11px] text-[#00695C] leading-relaxed">
              <strong>Analysis:</strong> {activeTab === 'forecast' && isFutureDate 
                ? "OTB is currently pace-ahead by 4.2% vs Budget. Group pickup is higher than expected for this period." 
                : "Displaying finalized revenue figures. Seasonal variance is within acceptable ±3% margin."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;