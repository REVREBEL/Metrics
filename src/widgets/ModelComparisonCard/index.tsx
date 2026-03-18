import { ChevronDown, Plus, Minus, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const channelData = [
  { name: "Organic Social", change: 26.4 },
  { name: "Referral", change: 9.7 },
  { name: "Paid Search", change: 9.5 },
  { name: "Unassigned", change: 0.1 },
  { name: "Direct", change: 0.0 },
  { name: "Email", change: 0.0 },
  { name: "Paid Social", change: 0.0 },
];

// Custom Comparison Bar Component
const ComparisonBar = ({ value }: { value: number }) => {
  // Max scale is roughly 50% for visual balance
  const max = 50; 
  const width = Math.min(Math.abs(value), max);
  const isPositive = value >= 0;

  return (
    <div className="relative w-32 h-1.5 bg-gray-200 rounded-full flex items-center">
      {/* Center Baseline */}
      <div className="absolute left-1/2 h-3 w-[1px] bg-gray-400 z-10" />
      
      {/* Blue Progress Fill */}
      <div 
        className="absolute h-full bg-light-green transition-all duration-500"
        style={{
          width: `${(width / max) * 50}%`,
          left: isPositive ? "50%" : "auto",
          right: !isPositive ? "50%" : "auto",
        }}
      />
    </div>
  );
};

export default function ModelComparisonCard() {
  return (
    <Card className="w-full max-w-2xl border border-gray-200 shadow-sm bg-white rounded-xl">
      <CardHeader className="p-6 space-y-4">
        {/* Top Dropdowns */}
        <div className="flex items-center gap-4 text-sm">
          <div className="space-y-1">
            <button className="flex items-center gap-1 font-serif font-bold text-dark-blue hover:bg-gray-50 p-1 rounded">
              Last click <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
            <p className="text-[11px] text-gray-400">Paid and organic channels</p>
          </div>

          <span className="text-gray-400 font-medium">vs</span>

          <div className="space-y-1">
            <button className="flex items-center gap-1 font-serif font-bold text-dark-blue hover:bg-gray-50 p-1 rounded">
              Data-driven <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
            <p className="text-[11px] text-gray-400">Paid and organic channels</p>
          </div>

          <div className="ml-auto flex items-center border border-gray-200 rounded-full px-2 py-1 gap-1">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </div>
        </div>

        {/* Table Headers */}
        <div className="flex items-center justify-between text-[10px] font-display font-bold text-dark-blue uppercase tracking-widest pt-2">
          <span>Primary Channel Group (Default Channel Group)</span>
          <div className="flex items-center gap-8">
            <span>Key Events % Change</span>
            <div className="flex gap-4">
              <Minus className="h-3 w-3 cursor-pointer" />
              <Plus className="h-3 w-3 cursor-pointer" />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-4">
        <div className="divide-y divide-gray-100">
          {channelData.map((channel) => (
            <div key={channel.name} className="flex items-center justify-between py-3 group hover:bg-gray-50/50">
              <span className="text-sm font-bold text-gray-700">{channel.name}</span>
              
              <div className="flex items-center gap-8">
                <span className="text-xs font-medium text-gray-500 w-12 text-right">
                  {channel.change.toFixed(1)}%
                </span>
                <ComparisonBar value={channel.change} />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <button className="w-full flex items-center justify-end gap-2 text-dark-blue text-sm font-bold mt-6 hover:underline">
          View model comparison
          <ArrowRight className="h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
}