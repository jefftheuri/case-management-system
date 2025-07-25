
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
import { Eye, MoreHorizontal, Send, Printer, FileText } from "lucide-react";

// Sample invoice data
const invoices = [
  {
    id: "INV-2023-001",
    client: "Mary Smith",
    case: "Smith vs. Johnson",
    date: "2023-10-15",
    dueDate: "2023-11-15",
    amount: 3500.00,
    status: "Overdue",
  },
  {
    id: "INV-2023-002",
    client: "James Brown Jr.",
    case: "Brown Estate",
    date: "2023-10-20",
    dueDate: "2023-11-20",
    amount: 2200.00,
    status: "Paid",
  },
  {
    id: "INV-2023-003",
    client: "Williams Corporation",
    case: "Williams Contract Dispute",
    date: "2023-10-25",
    dueDate: "2023-11-25",
    amount: 7800.00,
    status: "Pending",
  },
  {
    id: "INV-2023-004",
    client: "Sarah Davis",
    case: "Davis Injury Claim",
    date: "2023-11-01",
    dueDate: "2023-12-01",
    amount: 4200.00,
    status: "Paid",
  },
  {
    id: "INV-2023-005",
    client: "Robert Miller",
    case: "Miller vs. ABC Corp",
    date: "2023-11-05",
    dueDate: "2023-12-05",
    amount: 6500.00,
    status: "Pending",
  },
  {
    id: "INV-2023-006",
    client: "Michael Wilson",
    case: "Wilson Divorce",
    date: "2023-11-10",
    dueDate: "2023-12-10",
    amount: 3800.00,
    status: "Draft",
  },
];

interface InvoiceListProps {
  limit?: number;
}

export const InvoiceList = ({ limit }: InvoiceListProps) => {
  const displayedInvoices = limit ? invoices.slice(0, limit) : invoices;
  
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="hidden md:table-cell">Case</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="hidden lg:table-cell">Due Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedInvoices.map((invoice) => (
            <TableRow key={invoice.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.client}</TableCell>
              <TableCell className="hidden md:table-cell">{invoice.case}</TableCell>
              <TableCell className="hidden md:table-cell">{new Date(invoice.date).toLocaleDateString()}</TableCell>
              <TableCell className="hidden lg:table-cell">{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
              <TableCell className="font-medium">${invoice.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline"
                  className={
                    invoice.status === "Paid" 
                      ? "bg-green-100 text-green-800 border-green-200" 
                      : invoice.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                      : invoice.status === "Overdue"
                      ? "bg-red-100 text-red-800 border-red-200"
                      : "bg-gray-100 text-gray-800 border-gray-200"
                  }
                >
                  {invoice.status}
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
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Send className="mr-2 h-4 w-4" />
                      Send
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Printer className="mr-2 h-4 w-4" />
                      Print
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      Mark as Paid
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
