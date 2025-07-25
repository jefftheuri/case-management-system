
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus } from "lucide-react";

// Sample templates
const matterTemplates = [
  {
    id: "template-1",
    name: "Family Law Divorce",
    type: "Family Law",
    description: "Standard divorce proceedings template with custody considerations",
    defaultTasks: ["Initial client consultation", "File petition", "Serve papers", "Discovery phase"]
  },
  {
    id: "template-2",
    name: "Personal Injury Claim",
    type: "Personal Injury",
    description: "Personal injury case template with medical records and settlement tracking",
    defaultTasks: ["Gather medical records", "Calculate damages", "File insurance claim", "Negotiate settlement"]
  },
  {
    id: "template-3",
    name: "Estate Planning",
    type: "Probate",
    description: "Comprehensive estate planning template with will and trust documents",
    defaultTasks: ["Asset inventory", "Draft will", "Create trust documents", "Execute documents"]
  },
  {
    id: "template-4",
    name: "Business Formation",
    type: "Corporate",
    description: "Business entity formation template with compliance requirements",
    defaultTasks: ["Choose entity type", "File formation documents", "Create operating agreement", "Obtain EIN"]
  }
];

const formSchema = z.object({
  title: z.string().min(1, "Matter title is required"),
  client: z.string().min(1, "Client is required"),
  type: z.string().min(1, "Matter type is required"),
  description: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High"]),
  template: z.string().optional(),
});

interface CreateMatterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateMatterDialog({ open, onOpenChange }: CreateMatterDialogProps) {
  const [useTemplate, setUseTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      client: "",
      type: "",
      description: "",
      priority: "Medium",
      template: "",
    },
  });

  const handleTemplateSelect = (templateId: string) => {
    const template = matterTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      form.setValue("type", template.type);
      form.setValue("template", templateId);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would create the matter via API
    console.log("Creating matter:", values);
    
    let successMessage = `Matter "${values.title}" has been created successfully.`;
    if (values.template) {
      const template = matterTemplates.find(t => t.id === values.template);
      successMessage += ` Using template: ${template?.name}`;
    }
    
    toast({
      title: "Matter Created",
      description: successMessage,
    });
    
    onOpenChange(false);
    form.reset();
    setUseTemplate(false);
    setSelectedTemplate("");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Matter</DialogTitle>
          <DialogDescription>
            Create a new legal matter. You can start from scratch or use an existing template.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Choose Starting Point</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-colors ${!useTemplate ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                onClick={() => {
                  setUseTemplate(false);
                  setSelectedTemplate("");
                  form.setValue("template", "");
                  form.setValue("type", "");
                }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Start from Scratch
                  </CardTitle>
                  <CardDescription>
                    Create a new matter without any pre-filled information
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card 
                className={`cursor-pointer transition-colors ${useTemplate ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                onClick={() => setUseTemplate(true)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Use Template
                  </CardTitle>
                  <CardDescription>
                    Start with a pre-configured template for common matter types
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Template Selection */}
            {useTemplate && (
              <div className="space-y-3">
                <h4 className="font-medium">Select Template</h4>
                <div className="grid gap-3">
                  {matterTemplates.map((template) => (
                    <Card 
                      key={template.id}
                      className={`cursor-pointer transition-colors ${selectedTemplate === template.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">{template.name}</CardTitle>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                            {template.type}
                          </span>
                        </div>
                        <CardDescription className="text-xs">
                          {template.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Matter Details Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matter Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter matter title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client</FormLabel>
                      <FormControl>
                        <Input placeholder="Select or enter client" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matter Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={useTemplate && Boolean(selectedTemplate)}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select matter type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Family Law">Family Law</SelectItem>
                          <SelectItem value="Personal Injury">Personal Injury</SelectItem>
                          <SelectItem value="Corporate">Corporate</SelectItem>
                          <SelectItem value="Real Estate">Real Estate</SelectItem>
                          <SelectItem value="Criminal Defense">Criminal Defense</SelectItem>
                          <SelectItem value="Probate">Probate</SelectItem>
                          <SelectItem value="Litigation">Litigation</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter matter description..." 
                        className="h-24"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Optional description of the matter details and scope
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Matter</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
