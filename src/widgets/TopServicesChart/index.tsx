"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  { id: 1, name: "UI design", value: 99, color: "bg-[#A7C7D7]" },
  { id: 2, name: "UX design", value: 94, color: "bg-[#F9C775]" },
  { id: 3, name: "Music", value: 80, color: "bg-[#E45D1D]" },
  { id: 4, name: "Animation", value: 68, color: "bg-[#C92100]" },
  { id: 5, name: "React", value: 52, color: "bg-[#7A2D5C]" },
  { id: 6, name: "SEO", value: 45, color: "bg-[#0B1E3B]" },
];

export default function TopServicesChart() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <Card className="w-full max-w-4xl border-none shadow-xl bg-white p-6 font-sans">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-12">
        <CardTitle className="text-xl font-bold text-[#0B1E3B]">
          Top Services by Sales
        </CardTitle>
        <MoreVertical className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
      </CardHeader>
      
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left Side: Progress Bars */}
        <div className="relative pt-2">
          {/* Grid Lines & Labels */}
          <div className="absolute inset-0 flex justify-between pointer-events-none px-6">
            {[0, 25, 50, 75, 100].map((step) => (
              <div key={step} className="h-[220px] flex flex-col items-center">
                <div className="h-full border-l border-dashed border-gray-200" />
                <span className="text-[11px] font-medium text-gray-400 mt-3">{step}%</span>
              </div>
            ))}
          </div>

          {/* Bars Container */}
          <div className="space-y-5 relative z-10">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="flex items-center gap-4 group cursor-default"
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <span className="text-xs font-semibold text-gray-400 w-2">{service.id}</span>
                <div className="flex-1 h-8">
                  <div
                    className={`${service.color} h-full rounded-r-full flex items-center px-4 
                    transition-all duration-300 ease-out group-hover:brightness-105 group-hover:shadow-md`}
                    style={{ 
                        width: `${service.value}%`,
                        opacity: hoveredId === null || hoveredId === service.id ? 1 : 0.6 
                    }}
                  >
                    <span className="text-xs font-bold text-white whitespace-nowrap">
                      {service.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Stats Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 items-start pt-2">
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`transition-all duration-300 transform ${
                hoveredId === service.id ? "scale-110 translate-x-2" : "scale-100"
              } ${hoveredId !== null && hoveredId !== service.id ? "opacity-40 grayscale-[0.5]" : "opacity-100"}`}
            >
              <div className="flex items-center gap-3 mb-1">
                <div className={`h-2.5 w-2.5 rounded-full ${service.color}`} />
                <span className="text-sm font-semibold text-gray-500">
                  {service.name}
                </span>
              </div>
              <div className="text-3xl font-extrabold text-[#0B1E3B] tracking-tight">
                {service.value}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}