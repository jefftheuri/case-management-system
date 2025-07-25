
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Calendar,
  CheckCircle2, 
  Clock, 
  Edit, 
  MoreHorizontal, 
  Trash2,
  AlertCircle 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskForm } from "./TaskForm";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export interface Task {
  id: string;
  caseId: string;
  title: string;
  description?: string;
  dueDate: string;
  assignedTo: string;
  priority: "Low" | "Medium" | "High";
  status: "To Do" | "In Progress" | "Completed";
  createdAt: string;
}

interface TaskListProps {
  caseId: string;
  initialTasks?: Task[];
}

export function TaskList({ caseId, initialTasks = [] }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
    setIsFormOpen(false);
    toast({
      title: "Task created",
      description: "The task has been created successfully.",
    });
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setSelectedTask(null);
    toast({
      title: "Task updated",
      description: "The task has been updated successfully.",
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "The task has been deleted successfully.",
    });
  };

  const handleStatusChange = (taskId: string, checked: boolean | "indeterminate") => {
    if (typeof checked === "boolean") {
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { ...task, status: checked ? "Completed" : "To Do" } 
          : task
      ));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "Medium":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "Low":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
    }
  };

  const isOverdue = (dueDate: string, status: string) => {
    return status !== "Completed" && new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>Add Task</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <TaskForm 
              caseId={caseId} 
              onSubmit={handleAddTask} 
              onCancel={() => setIsFormOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8 border rounded-md bg-muted/30">
          <div className="flex flex-col items-center gap-2">
            <Clock className="h-8 w-8 text-muted-foreground" />
            <h3 className="font-medium text-muted-foreground">No tasks yet</h3>
            <p className="text-sm text-muted-foreground">
              Create tasks to track deadlines and assignments for this case.
            </p>
            <Button 
              variant="outline" 
              className="mt-2" 
              onClick={() => setIsFormOpen(true)}
            >
              Add your first task
            </Button>
          </div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Checkbox 
                    checked={task.status === "Completed"}
                    onCheckedChange={(checked) => handleStatusChange(task.id, checked)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className={task.status === "Completed" ? "line-through text-muted-foreground" : ""}>
                      {task.title}
                    </span>
                    {task.description && (
                      <span className="text-xs text-muted-foreground truncate max-w-xs">
                        {task.description}
                      </span>
                    )}
                    {task.status === "In Progress" && (
                      <Badge variant="outline" className="w-fit mt-1 bg-blue-100 text-blue-800 border-blue-200">
                        In Progress
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className={
                      isOverdue(task.dueDate, task.status) 
                        ? "text-red-600 font-medium" 
                        : ""
                    }>
                      {format(new Date(task.dueDate), "MMM d, yyyy")}
                    </span>
                    {isOverdue(task.dueDate, task.status) && (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => {
                            e.preventDefault();
                            setSelectedTask(task);
                          }}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Edit Task</DialogTitle>
                          </DialogHeader>
                          {selectedTask && (
                            <TaskForm 
                              caseId={caseId} 
                              task={selectedTask} 
                              onSubmit={handleUpdateTask} 
                              onCancel={() => setSelectedTask(null)} 
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onSelect={() => handleDeleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
