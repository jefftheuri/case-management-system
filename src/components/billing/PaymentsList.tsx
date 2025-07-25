
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
import { MoreHorizontal, Eye, Printer, FileText } from "lucide-react";

// Sample payments data
const payments = [
  {
    id: "PMT-2023-001",
    client: "Mary Smith",
    invoice: "INV-2023-001",
    date: "2023-11-10",
    amount: 3500.00,
    method: "Credit Card",
    status: "Processed"
  },
  {
    id: "PMT-2023-002",
    client: "James Brown Jr.",
    invoice: "INV-2023-002",
    date: "2023-11-15",
    amount: 2200.00,
    method: "Check",
    status: "Processed"
  },
  {
    id: "PMT-2023-003",
    client: "Williams Corporation",
    invoice: null,
    date: "2023-11-01",
    amount: 10000.00,
    method: "Wire Transfer",
    status: "Processed",
    note: "Retainer payment"
  },
  {
    id: "PMT-2023-004",
    client: "Sarah Davis",
    invoice: "INV-2023-004",
    date: "2023-11-20",
    amount: 4200.00,
    method: "ACH",
    status: "Processed"
  },
  {
    id: "PMT-2023-005",
    client: "Michael Wilson",
    invoice: null,
    date: "2023-11-22",
    amount: 4000.00,
    method: "Credit Card",
    status: "Pending",
    note: "Retainer payment"
  },
  {
    id: "PMT-2023-006",
    client: "Emily Taylor",
    invoice: "INV-2023-008",
    date: "2023-11-25",
    amount: 1800.00,
    method: "Check",
    status: "Pending"
  },
];

interface PaymentsListProps {
  limit?: number;
}

export const PaymentsList = ({ limit }: PaymentsListProps) => {
  const displayedPayments = limit ? payments.slice(0, limit) : payments;
  
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="hidden md:table-cell">Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedPayments.map((payment) => (
            <TableRow key={payment.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{payment.id}</TableCell>
              <TableCell>{payment.client}</TableCell>
              <TableCell className="hidden md:table-cell">
                {new Date(payment.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="font-medium">
                ${payment.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </TableCell>
              <TableCell className="hidden md:table-cell">{payment.method}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline"
                  className={
                    payment.status === "Processed" 
                      ? "bg-green-100 text-green-800 border-green-200" 
                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                  }
                >
                  {payment.status}
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
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Printer className="mr-2 h-4 w-4" />
                      Print Receipt
                    </DropdownMenuItem>
                    {payment.status === "Pending" && (
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Mark as Processed
                      </DropdownMenuItem>
                    )}
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
