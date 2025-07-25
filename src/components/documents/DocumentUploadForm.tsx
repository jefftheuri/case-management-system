
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface DocumentUploadFormProps {
  caseId: string;
  onSuccess: () => void;
}

const formSchema = z.object({
  documentName: z.string().min(1, "Document name is required"),
  category: z.string().min(1, "Category is required"),
});

export function DocumentUploadForm({ caseId, onSuccess }: DocumentUploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentName: "",
      category: "Pleadings",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // If no document name is entered yet, use the file name
      if (!form.getValues().documentName) {
        form.setValue("documentName", file.name);
      }
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!selectedFile) {
      return;
    }

    setIsUploading(true);

    // In a real app, this would be an API call to upload the file
    setTimeout(() => {
      console.log("Uploading document:", {
        caseId,
        file: selectedFile,
        name: values.documentName,
        category: values.category,
      });
      
      setIsUploading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file-upload">Document File</Label>
          {!selectedFile ? (
            <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <div className="flex flex-col items-center gap-1 mb-2">
                <Upload className="h-8 w-8 text-muted-foreground mb-1" />
                <span className="font-medium">Click to upload</span>
                <span className="text-sm text-muted-foreground">or drag and drop</span>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Select File
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between border rounded-md p-3">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="flex-shrink-0">
                  {selectedFile.type.includes("image") ? (
                    <img 
                      src={URL.createObjectURL(selectedFile)} 
                      alt="Preview" 
                      className="h-10 w-10 object-cover rounded" 
                    />
                  ) : (
                    <div className="bg-primary/10 h-10 w-10 rounded flex items-center justify-center">
                      <Upload className="h-5 w-5 text-primary" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearSelectedFile}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <FormField
          control={form.control}
          name="documentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter document name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                >
                  <option value="Pleadings">Pleadings</option>
                  <option value="Discovery">Discovery</option>
                  <option value="Evidence">Evidence</option>
                  <option value="Agreements">Agreements</option>
                  <option value="Internal">Internal</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit" disabled={!selectedFile || isUploading}>
            {isUploading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
