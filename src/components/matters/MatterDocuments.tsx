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
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  FileText, 
  Plus, 
  Download, 
  Eye, 
  MoreHorizontal, 
  Upload,
  File,
  Image,
  FileType
} from "lucide-react";

// Sample documents data
const documents = [
  {
    id: 1,
    name: "Initial Complaint.pdf",
    type: "Legal Document",
    size: "2.1 MB",
    uploadedBy: "John Doe",
    uploadedDate: "2023-10-10",
    category: "Pleadings"
  },
  {
    id: 2,
    name: "Deposition Transcript.docx",
    type: "Transcript",
    size: "1.5 MB",
    uploadedBy: "Sarah Parker",
    uploadedDate: "2023-09-25",
    category: "Discovery"
  },
  {
    id: 3,
    name: "Medical Records.pdf",
    type: "Medical Report",
    size: "800 KB",
    uploadedBy: "Michael Chen",
    uploadedDate: "2023-09-18",
    category: "Evidence"
  },
  {
    id: 4,
    name: "Settlement Agreement.pdf",
    type: "Agreement",
    size: "1.2 MB",
    uploadedBy: "John Doe",
    uploadedDate: "2023-08-15",
    category: "Settlement"
  },
  {
    id: 5,
    name: "Client Correspondence.docx",
    type: "Correspondence",
    size: "900 KB",
    uploadedBy: "Emily White",
    uploadedDate: "2023-08-01",
    category: "Communication"
  }
];

const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf':
      return <FileText className="h-4 w-4 text-red-500" />;
    case 'doc':
    case 'docx':
      return <File className="h-4 w-4 text-blue-500" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
      return <Image className="h-4 w-4 text-green-500" />;
    default:
      return <FileType className="h-4 w-4 text-gray-500" />;
  }
};

export function MatterDocuments({ matterId }: { matterId: string }) {
  // In a real app, you would filter documents by matterId
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Matter Documents</CardTitle>
          <CardDescription>All documents related to this matter</CardDescription>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Size</TableHead>
              <TableHead className="hidden md:table-cell">Uploaded By</TableHead>
              <TableHead className="hidden md:table-cell">Uploaded Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((document) => (
              <TableRow key={document.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  {getFileIcon(document.name)}
                  {document.name}
                </TableCell>
                <TableCell className="hidden md:table-cell">{document.type}</TableCell>
                <TableCell className="hidden md:table-cell">{document.size}</TableCell>
                <TableCell className="hidden md:table-cell">{document.uploadedBy}</TableCell>
                <TableCell className="hidden md:table-cell">{new Date(document.uploadedDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Upload className="h-4 w-4 mr-2" />
                        Replace
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
