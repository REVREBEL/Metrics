import { MoreVertical, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const socialData = [
  {
    name: "Facebook",
    category: "Social Media",
    visits: "10,436",
    change: "+15%",
    color: "bg-[#1877F2]",
    // You can use actual icons or images here
    icon: "https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg",
  },
  {
    name: "LinkedIn",
    category: "Professional Network",
    visits: "2,345",
    change: "+5%",
    color: "bg-[#0A66C2]",
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg",
  },
  {
    name: "Twitter",
    category: "Social Media",
    visits: "6,789",
    change: "-10%",
    color: "bg-[#000000]",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg",
  },
  {
    name: "Instagram",
    category: "Social Media",
    visits: "8,234",
    change: "+20%",
    color: "bg-gradient-to-tr from-[#FFD600] via-[#FF0069] to-[#7638FF]",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
  },
];

export default function SocialVisitsCard() {
  return (
    <Card className="w-full max-w-md border-none shadow-xl bg-white p-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle className="text-lg font-display upperase font-bold text-dark-blue">
          Social Network Visits
        </CardTitle>
        <MoreVertical className="h-5 w-5 text-gray-400 cursor-pointer" />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main Stats Summary */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-4xl font-extrabold text-[#0B1E3B]">50,232</span>
            <div className="flex items-center text-gray-500 font-medium text-sm">
              <ChevronUp className="h-4 w-4" />
              <span>16%</span>
            </div>
          </div>
          <p className="text-sm font-serif font-semibold text-slate-500">Last 6 months Visits</p>
        </div>

        {/* List of Social Networks */}
        <div className="space-y-5">
          {socialData.map((item) => {
            const isNegative = item.change.startsWith("-");
            return (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11 rounded-full border border-slate-100 shadow-sm">
                    <AvatarImage src={item.icon} className="p-2" />
                    <AvatarFallback className={item.color}>
                      {item.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#0B1E3B]">
                      {item.name}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-[#0B1E3B]">
                    {item.visits}
                  </span>
                  <Badge 
                    variant="secondary" 
                    className="bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md border-none"
                  >
                    {item.change}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}