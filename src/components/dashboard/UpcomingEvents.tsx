
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import { CreateAppointmentDialog } from "@/components/calendar/CreateAppointmentDialog";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

// Sample data structure
interface Appointment {
  id: string;
  title: string;
  date: string;
  type: string;
  location: string;
  duration: string;
  client?: string;
  notes?: string;
}

// Initially use the same sample data
const upcomingEvents: Appointment[] = [
  {
    id: "1",
    title: "Client Meeting - Brown Estate",
    date: "2023-08-15T14:00:00",
    type: "Meeting",
    location: "Office - Room 203",
    duration: "1 hour"
  },
  {
    id: "2",
    title: "Court Hearing - Smith vs. Johnson",
    date: "2023-08-16T09:30:00",
    type: "Court",
    location: "County Courthouse - Room 301",
    duration: "2 hours"
  },
  {
    id: "3",
    title: "Document Review - Miller Case",
    date: "2023-08-17T11:00:00",
    type: "Task",
    location: "Virtual",
    duration: "1.5 hours"
  },
  {
    id: "4",
    title: "Deposition - Davis Injury Claim",
    date: "2023-08-18T13:30:00",
    type: "Deposition",
    location: "Office - Room 105",
    duration: "3 hours"
  }
];

export function UpcomingEvents() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [events, setEvents] = useState<Appointment[]>(upcomingEvents);

  // Update events to include today's date for demonstration purposes
  useEffect(() => {
    const today = new Date();
    const updateEvents = events.map((event, index) => {
      const eventDate = new Date(event.date);
      
      // Make first two events for today
      if (index < 2) {
        // Set to later today
        const hoursToAdd = index === 0 ? 1 : 3;
        const newDate = new Date();
        newDate.setHours(newDate.getHours() + hoursToAdd);
        return { ...event, date: newDate.toISOString() };
      }
      
      // Make remaining events for next few days
      eventDate.setFullYear(today.getFullYear());
      eventDate.setMonth(today.getMonth());
      eventDate.setDate(today.getDate() + index - 1);
      return { ...event, date: eventDate.toISOString() };
    });
    
    setEvents(updateEvents);
  }, []);

  const formatDatetime = (datetime: string) => {
    const date = new Date(datetime);
    return {
      day: date.toLocaleDateString(undefined, { weekday: 'short' }),
      date: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    };
  };

  const handleAppointmentCreated = (appointment: Appointment) => {
    setEvents(prevEvents => {
      // Sort by date with newest appointment added
      const newEvents = [...prevEvents, appointment];
      newEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      return newEvents.slice(0, 4); // Keep only 4 upcoming events
    });
    
    toast({
      title: "Appointment Created",
      description: `${appointment.title} has been scheduled successfully.`
    });
  };

  return (
    <Card className="card-hover-effect">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl">Upcoming Events</CardTitle>
          <CardDescription>Your schedule for the next few days</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/calendar")}>
            <Calendar className="h-4 w-4 mr-1" />
            View Calendar
          </Button>
          <CreateAppointmentDialog 
            onAppointmentCreated={handleAppointmentCreated}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => {
            const { day, date, time } = formatDatetime(event.date);
            return (
              <div key={event.id} className="flex items-start border-b pb-3 last:border-0 last:pb-0">
                <div className="bg-muted rounded-md p-2 text-center min-w-[4.5rem] mr-3">
                  <div className="text-xs font-medium uppercase">{day}</div>
                  <div className="text-lg font-bold">{date.split(' ')[1]}</div>
                  <div className="text-xs">{date.split(' ')[0]}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{event.title}</h3>
                    <Badge 
                      variant="outline" 
                      className={
                        event.type === "Court" 
                          ? "bg-red-100 text-red-800 border-red-200" 
                          : event.type === "Meeting"
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : event.type === "Deposition"
                          ? "bg-purple-100 text-purple-800 border-purple-200"
                          : "bg-green-100 text-green-800 border-green-200"
                      }
                    >
                      {event.type}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-muted-foreground">{time} • {event.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
