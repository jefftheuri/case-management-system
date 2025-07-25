import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Clock, 
  FileText, 
  MessageSquare, 
  Calendar, 
  AlertCircle, 
  CheckCircle,
  Users,
  PenSquare,
  Gavel,
  PhoneCall,
  Mail
} from "lucide-react";

// Sample timeline data - would come from API in real app
const timelineItems = [
  {
    id: 1,
    type: "document",
    title: "Motion to Compel Filed",
    description: "Filed motion to compel discovery responses from opposing party",
    date: "2023-10-14",
    user: "John Doe",
    icon: FileText
  },
  {
    id: 2,
    type: "note",
    title: "Client Meeting",
    description: "Discussed settlement options and next steps in litigation",
    date: "2023-10-10",
    user: "John Doe",
    icon: MessageSquare
  },
  {
    id: 3,
    type: "time",
    title: "Research",
    description: "Case law research for upcoming motion",
    date: "2023-10-08",
    duration: "2.5 hours",
    user: "Sarah Parker",
    icon: Clock
  },
  {
    id: 4,
    type: "event",
    title: "Status Conference",
    description: "Court status conference with Judge Williams",
    date: "2023-10-05",
    user: "John Doe",
    icon: Calendar
  },
  {
    id: 5,
    type: "document",
    title: "Interrogatories Sent",
    description: "Served first set of interrogatories on opposing party",
    date: "2023-09-28",
    user: "John Doe",
    icon: FileText
  },
  {
    id: 6,
    type: "email",
    title: "Client Communication",
    description: "Sent update email to client regarding matter status",
    date: "2023-09-25",
    user: "John Doe",
    icon: Mail
  },
  {
    id: 7,
    type: "call",
    title: "Opposing Counsel Call",
    description: "Discussed settlement possibilities with opposing counsel",
    date: "2023-09-20",
    duration: "45 minutes",
    user: "John Doe",
    icon: PhoneCall
  },
  {
    id: 8,
    type: "filing",
    title: "Matter Filed",
    description: "Initial complaint filed with the court",
    date: "2023-08-05",
    user: "John Doe",
    icon: Gavel
  }
];

// Function to get icon based on activity type
const getActivityIcon = (icon: any) => {
  const IconComponent = icon;
  return <IconComponent className="h-5 w-5" />;
};

export function MatterTimeline({ matterId }: { matterId: string }) {
  // In a real app, you would filter timeline items by matterId
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Matter Timeline</CardTitle>
        <CardDescription>A chronological history of matter activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6 space-y-6">
          {/* Vertical timeline line */}
          <div className="absolute top-0 left-2.5 bottom-0 w-[1px] bg-border"></div>
          
          {timelineItems.map((item) => (
            <div key={item.id} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-[-1.65rem] top-1 h-5 w-5 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                {getActivityIcon(item.icon)}
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm">{item.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                  {item.duration && <span>• {item.duration}</span>}
                  <span>• {item.user}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
