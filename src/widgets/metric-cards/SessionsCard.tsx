
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { LineChart, Line, Pie, PieChart, CartesianGrid , ResponsiveContainer} from 'recharts';
import  { CardHeaderData }  from "@/widgets/metric-cards/components/card-header";

const lineData = [{v: 10}, {v: 40}, {v: 25}, {v: 60}, {v: 50}, {v: 90}];

export const SessionsCard = () => (
  <Card className="p-6 h-64 border-none shadow-md">
    <ResponsiveContainer width="100%" height={100}>
      <LineChart data={lineData}>
        <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke="#CBD5E1" />
        <Line type="linear" dataKey="v" stroke="#C92100" strokeWidth={2} dot={{ r: 4, fill: "#C92100", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  </Card>
);