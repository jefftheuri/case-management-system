
import { FileText, FileImage, FileSpreadsheet, File } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploaded: string;
  uploadedBy: string;
  category: string;
}

interface DocumentViewerProps {
  document: Document | null;
}

export function DocumentViewer({ document }: DocumentViewerProps) {
  if (!document) {
    return <div className="py-10 text-center">No document selected</div>;
  }

  // Get file extension
  const fileExt = document.name.split('.').pop()?.toLowerCase();
  
  // In a real app, this would be the actual file URL
  const documentUrl = `#`;
  
  // Display different previews based on file type
  const renderPreview = () => {
    switch (document.type) {
      case 'pdf':
        // In a real app, this would be an embed tag or PDF viewer
        return (
          <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-10">
            <FileText className="h-20 w-20 text-red-500 mb-4" />
            <p className="text-lg font-medium">PDF Document Preview</p>
            <p className="text-sm text-muted-foreground">
              {document.name} ({document.size})
            </p>
          </div>
        );
      case 'image':
        // In a real app, this would be an actual image
        return (
          <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-10">
            <FileImage className="h-20 w-20 text-purple-500 mb-4" />
            <p className="text-lg font-medium">Image Preview</p>
            <p className="text-sm text-muted-foreground">
              {document.name} ({document.size})
            </p>
          </div>
        );
      case 'spreadsheet':
        return (
          <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-10">
            <FileSpreadsheet className="h-20 w-20 text-green-500 mb-4" />
            <p className="text-lg font-medium">Spreadsheet Preview</p>
            <p className="text-sm text-muted-foreground">
              {document.name} ({document.size})
            </p>
          </div>
        );
      case 'doc':
        return (
          <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-10">
            <FileText className="h-20 w-20 text-blue-500 mb-4" />
            <p className="text-lg font-medium">Document Preview</p>
            <p className="text-sm text-muted-foreground">
              {document.name} ({document.size})
            </p>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-10">
            <File className="h-20 w-20 text-gray-500 mb-4" />
            <p className="text-lg font-medium">File Preview</p>
            <p className="text-sm text-muted-foreground">
              {document.name} ({document.size})
            </p>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-h-[60vh] overflow-auto p-2">
      <div className="space-y-4">
        {renderPreview()}
        
        <div className="bg-gray-50 p-4 rounded-lg mt-4">
          <h3 className="font-medium text-sm text-muted-foreground mb-2">Document Information</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="font-medium">Category:</p>
              <p>{document.category}</p>
            </div>
            <div>
              <p className="font-medium">Upload Date:</p>
              <p>{new Date(document.uploaded).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-medium">Size:</p>
              <p>{document.size}</p>
            </div>
            <div>
              <p className="font-medium">Uploaded By:</p>
              <p>{document.uploadedBy}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
