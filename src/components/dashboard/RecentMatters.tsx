
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FolderOpen } from "lucide-react";

// Sample data
const recentMatters = [
  {
    id: "MT-2023-001",
    title: "Smith vs. Johnson",
    type: "Family Law",
    date: "2023-08-10",
    status: "Active",
    priority: "High"
  },
  {
    id: "MT-2023-002",
    title: "Brown Estate",
    type: "Probate",
    date: "2023-07-22",
    status: "Active",
    priority: "Medium"
  },
  {
    id: "MT-2023-003",
    title: "Williams Contract Dispute",
    type: "Corporate",
    date: "2023-08-05",
    status: "Active",
    priority: "Medium"
  },
  {
    id: "MT-2023-004",
    title: "Davis Injury Claim",
    type: "Personal Injury",
    date: "2023-07-15",
    status: "Active",
    priority: "Low"
  },
  {
    id: "MT-2023-005",
    title: "Miller vs. ABC Corp",
    type: "Litigation",
    date: "2023-08-01",
    status: "Active",
    priority: "High"
  }
];

export function RecentMatters() {
  const navigate = useNavigate();
  
  const handleMatterClick = (matterId: string) => {
    navigate(`/matters/${matterId}`);
  };
  
  return (
    <Card className="card-hover-effect">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl">Recent Matters</CardTitle>
          <CardDescription>Your most recently updated matters</CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate('/matters')}>
          <FolderOpen className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentMatters.map((matter) => (
            <div 
              key={matter.id} 
              className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0 cursor-pointer hover:bg-muted/50 -mx-1 px-1 rounded"
              onClick={() => handleMatterClick(matter.id)}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{matter.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {matter.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{matter.id} • {new Date(matter.date).toLocaleDateString()}</p>
              </div>
              <Badge 
                className={
                  matter.priority === "High" 
                    ? "bg-red-100 text-red-800 hover:bg-red-100" 
                    : matter.priority === "Medium"
                    ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                    : "bg-green-100 text-green-800 hover:bg-green-100"
                }
              >
                {matter.priority}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
