
import MainLayout from "@/layouts/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentCases } from "@/components/dashboard/RecentCases";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { CaseStatusChart } from "@/components/dashboard/CaseStatusChart";
import { FolderOpen, FileText, Users, Calendar } from "lucide-react";

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your practice.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Active Matters" 
            value={35}
            description="Current open matters" 
            icon={<FolderOpen className="h-5 w-5" />} 
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard 
            title="Documents" 
            value={248}
            description="Across all matters" 
            icon={<FileText className="h-5 w-5" />} 
            trend={{ value: 7, isPositive: true }}
          />
          <StatCard 
            title="Clients" 
            value={87}
            description="Total active clients" 
            icon={<Users className="h-5 w-5" />} 
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard 
            title="Upcoming Events" 
            value={12}
            description="In the next 7 days" 
            icon={<Calendar className="h-5 w-5" />} 
            trend={{ value: 3, isPositive: false }}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <RecentCases />
          <UpcomingEvents />
        </div>

        <CaseStatusChart />
      </div>
    </MainLayout>
  );
};

export default Index;
