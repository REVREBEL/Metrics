import { MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GoogleChromeColorCircle from "@/assets/BrowserCircleIconsColorReact/GoogleChromeColorCircle";
import FirefoxMozillaColorCircle from "@/assets/BrowserCircleIconsColorReact/FirefoxMozillaColorCircle";
import MicrosoftEdgeColorCircle from "@/assets/BrowserCircleIconsColorReact/MicrosoftEdgeColorCircle";
import OperaColorCircle from "@/assets/BrowserCircleIconsColorReact/OperaColorCircle";
import SafariColorCircle from "@/assets/BrowserCircleIconsColorReact/SafariColorCircle";
import type { ComponentType, SVGProps } from "react";

interface BrowserEntry {
  name: string;
  value: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const browserData: BrowserEntry[] = [
  { name: "Google Chrome", value: 54.6, icon: GoogleChromeColorCircle },
  { name: "Mozilla Firefox", value: 37.5, icon: FirefoxMozillaColorCircle },
  { name: "Microsoft Edge", value: 22.8, icon: MicrosoftEdgeColorCircle },
  { name: "Opera", value: 10, icon: OperaColorCircle },
  { name: "Safari", value: 6.7, icon: SafariColorCircle },
];

// Helper for the Circular Ring
const ProgressRing = ({ value }: { value: number }) => {
  const radius = 12;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-8 h-8 transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx="16"
          cy="16"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          className="text-slate-200"
        />
        {/* Progress Circle */}
        <circle
          cx="16"
          cy="16"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-[#0B1E3B]"
        />
      </svg>
    </div>
  );
};

export default function BrowserStatsCard() {
  return (
    <Card className="w-full border-none shadow-xl bg-white p-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="font-display font-bold uppercase tracking-widest text-dark-blue">
            Browser stats
          </CardTitle>
          <p className="text-sm font-serif font-semibold text-slate-400 mt-1">
            Counter April 2022
          </p>
        </div>
        <MoreVertical className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {browserData.map((browser) => {
          const IconComponent = browser.icon;
          return (
            <div key={browser.name} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <IconComponent className="w-9 h-9" />
                <span className="text-[10px] font-display font-bold uppercase tracking-widest text-dark-blue">
                  {browser.name}
                </span>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-sm font-bold text-slate-500">
                  {browser.value}%
                </span>
                <ProgressRing value={browser.value} />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}