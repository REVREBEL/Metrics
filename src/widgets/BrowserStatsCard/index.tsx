import { MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const browserData = [
  { name: "Google Chrome", value: 54.6, icon: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg" },
  { name: "Mozilla Firefox", value: 37.5, icon: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg" },
  { name: "Microsoft Edge", value: 22.8, icon: "https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg" },
  { name: "Opera", value: 10, icon: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Opera_Logo_2015.svg" },
  { name: "Safari", value: 6.7, icon: "https://upload.wikimedia.org/wikipedia/commons/5/52/Safari_browser_logo.svg" },
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
    <Card className="w-full max-w-md border-none shadow-xl bg-white p-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-display font-bold uppercase text-dark-blue">
            Browser states
          </CardTitle>
          <p className="text-sm font-serif font-semibold text-slate-400 mt-1">
            Counter April 2022
          </p>
        </div>
        <MoreVertical className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {browserData.map((browser) => (
          <div key={browser.name} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={browser.icon} 
                alt={browser.name} 
                className="w-9 h-9 object-contain"
              />
              <span className="text-sm font-bold text-dark-blue">
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
        ))}
      </CardContent>
    </Card>
  );
}