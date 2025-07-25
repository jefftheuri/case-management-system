
import { useState } from "react";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { 
  MessageSquare, 
  Plus, 
  Calendar, 
  MoreHorizontal, 
  PenSquare, 
  Trash
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Sample notes data
const notes = [
  {
    id: 1,
    content: "Client expressed concern about the pace of discovery. Assured them that we are making progress and explained the typical timeline for these types of cases.",
    date: "2023-10-10",
    author: "John Doe"
  },
  {
    id: 2,
    content: "Reviewed deposition transcript. Identified several inconsistencies in opposing party's testimony that we can leverage in our motion.",
    date: "2023-09-22",
    author: "Sarah Parker"
  },
  {
    id: 3,
    content: "Opposing counsel called to discuss settlement. They are willing to consider our terms but requested additional documentation on damages calculation.",
    date: "2023-09-15",
    author: "John Doe"
  },
  {
    id: 4,
    content: "Initial client interview completed. Client provided all requested documents and signed engagement letter. Ready to proceed with filing.",
    date: "2023-08-02",
    author: "John Doe"
  }
];

// Form schema for new note
const formSchema = z.object({
  content: z.string().min(1, {
    message: "Note content is required.",
  }),
});

export function CaseNotes({ caseId }: { caseId: string }) {
  // In a real app, you would filter notes by caseId
  const [open, setOpen] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would send the data to an API
    console.log(values);
    setOpen(false);
    form.reset();
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Case Notes</CardTitle>
            <CardDescription>Important notes and observations about the case</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Note
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Case Note</DialogTitle>
                <DialogDescription>
                  Create a new note for this case. Notes are visible to all team members.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Note</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter your note here..." 
                            className="h-40"
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Save Note</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-6">
          {notes.map((note) => (
            <div key={note.id} className="border rounded-md p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{note.author}</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{new Date(note.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <p className="text-sm whitespace-pre-line">{note.content}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <PenSquare className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
