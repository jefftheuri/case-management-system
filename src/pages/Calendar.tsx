
import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ChevronLeft, ChevronRight, Clock, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CreateAppointmentDialog } from "@/components/calendar/CreateAppointmentDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Updated interface for appointments
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

// Initial sample data
const initialEvents: Appointment[] = [
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
  },
  {
    id: "5",
    title: "Team Meeting",
    date: "2023-08-18T09:00:00",
    type: "Meeting",
    location: "Conference Room",
    duration: "1 hour"
  },
  {
    id: "6",
    title: "Client Call - Wilson",
    date: "2023-08-18T11:00:00",
    type: "Meeting",
    location: "Phone",
    duration: "30 minutes"
  }
];

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("day");
  const [events, setEvents] = useState<Appointment[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<Appointment | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const { toast } = useToast();
  
  // Get current date for new events
  useEffect(() => {
    // This effect runs when the application starts up
    // In a real application, we would fetch events from an API here
    console.log("Calendar initialized with events:", events.length);
    
    // Update events to include today's date if they're old dates
    const today = new Date();
    const updatedEvents = events.map((event, index) => {
      const eventDate = new Date(event.date);
      // Update some events to today's date for demo purposes
      if (index % 2 === 0) {
        eventDate.setFullYear(today.getFullYear());
        eventDate.setMonth(today.getMonth());
        eventDate.setDate(today.getDate());
        return { ...event, date: eventDate.toISOString() };
      }
      return event;
    });
    
    setEvents(updatedEvents);
  }, []);
  
  // Format date for display
  const formattedDate = date?.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Filter events for the selected date
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return date && 
      eventDate.getDate() === date.getDate() && 
      eventDate.getMonth() === date.getMonth() && 
      eventDate.getFullYear() === date.getFullYear();
  });
  
  // Sort events by time
  filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Navigate to previous day
  const previousDay = () => {
    if (date) {
      const prevDay = new Date(date);
      prevDay.setDate(prevDay.getDate() - 1);
      setDate(prevDay);
    }
  };
  
  // Navigate to next day
  const nextDay = () => {
    if (date) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      setDate(nextDay);
    }
  };

  // Handle new appointment creation
  const handleAppointmentCreated = (appointment: Appointment) => {
    setEvents(prevEvents => [...prevEvents, appointment]);
    toast({
      title: "Appointment Created",
      description: `${appointment.title} has been scheduled successfully.`
    });
  };

  // Handle appointment deletion
  const handleDeleteAppointment = () => {
    if (selectedEvent) {
      setEvents(prevEvents => prevEvents.filter(event => event.id !== selectedEvent.id));
      setShowEventDetails(false);
      toast({
        title: "Appointment Deleted",
        description: "The appointment has been removed from your calendar."
      });
    }
  };

  // Open event details dialog
  const openEventDetails = (event: Appointment) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground mt-1">
              Schedule and manage your appointments
            </p>
          </div>
          <CreateAppointmentDialog 
            defaultDate={date}
            onAppointmentCreated={handleAppointmentCreated}
          />
        </div>
        
        <Tabs defaultValue="day" className="w-full" onValueChange={(value) => setView(value as "day" | "week" | "month")}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={previousDay}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => setDate(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="icon" onClick={nextDay}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <TabsContent value="day" className="m-0">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-center">
                    {formattedDate}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarComponent 
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>
                    {filteredEvents.length > 0 
                      ? `Appointments (${filteredEvents.length})` 
                      : "No appointments scheduled"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredEvents.length > 0 ? (
                    <div className="space-y-4">
                      {filteredEvents.map((event) => {
                        const eventTime = new Date(event.date).toLocaleTimeString(undefined, { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        });
                        
                        return (
                          <div 
                            key={event.id} 
                            className="flex items-start p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => openEventDetails(event)}
                          >
                            <div className="min-w-[80px] text-center">
                              <div className="text-lg font-semibold">{eventTime}</div>
                              <div className="text-xs text-muted-foreground flex items-center justify-center mt-1">
                                <Clock className="h-3 w-3 mr-1" />
                                {event.duration}
                              </div>
                            </div>
                            
                            <div className="ml-4 flex-1">
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
                              <p className="text-sm text-muted-foreground mt-1">
                                {event.location}
                              </p>
                              {event.client && (
                                <p className="text-sm mt-1">
                                  <span className="font-medium">Client:</span> {event.client}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <p className="text-muted-foreground">No appointments scheduled for this day</p>
                      <CreateAppointmentDialog 
                        defaultDate={date}
                        onAppointmentCreated={handleAppointmentCreated}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="week" className="m-0">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium">Week View</h3>
                  <p className="text-muted-foreground mt-1">Coming Soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="month" className="m-0">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium">Month View</h3>
                  <p className="text-muted-foreground mt-1">Coming Soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Event Details Dialog */}
      {selectedEvent && (
        <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <DialogDescription>
                Event details and management options
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-3 py-4">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-sm font-medium">Date & Time</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedEvent.date).toLocaleDateString()} at {" "}
                    {new Date(selectedEvent.date).toLocaleTimeString(undefined, { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.duration}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Type</p>
                  <Badge 
                    variant="outline" 
                    className={
                      selectedEvent.type === "Court" 
                        ? "bg-red-100 text-red-800 border-red-200" 
                        : selectedEvent.type === "Meeting"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : selectedEvent.type === "Deposition"
                        ? "bg-purple-100 text-purple-800 border-purple-200"
                        : "bg-green-100 text-green-800 border-green-200"
                    }
                  >
                    {selectedEvent.type}
                  </Badge>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{selectedEvent.location}</p>
              </div>
              
              {selectedEvent.client && (
                <div>
                  <p className="text-sm font-medium">Client</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.client}</p>
                </div>
              )}
              
              {selectedEvent.notes && (
                <div>
                  <p className="text-sm font-medium">Notes</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.notes}</p>
                </div>
              )}
            </div>
            
            <DialogFooter className="flex justify-between items-center">
              <Button 
                variant="destructive" 
                onClick={handleDeleteAppointment}
                className="mr-auto"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <div>
                <Button variant="outline" className="mr-2" onClick={() => setShowEventDetails(false)}>
                  Close
                </Button>
                <Button disabled>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </MainLayout>
  );
};

export default CalendarPage;
