import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { 
  BarChart, Bar, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from "recharts";

// Mock data for the bar chart
const barData = [
  { val: 10 }, { val: 15 }, { val: 35 }, { val: 12 }, { val: 35 }, 
  { val: 20 }, { val: 25 }, { val: 10 }, { val: 30 }, { val: 38 }, 
  { val: 5 }, { val: 18 }, { val: 22 }, { val: 24 }, { val: 5 }
];

// Data for the multi-ring radial chart
const ringData = [
  { name: 'Inner', value: 70, color: '#f59e0b' },
  { name: 'Middle', value: 85, color: '#2dd4bf' },
  { name: 'Outer', value: 65, color: '#ef4444' },
];

export default function HospitalityDashboard() {
  return (
    <Card className="w-full max-w-4xl bg-[#f0f4f8] p-6 border-none shadow-lg">
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-0">
        
        {/* Left Side: Stats */}
        <div className="flex flex-col justify-between space-y-8">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[#1e3a5a] font-black text-2xl">OCCP</p>
              <p className="text-[#1e3a5a] text-4xl font-bold">67.2%</p>
              <div className="flex items-center text-cyan-600 text-sm font-semibold">
                <ArrowDown className="w-4 h-4 mr-1" /> 3% var
              </div>
            </div>
            <div>
              <p className="text-[#1e3a5a] font-black text-2xl uppercase">Rms</p>
              <p className="text-[#1e3a5a] text-4xl font-bold">3,340</p>
              <div className="flex items-center text-cyan-600 text-sm font-semibold">
                <ArrowUp className="w-4 h-4 mr-1" /> 1,645 var
              </div>
            </div>
          </div>

          {/* Budget Section */}
          <div>
            <p className="text-[#1e3a5a] font-black text-7xl tracking-tighter">BUDGET</p>
            <p className="text-[#1e3a5a] text-6xl font-bold mt-2">$670,146</p>
            <div className="flex items-center text-cyan-600 text-lg font-bold mt-2">
              <ArrowUp className="w-6 h-6 mr-1 fill-current" /> $128,167 var
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[#1e3a5a] font-black text-2xl">ADR</p>
              <p className="text-[#1e3a5a] text-4xl font-bold">$323.19</p>
              <div className="flex items-center text-red-500 text-sm font-semibold">
                <ArrowDown className="w-4 h-4 mr-1" /> $32.99 var
              </div>
            </div>
            <div>
              <p className="text-[#1e3a5a] font-black text-2xl">REVPAR</p>
              <p className="text-[#1e3a5a] text-4xl font-bold">$156.16</p>
              <div className="flex items-center text-cyan-600 text-sm font-semibold">
                <ArrowUp className="w-4 h-4 mr-1" /> $6.34 var
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Charts */}
        <div className="space-y-4">
          {/* Multi-Ring Chart Card */}
          <Card className="bg-[#e2edf7] border-none flex items-center justify-center p-4 relative overflow-hidden h-[300px]">
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <p className="text-[#1e3a5a] text-3xl font-bold">$262,125</p>
              <p className="text-[#1e3a5a] text-sm opacity-70">To Book</p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{v:1}]} innerRadius={80} outerRadius={120} dataKey="v" fill="#1e3a5a" stroke="none" />
                {/* Simplified rings logic: in production use Recharts RadialBarChart for this specific look */}
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Bar Chart Card */}
          <Card className="bg-[#e2edf7] border-none h-[150px] p-4 flex items-end">
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={barData}>
                <Bar dataKey="val" fill="#add8e6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}