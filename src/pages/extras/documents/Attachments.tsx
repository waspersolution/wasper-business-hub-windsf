
import { useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  ArrowUpFromLine, 
  Calendar, 
  ChevronDown, 
  Download, 
  Eye, 
  File, 
  FileImage, 
  FileText, 
  Filter, 
  Search,
  Trash
} from "lucide-react";

const mockAttachments = [
  {
    id: "ATT001",
    name: "Invoice #INV4532.pdf",
    type: "invoice",
    relatedTo: "Sale #SALE4532",
    fileType: "pdf",
    size: "245 KB",
    uploadedBy: "Jane Doe",
    date: "2025-04-15"
  },
  {
    id: "ATT002",
    name: "Receipt #RCPT789.pdf",
    type: "receipt",
    relatedTo: "Payment #PMT789",
    fileType: "pdf",
    size: "156 KB",
    uploadedBy: "Ibrahim Hassan",
    date: "2025-04-16"
  },
  {
    id: "ATT003",
    name: "Product Images - Rice.jpg",
    type: "product_image",
    relatedTo: "Product Rice 5kg",
    fileType: "image",
    size: "1.2 MB",
    uploadedBy: "Chidi Okafor",
    date: "2025-04-17"
  },
  {
    id: "ATT004",
    name: "Warranty Card - Refrigerator.pdf",
    type: "warranty",
    relatedTo: "Product Refrigerator",
    fileType: "pdf",
    size: "320 KB",
    uploadedBy: "Fatima Umar",
    date: "2025-04-18"
  },
  {
    id: "ATT005",
    name: "Supplier Contract 2025.pdf",
    type: "contract",
    relatedTo: "Supplier Lagos Supplies Ltd",
    fileType: "pdf",
    size: "1.8 MB",
    uploadedBy: "Admin System",
    date: "2025-04-19"
  },
  {
    id: "ATT006",
    name: "Customer ID - Lagos Grocers.jpg",
    type: "identity",
    relatedTo: "Customer Lagos Grocers Ltd",
    fileType: "image",
    size: "780 KB",
    uploadedBy: "Jane Doe",
    date: "2025-04-20"
  }
];

const documentTypes = [
  { label: "All Types", value: "all" },
  { label: "Invoices", value: "invoice" },
  { label: "Receipts", value: "receipt" },
  { label: "Product Images", value: "product_image" },
  { label: "Warranty Cards", value: "warranty" },
  { label: "Contracts", value: "contract" },
  { label: "Identity Documents", value: "identity" },
];

export default function Attachments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState<any>(null);
  
  // Filter attachments based on search term and document type
  const filteredAttachments = mockAttachments.filter(attachment => {
    const matchesSearch = searchTerm === "" || 
      attachment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attachment.relatedTo.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = selectedType === "all" || attachment.type === selectedType;
      
    return matchesSearch && matchesType;
  });

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'image':
        return <FileImage className="h-4 w-4 text-blue-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const viewAttachment = (attachment: any) => {
    setSelectedAttachment(attachment);
    setIsPreviewDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Document Attachments</h1>
            <p className="text-muted-foreground mt-1">
              Manage all your business documents in one place
            </p>
          </div>
          <Button onClick={() => setIsUploadDialogOpen(true)} className="gap-2">
            <ArrowUpFromLine className="h-4 w-4" /> Upload Document
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-10 gap-1"
            onClick={() => setIsFiltersVisible(!isFiltersVisible)}
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className={`h-4 w-4 transition-transform ${isFiltersVisible ? "rotate-180" : ""}`} />
          </Button>
        </div>
        
        {isFiltersVisible && (
          <Card className="p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Document Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setSelectedType("all");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </Card>
        )}
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Document Library</CardTitle>
            <CardDescription>
              All your business documents, receipts, warranties and images
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden md:table-cell">Related To</TableHead>
                    <TableHead className="hidden lg:table-cell">Size</TableHead>
                    <TableHead className="hidden md:table-cell">Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttachments.map((attachment) => (
                    <TableRow key={attachment.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getFileIcon(attachment.fileType)}
                          <span>{attachment.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {attachment.type.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {attachment.relatedTo}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {attachment.size}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {attachment.uploadedBy}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {attachment.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => viewAttachment(attachment)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Document Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>
              Add a new document, receipt, invoice or image to your library
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div>
              <label htmlFor="doc-type" className="text-sm font-medium mb-1 block">Document Type</label>
              <Select>
                <SelectTrigger id="doc-type">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.filter(t => t.value !== 'all').map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="related-to" className="text-sm font-medium mb-1 block">Related To</label>
              <Select>
                <SelectTrigger id="related-to">
                  <SelectValue placeholder="Link to record (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">Sales</SelectItem>
                  <SelectItem value="product">Products</SelectItem>
                  <SelectItem value="customer">Customers</SelectItem>
                  <SelectItem value="supplier">Suppliers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Upload File</label>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                />
                <label htmlFor="file-upload" className="flex flex-col items-center gap-2 cursor-pointer">
                  <ArrowUpFromLine className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
                  <span className="text-xs text-muted-foreground">PDF, JPG, PNG (Max. 10MB)</span>
                </label>
              </div>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-end">
            <Button type="button" variant="secondary" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button">
              Upload Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Document Preview Dialog */}
      {selectedAttachment && (
        <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Document Preview</DialogTitle>
              <DialogDescription>
                {selectedAttachment.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="h-[400px] bg-gray-100 rounded-md flex items-center justify-center">
              {selectedAttachment.fileType === 'pdf' ? (
                <div className="text-center">
                  <FileText className="h-16 w-16 text-red-500 mx-auto mb-4" />
                  <p>PDF document preview</p>
                  <p className="text-sm text-muted-foreground">
                    This would display the actual PDF in a real application
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <FileImage className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                  <p>Image preview</p>
                  <p className="text-sm text-muted-foreground">
                    This would display the actual image in a real application
                  </p>
                </div>
              )}
            </div>
            
            <div className="bg-muted p-3 rounded-md">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium">Type:</p>
                  <p>{selectedAttachment.type.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="font-medium">Size:</p>
                  <p>{selectedAttachment.size}</p>
                </div>
                <div>
                  <p className="font-medium">Related To:</p>
                  <p>{selectedAttachment.relatedTo}</p>
                </div>
                <div>
                  <p className="font-medium">Uploaded:</p>
                  <p>{selectedAttachment.date} by {selectedAttachment.uploadedBy}</p>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" /> Download
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
}
