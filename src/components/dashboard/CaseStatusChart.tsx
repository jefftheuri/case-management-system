
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Sample data
const caseStatusData = [
  { name: "Active", value: 35, color: "#4299e1" },
  { name: "Pending", value: 15, color: "#f6e05e" },
  { name: "Closed", value: 25, color: "#48bb78" },
  { name: "On Hold", value: 5, color: "#a0aec0" },
];

const caseTypeData = [
  { name: "Family", value: 20 },
  { name: "Corporate", value: 15 },
  { name: "Real Estate", value: 12 },
  { name: "Criminal", value: 8 },
  { name: "Personal Injury", value: 22 },
  { name: "Other", value: 3 },
];

export function CaseStatusChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="card-hover-effect">
        <CardHeader>
          <CardTitle>Case Status</CardTitle>
          <CardDescription>Distribution of cases by current status</CardDescription>
        </CardHeader>
        <CardContent className="px-2">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={caseStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {caseStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} cases`, 'Count']}
                contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="card-hover-effect">
        <CardHeader>
          <CardTitle>Case Types</CardTitle>
          <CardDescription>Distribution of cases by practice area</CardDescription>
        </CardHeader>
        <CardContent className="px-2">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={caseTypeData}>
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                formatter={(value) => [`${value} cases`, 'Count']}
                contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
              />
              <Bar dataKey="value" fill="#2c5282" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
