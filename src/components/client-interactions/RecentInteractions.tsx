
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Phone, Mail, Video, Calendar } from "lucide-react";

// Sample data - most recent interactions first
const recentInteractions = [
  {
    id: "INT-2023-001",
    clientId: "CL-2023-001",
    clientName: "Mary Smith",
    caseId: "CS-2023-001",
    caseName: "Smith vs. Johnson",
    type: "Phone Call",
    date: "2023-09-10T14:30:00",
    duration: 25,
    summary: "Discussed case progress and upcoming court date. Client expressed concerns about the timeline and requested more frequent updates.",
    followUpRequired: true,
    followUpDate: "2023-09-17"
  },
  {
    id: "INT-2023-002",
    clientId: "CL-2023-002",
    clientName: "James Brown Jr.",
    caseId: "CS-2023-002",
    caseName: "Brown Estate",
    type: "Email",
    date: "2023-09-09T10:15:00",
    duration: null,
    summary: "Sent estate documentation for review. Requested client to return signed documents by end of week.",
    followUpRequired: true,
    followUpDate: "2023-09-16"
  },
  {
    id: "INT-2023-003",
    clientId: "CL-2023-003",
    clientName: "Williams Corporation",
    caseId: "CS-2023-003",
    caseName: "Williams Contract Dispute",
    type: "Meeting",
    date: "2023-09-08T11:00:00",
    duration: 60,
    summary: "Contract review session with corporate team. Identified key areas of concern in sections 3.2 and 4.5. Legal team to prepare counter-proposal.",
    followUpRequired: false,
    followUpDate: null
  },
  {
    id: "INT-2023-004",
    clientId: "CL-2023-004",
    clientName: "Sarah Davis",
    caseId: "CS-2023-004",
    caseName: "Davis Injury Claim",
    type: "Video Call",
    date: "2023-09-07T15:45:00",
    duration: 45,
    summary: "Case update and evidence review. Reviewed medical records and witness statements. Advised on upcoming deposition preparation.",
    followUpRequired: true,
    followUpDate: "2023-09-14"
  },
  {
    id: "INT-2023-005",
    clientId: "CL-2023-001",
    clientName: "Mary Smith",
    caseId: "CS-2023-001",
    caseName: "Smith vs. Johnson",
    type: "Email",
    date: "2023-09-06T09:20:00",
    duration: null,
    summary: "Sent court filing documents for signature. Explained the importance of each document and the deadline for submission.",
    followUpRequired: true,
    followUpDate: "2023-09-08"
  }
];

// Function to get icon based on interaction type
const getInteractionIcon = (type: string) => {
  switch (type) {
    case "Phone Call":
      return <Phone className="h-8 w-8 text-blue-500" />;
    case "Email":
      return <Mail className="h-8 w-8 text-green-500" />;
    case "Meeting":
      return <Calendar className="h-8 w-8 text-purple-500" />;
    case "Video Call":
      return <Video className="h-8 w-8 text-red-500" />;
    case "Text Message":
      return <MessageSquare className="h-8 w-8 text-yellow-500" />;
    default:
      return <MessageSquare className="h-8 w-8 text-gray-500" />;
  }
};

export function RecentInteractions() {
  return (
    <div className="space-y-6">
      {recentInteractions.map((interaction) => (
        <Card key={interaction.id} className="card-hover-effect">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="mt-1">
                {getInteractionIcon(interaction.type)}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-lg">{interaction.clientName}</h3>
                    <p className="text-sm text-muted-foreground">{interaction.caseName}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge className="mb-1">{interaction.type}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(interaction.date).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm border-l-2 border-muted pl-4 py-2">{interaction.summary}</p>
                
                <div className="flex justify-between items-center pt-2">
                  {interaction.followUpRequired ? (
                    <div className="flex items-center">
                      <span className="text-sm mr-2">Follow-up:</span>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        {new Date(interaction.followUpDate!).toLocaleDateString()}
                      </Badge>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span className="text-sm mr-2">No follow-up required</span>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Details</Button>
                    <Button variant="outline" size="sm">Create Follow-up</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
