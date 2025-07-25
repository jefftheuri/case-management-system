
import MainLayout from "@/layouts/MainLayout";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ClientInteractionsList } from "@/components/client-interactions/ClientInteractionsList";
import { ClientInteractionForm } from "@/components/client-interactions/ClientInteractionForm";
import { RecentInteractions } from "@/components/client-interactions/RecentInteractions";

export default function ClientInteractions() {
  const [activeTab, setActiveTab] = useState("all");
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Client Interactions</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage all client communications
          </p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Interactions</TabsTrigger>
            <TabsTrigger value="add">Add Interaction</TabsTrigger>
            <TabsTrigger value="recent">Recent Interactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <ClientInteractionsList />
          </TabsContent>
          
          <TabsContent value="add" className="space-y-4">
            <ClientInteractionForm onSuccess={() => setActiveTab("all")} />
          </TabsContent>
          
          <TabsContent value="recent" className="space-y-4">
            <RecentInteractions />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
