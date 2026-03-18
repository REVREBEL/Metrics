"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChartHeader } from "@widgets/metric-cards/components/shared-components";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  Tooltip,
} from "recharts";

// ----------------------------------------------------
// A. Active Users by Gender (Donut Chart)
// ----------------------------------------------------
const genderData = [
  { name: "Female", value: 54.9, fill: "#1A73E8" }, // Blue
  { name: "Male", value: 45.1, fill: "#EFF8FA" }, // Very Light Blue/Gray
];

export function ActiveUsersGenderCard() {
  return (
    <Card className="w-full max-w-sm p-6 border-none shadow-md bg-white relative">
      <ChartHeader label="Active Users" total="Gender Split" />
      
      <div className="flex justify-center items-center h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={genderData}
              innerRadius={50}
              outerRadius={65}
              startAngle={90}
              endAngle={450}
              dataKey="value"
              cornerRadius={8}
              stroke="none"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 mt-2">
        {genderData.map((gender) => (
          <div key={gender.name} className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full`} style={{ backgroundColor: gender.fill }} />
            <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{gender.name}</span>
                <span className="text-2xl font-extrabold text-[#0B1E3B]">{gender.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ----------------------------------------------------
// B. Active Users by Interests (Table/List)
// ----------------------------------------------------
const interestsData = [
  { name: "News & Politics/Avid News ...", value: 650 },
  { name: "Travel/Travel Buffs", value: 485 },
  { name: "Banking & Finance/Avid Inve...", value: 450 },
  { name: "Sports & Fitness/Sports Fan...", value: 422 },
  { name: "Shoppers/Shopping Enthusi...", value: 416 },
  { name: "Technology/Technophiles", value: 406 },
  { name: "Lifestyles & Hobbies/Shutter...", value: 400 },
];

export function ActiveUsersInterestsCard() {
  return (
    <Card className="w-full max-w-xl p-6 border-none shadow-md bg-white">
      <ChartHeader label="Top Interests" total="Active Users" />

      <div className="overflow-x-auto mt-6">
        <table className="w-full text-left">
          <thead className="border-b border-gray-100">
            <tr>
              <th className="text-xs font-semibold text-gray-400 uppercase pb-3">Interests</th>
              <th className="text-xs font-semibold text-gray-400 uppercase pb-3 text-right">Active Users</th>
            </tr>
          </thead>
          <tbody>
            {interestsData.map((interest, index) => (
              <tr key={interest.name} className={`group ${index !== interestsData.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <td className="text-sm font-semibold text-[#0B1E3B] py-3.5 group-hover:text-[#1A73E8]">
                  {interest.name}
                </td>
                <td className="text-sm font-bold text-[#0B1E3B] py-3.5 text-right tabular-nums">
                  {interest.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// ----------------------------------------------------
// C. Active Users by Age (Horizontal Bar Chart)
// ----------------------------------------------------
const ageData = [
  { range: "35-44", value: 460 },
  { range: "25-34", value: 370 },
  { range: "45-54", value: 330 },
  { range: "55-64", value: 285 },
  { range: "18-24", value: 220 },
  { range: "65+", value: 195 },
];

export function ActiveUsersAgeCard() {
  return (
    <Card className="w-full max-w-xl p-6 border-none shadow-md bg-white">
      <ChartHeader label="Age Distribution" total="Active Users" />

      <div className="h-56 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={ageData}
            layout="vertical"
            margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
            barCategoryGap={8}
          >
            <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{ border: 'none', borderRadius: '8px', padding: '12px', background: '#0B1E3B', color: '#fff', boxShadow: 'none' }}
                labelStyle={{ fontWeight: 'bold' }}
                itemStyle={{ fontSize: '12px' }}
                formatter={(value) => `${value} Users`}
            />
            {/* Custom YAxis labels */}
            <YAxis
              dataKey="range"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fontWeight: 'medium', fill: '#0B1E3B' }}
            />
            
            {/* The Horizontal Bars */}
            <Bar
              dataKey="value"
              fill="#1A73E8"
              radius={[4, 4, 4, 4]} // Rounded on all corners
              barSize={20}
              // Optional: Add value labels above bars
              // label={{ position: 'right', fill: '#0B1E3B', fontSize: 11, fontWeight: 'bold' }} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}