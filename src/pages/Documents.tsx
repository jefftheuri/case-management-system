
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Filter, 
  FileText, 
  FilePlus, 
  Download,
  Eye,
  Upload,
  Calendar,
  Folder,
  User
} from "lucide-react";
import { useState, useMemo } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { DocumentViewer } from "@/components/documents/DocumentViewer";
import { DocumentUploadForm } from "@/components/documents/DocumentUploadForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const documents = [
  {
    id: "DOC-2023-001",
    title: "Smith vs. Johnson - Divorce Petition",
    caseId: "CS-2023-001",
    caseName: "Smith vs. Johnson",
    type: "pdf",
    category: "Family Law",
    uploadDate: "2023-08-05",
    size: "2.4 MB",
    fileType: "PDF",
    uploadedBy: "John Doe"
  },
  {
    id: "DOC-2023-002",
    title: "Brown Estate - Will and Testament",
    caseId: "CS-2023-002",
    caseName: "Brown Estate",
    type: "pdf",
    category: "Probate",
    uploadDate: "2023-07-20",
    size: "1.8 MB",
    fileType: "PDF",
    uploadedBy: "Sarah Parker"
  },
  {
    id: "DOC-2023-003",
    title: "Williams Contract - Original Agreement",
    caseId: "CS-2023-003",
    caseName: "Williams Contract Dispute",
    type: "doc",
    category: "Corporate",
    uploadDate: "2023-08-01",
    size: "3.2 MB",
    fileType: "DOCX",
    uploadedBy: "John Doe"
  },
  {
    id: "DOC-2023-004",
    title: "Davis Medical Records",
    caseId: "CS-2023-004",
    caseName: "Davis Injury Claim",
    type: "image",
    category: "Personal Injury",
    uploadDate: "2023-07-12",
    size: "5.7 MB",
    fileType: "JPG",
    uploadedBy: "Michael Chen"
  },
  {
    id: "DOC-2023-005",
    title: "Miller vs. ABC Corp - Initial Complaint",
    caseId: "CS-2023-005",
    caseName: "Miller vs. ABC Corp",
    type: "pdf",
    category: "Litigation",
    uploadDate: "2023-07-29",
    size: "2.1 MB",
    fileType: "PDF",
    uploadedBy: "Sarah Parker"
  },
  {
    id: "DOC-2023-006",
    title: "Wilson Divorce - Financial Disclosure",
    caseId: "CS-2023-006",
    caseName: "Wilson Divorce",
    type: "spreadsheet",
    category: "Family Law",
    uploadDate: "2023-06-10",
    size: "4.3 MB",
    fileType: "XLSX",
    uploadedBy: "John Doe"
  },
  {
    id: "DOC-2023-007",
    title: "Taylor Property - Deed and Title",
    caseId: "CS-2023-007",
    caseName: "Taylor Property Dispute",
    type: "pdf",
    category: "Real Estate",
    uploadDate: "2023-07-25",
    size: "1.5 MB",
    fileType: "PDF",
    uploadedBy: "Michael Chen"
  },
  {
    id: "DOC-2023-008",
    title: "Harris Will Contest - Prior Will",
    caseId: "CS-2023-008",
    caseName: "Harris Will Contest",
    type: "pdf",
    category: "Probate",
    uploadDate: "2023-06-28",
    size: "1.9 MB",
    fileType: "PDF",
    uploadedBy: "Sarah Parker"
  }
];

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedDoc, setSelectedDoc] = useState<typeof documents[number] | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"case" | "client">("case");

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.caseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === "All" || doc.fileType === selectedType;
    
    return matchesSearch && matchesType;
  });

  const fileTypes = ["All", ...Array.from(new Set(documents.map(doc => doc.fileType)))];

  const getIconColor = (fileType: string) => {
    switch (fileType) {
      case "PDF":
        return "text-red-500";
      case "DOCX":
        return "text-blue-500";
      case "XLSX":
        return "text-green-500";
      case "JPG":
      case "PNG":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  // Organize documents by year, month, case, and client
  const organizedDocuments = useMemo(() => {
    // Group by years
    const years: Record<string, typeof documents> = {};
    
    filteredDocuments.forEach(doc => {
      const date = new Date(doc.uploadDate);
      const year = date.getFullYear().toString();
      const month = date.toLocaleString('default', { month: 'long' });
      
      if (!years[year]) {
        years[year] = [];
      }
      
      years[year].push(doc);
    });
    
    // Sort years in descending order (newest first)
    return Object.entries(years)
      .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
      .map(([year, docs]) => {
        // Group by months within each year
        const months: Record<string, typeof documents> = {};
        
        docs.forEach(doc => {
          const date = new Date(doc.uploadDate);
          const month = date.toLocaleString('default', { month: 'long' });
          
          if (!months[month]) {
            months[month] = [];
          }
          
          months[month].push(doc);
        });
        
        // Sort months chronologically within the year
        const sortedMonths = Object.entries(months)
          .sort(([monthA], [monthB]) => {
            const monthIndexA = new Date(`${monthA} 1, 2000`).getMonth();
            const monthIndexB = new Date(`${monthB} 1, 2000`).getMonth();
            return monthIndexB - monthIndexA;
          });
        
        return {
          year,
          months: sortedMonths.map(([month, docs]) => {
            // Group by case or client
            const caseGroups: Record<string, typeof documents> = {};
            const clientGroups: Record<string, typeof documents> = {};
            
            docs.forEach(doc => {
              // Group by case
              if (!caseGroups[doc.caseName]) {
                caseGroups[doc.caseName] = [];
              }
              caseGroups[doc.caseName].push(doc);
              
              // Group by client (assuming client is in the case name before "vs." or full case name if no "vs.")
              const clientName = doc.caseName.split(" vs.")[0].trim();
              if (!clientGroups[clientName]) {
                clientGroups[clientName] = [];
              }
              clientGroups[clientName].push(doc);
            });
            
            return {
              month,
              docs,
              caseGroups: Object.entries(caseGroups),
              clientGroups: Object.entries(clientGroups)
            };
          })
        };
      });
  }, [filteredDocuments]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
            <p className="text-muted-foreground mt-1">
              Manage and organize your case documents
            </p>
          </div>
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
              </DialogHeader>
              <DocumentUploadForm 
                caseId="global" 
                onSuccess={() => setIsUploadDialogOpen(false)} 
              />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search documents..." 
              className="pl-8 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button 
              variant={viewMode === "case" ? "default" : "outline"} 
              onClick={() => setViewMode("case")}
              className="flex-1 md:flex-none"
            >
              <Folder className="mr-2 h-4 w-4" />
              By Case
            </Button>
            <Button 
              variant={viewMode === "client" ? "default" : "outline"} 
              onClick={() => setViewMode("client")}
              className="flex-1 md:flex-none"
            >
              <User className="mr-2 h-4 w-4" />
              By Client
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex-1 md:flex-none">
                  Type: {selectedType}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {fileTypes.map(type => (
                  <DropdownMenuItem 
                    key={type} 
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {organizedDocuments.length === 0 ? (
          <div className="bg-muted/30 rounded-lg p-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No documents found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedType("All");
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {organizedDocuments.map(({ year, months }) => (
              <Tabs key={year} defaultValue={months[0]?.month} className="w-full">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {year}
                  </h2>
                </div>
                
                <TabsList className="mb-4 w-full flex overflow-x-auto">
                  {months.map(({ month }) => (
                    <TabsTrigger 
                      key={month} 
                      value={month}
                      className="flex-1"
                    >
                      {month}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {months.map(({ month, docs, caseGroups, clientGroups }) => (
                  <TabsContent key={month} value={month} className="space-y-6">
                    <h3 className="text-xl font-medium mb-4">{month} {year}</h3>
                    
                    {viewMode === "case" ? (
                      <div className="space-y-8">
                        {caseGroups.map(([caseName, caseDocs]) => (
                          <div key={caseName} className="space-y-4">
                            <h4 className="text-lg font-medium flex items-center">
                              <Folder className="mr-2 h-5 w-5 text-blue-500" />
                              {caseName} ({caseDocs.length})
                            </h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {caseDocs.map((doc) => (
                                <Card key={doc.id} className="card-hover-effect">
                                  <CardContent className="p-6">
                                    <div className="flex flex-col h-full">
                                      <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-3">
                                          <div className="p-2 rounded-md bg-muted">
                                            <FileText className={`h-8 w-8 ${getIconColor(doc.fileType)}`} />
                                          </div>
                                          <div>
                                            <h3 className="font-semibold text-lg line-clamp-1">{doc.title}</h3>
                                            <p className="text-sm text-muted-foreground">{doc.id}</p>
                                          </div>
                                        </div>
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                              <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => {
                                              setSelectedDoc(doc);
                                              setIsViewerOpen(true);
                                            }}>
                                              <Eye className="h-4 w-4 mr-2" />
                                              View details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                              <Download className="h-4 w-4 mr-2" />
                                              Download
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>Share</DropdownMenuItem>
                                            <DropdownMenuItem>Move to case</DropdownMenuItem>
                                            <DropdownMenuItem>Rename</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </div>
                                      
                                      <div className="mt-4 flex items-center justify-between">
                                        <Badge variant="outline">{doc.fileType}</Badge>
                                        <span className="text-xs text-muted-foreground">{doc.size}</span>
                                      </div>
                                      
                                      <div className="mt-3">
                                        <p className="text-sm">
                                          <span className="text-muted-foreground">Case: </span>
                                          <span className="font-medium">{doc.caseName}</span>
                                        </p>
                                        <p className="text-sm mt-1">
                                          <span className="text-muted-foreground">Uploaded: </span>
                                          <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                                        </p>
                                      </div>
                                    </div>
                                  </CardContent>
                                  <CardFooter className="px-6 py-4 border-t flex justify-between">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => {
                                        setSelectedDoc(doc);
                                        setIsViewerOpen(true);
                                      }}
                                    >
                                      <Eye className="h-4 w-4 mr-1" />
                                      Preview
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Download className="h-4 w-4 mr-1" />
                                      Download
                                    </Button>
                                  </CardFooter>
                                </Card>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {clientGroups.map(([clientName, clientDocs]) => (
                          <div key={clientName} className="space-y-4">
                            <h4 className="text-lg font-medium flex items-center">
                              <User className="mr-2 h-5 w-5 text-blue-500" />
                              {clientName} ({clientDocs.length})
                            </h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {clientDocs.map((doc) => (
                                <Card key={doc.id} className="card-hover-effect">
                                  <CardContent className="p-6">
                                    <div className="flex flex-col h-full">
                                      <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-3">
                                          <div className="p-2 rounded-md bg-muted">
                                            <FileText className={`h-8 w-8 ${getIconColor(doc.fileType)}`} />
                                          </div>
                                          <div>
                                            <h3 className="font-semibold text-lg line-clamp-1">{doc.title}</h3>
                                            <p className="text-sm text-muted-foreground">{doc.id}</p>
                                          </div>
                                        </div>
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                              <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => {
                                              setSelectedDoc(doc);
                                              setIsViewerOpen(true);
                                            }}>
                                              <Eye className="h-4 w-4 mr-2" />
                                              View details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                              <Download className="h-4 w-4 mr-2" />
                                              Download
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>Share</DropdownMenuItem>
                                            <DropdownMenuItem>Move to case</DropdownMenuItem>
                                            <DropdownMenuItem>Rename</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </div>
                                      
                                      <div className="mt-4 flex items-center justify-between">
                                        <Badge variant="outline">{doc.fileType}</Badge>
                                        <span className="text-xs text-muted-foreground">{doc.size}</span>
                                      </div>
                                      
                                      <div className="mt-3">
                                        <p className="text-sm">
                                          <span className="text-muted-foreground">Case: </span>
                                          <span className="font-medium">{doc.caseName}</span>
                                        </p>
                                        <p className="text-sm mt-1">
                                          <span className="text-muted-foreground">Uploaded: </span>
                                          <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                                        </p>
                                      </div>
                                    </div>
                                  </CardContent>
                                  <CardFooter className="px-6 py-4 border-t flex justify-between">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => {
                                        setSelectedDoc(doc);
                                        setIsViewerOpen(true);
                                      }}
                                    >
                                      <Eye className="h-4 w-4 mr-1" />
                                      Preview
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Download className="h-4 w-4 mr-1" />
                                      Download
                                    </Button>
                                  </CardFooter>
                                </Card>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedDoc?.title}
            </DialogTitle>
          </DialogHeader>
          <DocumentViewer 
            document={selectedDoc ? {
              id: selectedDoc.id,
              name: selectedDoc.title,
              type: selectedDoc.type,
              size: selectedDoc.size,
              uploaded: selectedDoc.uploadDate,
              uploadedBy: selectedDoc.uploadedBy,
              category: selectedDoc.category
            } : null} 
          />
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Documents;
