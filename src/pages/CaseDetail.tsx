
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Clock, 
  FileText, 
  Users, 
  Calendar, 
  MessageSquare,
  AlertCircle,
  CheckCircle,
  PauseCircle,
  CheckSquare 
} from "lucide-react";
import { CaseTimeline } from "@/components/cases/CaseTimeline";
import { CaseDocuments } from "@/components/cases/CaseDocuments";
import { CaseNotes } from "@/components/cases/CaseNotes";
import { TaskList, Task } from "@/components/cases/TaskList";

// Temporary sample data - would be fetched from API in a real app
const cases = [
  {
    id: "CS-2023-001",
    title: "Smith vs. Johnson",
    client: "Mary Smith",
    clientId: "CL-2023-001",
    type: "Family Law",
    date: "2023-08-10",
    status: "Active",
    priority: "High",
    description: "Divorce proceedings involving custody of two children and division of assets including real estate and retirement accounts.",
    assignedTo: "John Doe",
    courtDate: "2023-11-15",
    filingDate: "2023-08-05",
    dueDate: "2023-12-20",
    opposingParty: "Robert Johnson",
    opposingCounsel: "Jane Wilson, Wilson & Associates",
    caseNumber: "FL-2023-45678",
    jurisdiction: "Superior Court of Los Angeles County",
    billableHours: 27.5,
    lastActivity: "2023-10-12"
  },
  {
    id: "CS-2023-002",
    title: "Brown Estate",
    client: "James Brown Jr.",
    clientId: "CL-2023-003",
    type: "Probate",
    date: "2023-07-22",
    status: "Active",
    priority: "Medium",
    description: "Administration of the estate of James Brown Sr., including distribution of assets to five heirs and resolution of outstanding debts.",
    assignedTo: "Sarah Parker",
    courtDate: "2023-09-30",
    filingDate: "2023-07-15",
    dueDate: "2023-11-30",
    opposingParty: "N/A",
    opposingCounsel: "N/A",
    caseNumber: "PR-2023-98765",
    jurisdiction: "Probate Court of Cook County",
    billableHours: 18.2,
    lastActivity: "2023-10-05"
  },
  {
    id: "CS-2023-003",
    title: "Williams Contract Dispute",
    client: "Williams Corp",
    clientId: "CL-2023-005",
    type: "Corporate",
    date: "2023-08-05",
    status: "Active",
    priority: "Medium",
    description: "Breach of contract claim against vendor for failure to deliver software implementation according to specifications.",
    assignedTo: "Michael Chen",
    courtDate: "2023-12-10",
    filingDate: "2023-08-01",
    dueDate: "2024-02-15",
    opposingParty: "TechSolutions Inc.",
    opposingCounsel: "David Thompson, Legal Tech LLP",
    caseNumber: "CV-2023-87654",
    jurisdiction: "Commercial Division, New York County",
    billableHours: 32.7,
    lastActivity: "2023-10-14"
  }
];

// Sample tasks data
const sampleTasks: Task[] = [
  {
    id: "task-1",
    caseId: "CS-2023-001",
    title: "Prepare Discovery Documents",
    description: "Draft and compile discovery requests for opposing counsel",
    dueDate: "2023-11-01T00:00:00.000Z",
    assignedTo: "John Doe",
    priority: "High",
    status: "In Progress",
    createdAt: "2023-10-01T00:00:00.000Z"
  },
  {
    id: "task-2",
    caseId: "CS-2023-001",
    title: "Schedule Client Meeting",
    description: "Discuss case strategy and upcoming court date",
    dueDate: "2023-10-25T00:00:00.000Z",
    assignedTo: "Sarah Parker",
    priority: "Medium",
    status: "To Do",
    createdAt: "2023-10-05T00:00:00.000Z"
  },
  {
    id: "task-3",
    caseId: "CS-2023-001",
    title: "File Motion to Compel",
    description: "Prepare and file motion to compel document production",
    dueDate: "2023-10-15T00:00:00.000Z",
    assignedTo: "John Doe",
    priority: "High",
    status: "Completed",
    createdAt: "2023-10-03T00:00:00.000Z"
  }
];

const CaseDetail = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Find the case by ID
  const caseDetail = cases.find(c => c.id === caseId);
  
  // Filter tasks for this case
  const caseTasks = sampleTasks.filter(task => task.caseId === caseId);
  
  if (!caseDetail) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold">Case Not Found</h2>
          <p className="text-muted-foreground mb-6">The case you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/cases')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cases
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "On Hold":
        return <PauseCircle className="h-4 w-4 text-orange-500" />;
      case "Closed":
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "On Hold":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "Medium":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "Low":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <Button 
            variant="outline" 
            className="w-fit" 
            onClick={() => navigate('/cases')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cases
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{caseDetail.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-muted-foreground">{caseDetail.id}</p>
                <Badge 
                  variant="outline"
                  className={getStatusColor(caseDetail.status)}
                >
                  {getStatusIcon(caseDetail.status)}
                  <span className="ml-1">{caseDetail.status}</span>
                </Badge>
                <Badge className={getPriorityColor(caseDetail.priority)}>
                  {caseDetail.priority} Priority
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                Log Time
              </Button>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Add Document
              </Button>
              <Button>
                <MessageSquare className="mr-2 h-4 w-4" />
                Add Note
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full md:w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="tasks">
              Tasks
              {caseTasks.filter(task => task.status !== "Completed").length > 0 && (
                <Badge className="ml-2 bg-primary text-primary-foreground">
                  {caseTasks.filter(task => task.status !== "Completed").length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Case Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Type</p>
                      <p>{caseDetail.type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Filing Date</p>
                      <p>{new Date(caseDetail.filingDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Case Number</p>
                      <p>{caseDetail.caseNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Jurisdiction</p>
                      <p>{caseDetail.jurisdiction}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Court Date</p>
                      <p>{new Date(caseDetail.courtDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                      <p>{new Date(caseDetail.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
                    <p className="text-sm">{caseDetail.description}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Parties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Client</p>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto" 
                      onClick={() => navigate(`/clients/${caseDetail.clientId}`)}
                    >
                      {caseDetail.client}
                    </Button>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
                    <p>{caseDetail.assignedTo}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Opposing Party</p>
                    <p>{caseDetail.opposingParty}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Opposing Counsel</p>
                    <p>{caseDetail.opposingCounsel}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Billing Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Billable Hours</p>
                      <p>{caseDetail.billableHours} hours</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Last Activity</p>
                      <p>{new Date(caseDetail.lastActivity).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Complete Billing
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Upcoming Dates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Court Appearance</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(caseDetail.courtDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Filing Deadline</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(caseDetail.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Full Calendar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-6">
            <CaseTimeline caseId={caseDetail.id} />
          </TabsContent>
          
          <TabsContent value="documents" className="mt-6">
            <CaseDocuments caseId={caseDetail.id} />
          </TabsContent>
          
          <TabsContent value="tasks" className="mt-6">
            <TaskList caseId={caseDetail.id} initialTasks={caseTasks} />
          </TabsContent>
          
          <TabsContent value="notes" className="mt-6">
            <CaseNotes caseId={caseDetail.id} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CaseDetail;
