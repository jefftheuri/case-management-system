
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/dashboard/StatCard";
import { InvoiceList } from "@/components/billing/InvoiceList";
import { RetainersList } from "@/components/billing/RetainersList";
import { PaymentsList } from "@/components/billing/PaymentsList";
import { CreateInvoiceDialog } from "@/components/billing/CreateInvoiceDialog";
import { Plus, DollarSign, Receipt, Clock, CreditCard, Wallet } from "lucide-react";
import { useState } from "react";

const Billing = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
            <p className="text-muted-foreground mt-1">
              Manage invoices, payments, and retainer accounts
            </p>
          </div>
          <div className="flex gap-3">
            <CreateInvoiceDialog />
            <Button variant="outline">
              <Wallet className="mr-2 h-4 w-4" />
              New Payment
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" onValueChange={setActiveTab} value={activeTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="retainers">Retainers</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                title="Outstanding" 
                value="$45,250.00" 
                icon={<DollarSign />} 
                trend={{ value: 12, isPositive: false }}
              />
              <StatCard 
                title="Collected this month" 
                value="$32,800.00" 
                icon={<CreditCard />} 
                trend={{ value: 8, isPositive: true }}
              />
              <StatCard 
                title="Invoices sent" 
                value="24" 
                icon={<Receipt />} 
                description="Last 30 days"
              />
              <StatCard 
                title="Retainer balance" 
                value="$78,500.00" 
                icon={<Clock />} 
              />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <InvoiceList limit={5} />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentsList limit={5} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Retainer Accounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <RetainersList limit={5} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="invoices" className="space-y-6">
            <div className="flex justify-between">
              <div className="relative w-full md:w-96">
                <Input type="search" placeholder="Search invoices..." className="pl-8 w-full" />
              </div>
              <CreateInvoiceDialog />
            </div>
            <InvoiceList />
          </TabsContent>
          
          <TabsContent value="retainers" className="space-y-6">
            <div className="flex justify-between">
              <div className="relative w-full md:w-96">
                <Input type="search" placeholder="Search retainers..." className="pl-8 w-full" />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Retainer
              </Button>
            </div>
            <RetainersList />
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-6">
            <div className="flex justify-between">
              <div className="relative w-full md:w-96">
                <Input type="search" placeholder="Search payments..." className="pl-8 w-full" />
              </div>
              <Button variant="outline">
                <Wallet className="mr-2 h-4 w-4" />
                New Payment
              </Button>
            </div>
            <PaymentsList />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Billing;
