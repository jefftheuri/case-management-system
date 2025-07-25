
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FolderOpen, Plus, Search, MoreHorizontal, Filter } from "lucide-react";
import { CreateMatterDialog } from "@/components/matters/CreateMatterDialog";
import { useState } from "react";

// Sample data
const matters = [
  {
    id: "MT-2023-001",
    title: "Smith vs. Johnson",
    client: "Mary Smith",
    type: "Family Law",
    date: "2023-08-10",
    status: "Active",
    priority: "High"
  },
  {
    id: "MT-2023-002",
    title: "Brown Estate",
    client: "James Brown Jr.",
    type: "Probate",
    date: "2023-07-22",
    status: "Active",
    priority: "Medium"
  },
  {
    id: "MT-2023-003",
    title: "Williams Contract Dispute",
    client: "Williams Corp",
    type: "Corporate",
    date: "2023-08-05",
    status: "Active",
    priority: "Medium"
  },
  {
    id: "MT-2023-004",
    title: "Davis Injury Claim",
    client: "Sarah Davis",
    type: "Personal Injury",
    date: "2023-07-15",
    status: "Active",
    priority: "Low"
  },
  {
    id: "MT-2023-005",
    title: "Miller vs. ABC Corp",
    client: "Robert Miller",
    type: "Litigation",
    date: "2023-08-01",
    status: "Active",
    priority: "High"
  },
  {
    id: "MT-2023-006",
    title: "Wilson Divorce",
    client: "Michael Wilson",
    type: "Family Law",
    date: "2023-06-12",
    status: "Pending",
    priority: "Medium"
  },
  {
    id: "MT-2023-007",
    title: "Taylor Property Dispute",
    client: "Emily Taylor",
    type: "Real Estate",
    date: "2023-07-28",
    status: "Active",
    priority: "Medium"
  },
  {
    id: "MT-2023-008",
    title: "Harris Will Contest",
    client: "Thomas Harris",
    type: "Probate",
    date: "2023-06-30",
    status: "On Hold",
    priority: "Low"
  },
  {
    id: "MT-2023-009",
    title: "Lee vs. State",
    client: "Jennifer Lee",
    type: "Criminal Defense",
    date: "2023-08-07",
    status: "Active",
    priority: "High"
  },
  {
    id: "MT-2023-010",
    title: "Clark Business Formation",
    client: "Clark Enterprises",
    type: "Corporate",
    date: "2023-07-03",
    status: "Closed",
    priority: "Low"
  }
];

const Matters = () => {
  const navigate = useNavigate();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  
  const handleViewDetails = (matterId: string) => {
    navigate(`/matters/${matterId}`);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Matters</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all your legal matters
            </p>
          </div>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Matter
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search matters..." 
              className="pl-8 w-full" 
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex-1 md:flex-none">
                  Status: All
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>Active</DropdownMenuItem>
                <DropdownMenuItem>Pending</DropdownMenuItem>
                <DropdownMenuItem>On Hold</DropdownMenuItem>
                <DropdownMenuItem>Closed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matter ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matters.map((matter) => (
                <TableRow 
                  key={matter.id} 
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleViewDetails(matter.id)}
                >
                  <TableCell className="font-medium">{matter.id}</TableCell>
                  <TableCell>{matter.title}</TableCell>
                  <TableCell>{matter.client}</TableCell>
                  <TableCell className="hidden md:table-cell">{matter.type}</TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(matter.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        matter.status === "Active" 
                          ? "bg-green-100 text-green-800 border-green-200" 
                          : matter.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                          : matter.status === "On Hold"
                          ? "bg-orange-100 text-orange-800 border-orange-200"
                          : "bg-gray-100 text-gray-800 border-gray-200"
                      }
                    >
                      {matter.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(matter.id)}>
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit matter</DropdownMenuItem>
                        <DropdownMenuItem>Add document</DropdownMenuItem>
                        <DropdownMenuItem>Close matter</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <CreateMatterDialog 
          open={createDialogOpen} 
          onOpenChange={setCreateDialogOpen}
        />
      </div>
    </MainLayout>
  );
};

export default Matters;
