
import { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon, Check } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Sample client and case data for dropdowns
const clients = [
  { id: "CL-2023-001", name: "Mary Smith" },
  { id: "CL-2023-002", name: "James Brown Jr." },
  { id: "CL-2023-003", name: "Williams Corporation" },
  { id: "CL-2023-004", name: "Sarah Davis" },
  { id: "CL-2023-005", name: "Robert Miller" },
];

const cases = [
  { id: "CS-2023-001", name: "Smith vs. Johnson", clientId: "CL-2023-001" },
  { id: "CS-2023-002", name: "Brown Estate", clientId: "CL-2023-002" },
  { id: "CS-2023-003", name: "Williams Contract Dispute", clientId: "CL-2023-003" },
  { id: "CS-2023-004", name: "Davis Injury Claim", clientId: "CL-2023-004" },
  { id: "CS-2023-005", name: "Miller vs. ABC Corp", clientId: "CL-2023-005" },
];

// Interface for form values
interface InteractionFormValues {
  clientId: string;
  caseId: string;
  type: string;
  date: Date;
  duration: number | null;
  summary: string;
  followUpRequired: boolean;
  followUpDate: Date | null;
}

interface ClientInteractionFormProps {
  onSuccess?: () => void;
}

export function ClientInteractionForm({ onSuccess }: ClientInteractionFormProps) {
  const { toast } = useToast();
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  
  const form = useForm<InteractionFormValues>({
    defaultValues: {
      clientId: "",
      caseId: "",
      type: "",
      date: new Date(),
      duration: null,
      summary: "",
      followUpRequired: false,
      followUpDate: null,
    },
  });
  
  // Filter cases based on selected client
  const filteredCases = cases.filter(c => c.clientId === selectedClientId);
  
  // Handle client change
  const handleClientChange = (value: string) => {
    setSelectedClientId(value);
    form.setValue("clientId", value);
    form.setValue("caseId", ""); // Reset case when client changes
  };
  
  // Handle form submission
  const onSubmit = (values: InteractionFormValues) => {
    console.log(values);
    
    // Show success toast
    toast({
      title: "Interaction recorded",
      description: "The client interaction has been successfully saved.",
    });
    
    // Reset form
    form.reset();
    setSelectedClientId("");
    
    // Call onSuccess callback if provided
    if (onSuccess) {
      onSuccess();
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Client Interaction</CardTitle>
        <CardDescription>
          Document details about your communication with clients
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <Select 
                      onValueChange={handleClientChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.map(client => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="caseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Case</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!selectedClientId}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={selectedClientId ? "Select case" : "Select client first"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredCases.map(caseItem => (
                          <SelectItem key={caseItem.id} value={caseItem.id}>
                            {caseItem.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interaction Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Phone Call">Phone Call</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="Meeting">Meeting</SelectItem>
                        <SelectItem value="Video Call">Video Call</SelectItem>
                        <SelectItem value="Text Message">Text Message</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date & Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP HH:mm")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                        <div className="p-3 border-t border-border">
                          <Input 
                            type="time"
                            onChange={(e) => {
                              const [hours, minutes] = e.target.value.split(':');
                              const date = new Date(field.value);
                              date.setHours(parseInt(hours, 10));
                              date.setMinutes(parseInt(minutes, 10));
                              field.onChange(date);
                            }}
                            defaultValue={format(field.value, "HH:mm")}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="e.g., 30" 
                        {...field}
                        value={field.value || ''}
                        onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                      />
                    </FormControl>
                    <FormDescription>
                      Leave empty for interactions like emails
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the interaction with the client" 
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="followUpRequired"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Follow Up Required</FormLabel>
                      <FormDescription>
                        Toggle if this interaction requires a follow-up
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {form.watch("followUpRequired") && (
                <FormField
                  control={form.control}
                  name="followUpDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Follow Up Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">
                <Check className="mr-2 h-4 w-4" />
                Save Interaction
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
