
import { Button } from "@/components/ui/button";
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
import { MoreHorizontal, Plus, DollarSign, Clock } from "lucide-react";

// Sample retainers data
const retainers = [
  {
    id: "RA-2023-001",
    client: "Mary Smith",
    type: "Trust Account",
    initialAmount: 5000.00,
    currentBalance: 2350.00,
    lastActivity: "2023-10-25",
    status: "Active"
  },
  {
    id: "RA-2023-002",
    client: "James Brown Jr.",
    type: "Trust Account",
    initialAmount: 3000.00,
    currentBalance: 750.00,
    lastActivity: "2023-11-05",
    status: "Low Balance"
  },
  {
    id: "RA-2023-003",
    client: "Williams Corporation",
    type: "Evergreen Retainer",
    initialAmount: 10000.00,
    currentBalance: 8750.00,
    lastActivity: "2023-11-01",
    status: "Active"
  },
  {
    id: "RA-2023-004",
    client: "Sarah Davis",
    type: "Trust Account",
    initialAmount: 2500.00,
    currentBalance: 0.00,
    lastActivity: "2023-10-15",
    status: "Depleted"
  },
  {
    id: "RA-2023-005",
    client: "Robert Miller",
    type: "Evergreen Retainer",
    initialAmount: 7500.00,
    currentBalance: 6200.00,
    lastActivity: "2023-11-10",
    status: "Active"
  },
  {
    id: "RA-2023-006",
    client: "Michael Wilson",
    type: "Trust Account",
    initialAmount: 4000.00,
    currentBalance: 3800.00,
    lastActivity: "2023-11-12",
    status: "Active"
  },
];

interface RetainersListProps {
  limit?: number;
}

export const RetainersList = ({ limit }: RetainersListProps) => {
  const displayedRetainers = limit ? retainers.slice(0, limit) : retainers;
  
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead className="hidden md:table-cell">Initial</TableHead>
            <TableHead>Current Balance</TableHead>
            <TableHead className="hidden lg:table-cell">Last Activity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedRetainers.map((retainer) => (
            <TableRow key={retainer.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{retainer.id}</TableCell>
              <TableCell>{retainer.client}</TableCell>
              <TableCell className="hidden md:table-cell">{retainer.type}</TableCell>
              <TableCell className="hidden md:table-cell">
                ${retainer.initialAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </TableCell>
              <TableCell className="font-medium">
                ${retainer.currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {new Date(retainer.lastActivity).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline"
                  className={
                    retainer.status === "Active" 
                      ? "bg-green-100 text-green-800 border-green-200" 
                      : retainer.status === "Low Balance"
                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                      : "bg-red-100 text-red-800 border-red-200"
                  }
                >
                  {retainer.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Clock className="mr-2 h-4 w-4" />
                      View Activity
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Funds
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <DollarSign className="mr-2 h-4 w-4" />
                      Bill From Retainer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
