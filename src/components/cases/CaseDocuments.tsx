
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  File, 
  FileText, 
  FileImage, 
  FileSpreadsheet, 
  Download, 
  Eye, 
  MoreHorizontal, 
  Search, 
  Plus,
  Upload,
  Trash2,
  FilePen
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { DocumentViewer } from "@/components/documents/DocumentViewer";
import { DocumentUploadForm } from "@/components/documents/DocumentUploadForm";

// Sample documents data
const documents = [
  {
    id: "DOC-001",
    name: "Complaint.pdf",
    type: "pdf",
    size: "1.2 MB",
    uploaded: "2023-08-05",
    uploadedBy: "John Doe",
    category: "Pleadings"
  },
  {
    id: "DOC-002",
    name: "Client_Contract.docx",
    type: "doc",
    size: "458 KB",
    uploaded: "2023-08-10",
    uploadedBy: "John Doe",
    category: "Agreements"
  },
  {
    id: "DOC-003",
    name: "Evidence_Photo_1.jpg",
    type: "image",
    size: "3.5 MB",
    uploaded: "2023-09-02",
    uploadedBy: "Sarah Parker",
    category: "Evidence"
  },
  {
    id: "DOC-004",
    name: "Case_Timeline.xlsx",
    type: "spreadsheet",
    size: "890 KB",
    uploaded: "2023-09-15",
    uploadedBy: "John Doe",
    category: "Internal"
  },
  {
    id: "DOC-005",
    name: "Motion_to_Compel.pdf",
    type: "pdf",
    size: "745 KB",
    uploaded: "2023-10-14",
    uploadedBy: "John Doe",
    category: "Pleadings"
  },
  {
    id: "DOC-006",
    name: "Discovery_Responses.pdf",
    type: "pdf",
    size: "2.1 MB",
    uploaded: "2023-09-28",
    uploadedBy: "Michael Chen",
    category: "Discovery"
  }
];

// Function to get the file icon based on type
const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FileText className="h-5 w-5 text-red-500" />;
    case "doc":
      return <FileText className="h-5 w-5 text-blue-500" />;
    case "image":
      return <FileImage className="h-5 w-5 text-purple-500" />;
    case "spreadsheet":
      return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
    default:
      return <File className="h-5 w-5 text-gray-500" />;
  }
};

// Function to get category badge color
const getCategoryColor = (category: string) => {
  switch (category) {
    case "Pleadings":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Discovery":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Evidence":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Agreements":
      return "bg-green-100 text-green-800 border-green-200";
    case "Internal":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export function CaseDocuments({ caseId }: { caseId: string }) {
  // In a real app, you would filter documents by caseId
  const [selectedDoc, setSelectedDoc] = useState<typeof documents[number] | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Case Documents</CardTitle>
          <CardDescription>Manage all documents related to this case</CardDescription>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>
                Add a new document to this case
              </DialogDescription>
            </DialogHeader>
            <DocumentUploadForm 
              caseId={caseId} 
              onSuccess={() => setIsUploadDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search documents..." 
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Category</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSearchTerm("")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchTerm("Pleadings")}>Pleadings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchTerm("Discovery")}>Discovery</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchTerm("Evidence")}>Evidence</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchTerm("Agreements")}>Agreements</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchTerm("Internal")}>Internal</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead className="hidden md:table-cell">Size</TableHead>
                <TableHead className="hidden md:table-cell">Uploaded By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No documents found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getFileIcon(doc.type)}
                        <span className="font-medium">{doc.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getCategoryColor(doc.category)}>
                        {doc.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(doc.uploaded).toLocaleDateString()}</TableCell>
                    <TableCell className="hidden md:table-cell">{doc.size}</TableCell>
                    <TableCell className="hidden md:table-cell">{doc.uploadedBy}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedDoc(doc);
                            setIsViewerOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <FilePen className="h-4 w-4 mr-2" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Upload className="h-4 w-4 mr-2" />
                              Replace
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedDoc?.name}
            </DialogTitle>
          </DialogHeader>
          <DocumentViewer document={selectedDoc} />
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
