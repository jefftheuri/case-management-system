import { useState } from "react";
import { 
  Card, 
  CardContent,
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MessageSquare, Video, Calendar, Search, Filter, MoreHorizontal } from "lucide-react";

// Import interactions from shared data file
import { interactions } from "@/data/interactions";

// Function to get icon based on interaction type
const getInteractionIcon = (type: string) => {
  switch (type) {
    case "Phone Call":
      return <Phone className="h-4 w-4" />;
    case "Email":
      return <Mail className="h-4 w-4" />;
    case "Meeting":
      return <Calendar className="h-4 w-4" />;
    case "Video Call":
      return <Video className="h-4 w-4" />;
    case "Text Message":
      return <MessageSquare className="h-4 w-4" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
};

export function ClientInteractionsList() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter interactions based on search term
  const filteredInteractions = interactions.filter(interaction => 
    interaction.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interaction.caseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interaction.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search interactions..." 
            className="pl-8 w-full" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
                Type: All
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>Phone Call</DropdownMenuItem>
              <DropdownMenuItem>Email</DropdownMenuItem>
              <DropdownMenuItem>Meeting</DropdownMenuItem>
              <DropdownMenuItem>Video Call</DropdownMenuItem>
              <DropdownMenuItem>Text Message</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Case</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead>Follow Up</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInteractions.map((interaction) => (
                <TableRow key={interaction.id}>
                  <TableCell className="font-medium">{interaction.clientName}</TableCell>
                  <TableCell>{interaction.caseName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getInteractionIcon(interaction.type)}
                      {interaction.type}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(interaction.date).toLocaleString()}</TableCell>
                  <TableCell className="max-w-xs truncate">{interaction.summary}</TableCell>
                  <TableCell>
                    {interaction.followUpRequired ? (
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        {new Date(interaction.followUpDate!).toLocaleDateString()}
                      </Badge>
                    ) : (
                      <Badge variant="outline">None</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit interaction</DropdownMenuItem>
                        <DropdownMenuItem>Mark as complete</DropdownMenuItem>
                        <DropdownMenuItem>Create follow-up</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
