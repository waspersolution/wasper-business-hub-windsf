
import { useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpFromLine, Download, FileSpreadsheet, UploadCloud, X } from "lucide-react";

export default function SalesImport() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const mockPreviewData = [
    {
      id: "SALE001",
      date: "2025-04-15",
      customer: "Lagos Grocers Ltd",
      items: "5",
      amount: "₦27,500",
      payment: "Cash",
      status: "valid"
    },
    {
      id: "SALE002",
      date: "2025-04-16",
      customer: "Abuja Superstore",
      items: "8",
      amount: "₦42,800",
      payment: "Bank Transfer",
      status: "valid"
    },
    {
      id: "SALE003",
      date: "2025-04-17",
      customer: "Port Harcourt Retail",
      items: "3",
      amount: "₦15,600",
      payment: "Credit Card",
      status: "valid"
    },
    {
      id: "",
      date: "2025-04-18",
      customer: "Unknown Customer",
      items: "4",
      amount: "₦19,200",
      payment: "Cash",
      status: "invalid"
    },
    {
      id: "SALE005",
      date: "invalid-date",
      customer: "Enugu Distributor Co",
      items: "6",
      amount: "₦invalid",
      payment: "Cash",
      status: "warning"
    }
  ];
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    
    if (selectedFile) {
      // In a real app, we would validate the file here
      // For now, we'll just simulate upload after a delay
      setIsUploaded(true);
    }
  };
  
  const handleUpload = () => {
    if (!file) return;
    
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };
  
  const handleDownloadTemplate = () => {
    // In a real app, this would download a template file
    alert("Template would be downloaded in a real application");
  };
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sales Import</h1>
            <p className="text-muted-foreground mt-1">
              Bulk import sales transactions from Excel or CSV files
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Import Instructions</CardTitle>
              <CardDescription>Follow these steps to import your sales data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge>1</Badge>
                <p className="text-sm">Download the template file</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>2</Badge>
                <p className="text-sm">Fill in your sales transaction data</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>3</Badge>
                <p className="text-sm">Upload the filled file</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>4</Badge>
                <p className="text-sm">Verify and confirm the data</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>5</Badge>
                <p className="text-sm">Complete the import</p>
              </div>
              
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={handleDownloadTemplate}
                >
                  <Download className="h-4 w-4" />
                  Download Template
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Upload Sales File</CardTitle>
              <CardDescription>
                Upload your Excel or CSV file with sales transaction data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                {!file ? (
                  <>
                    <FileSpreadsheet className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop your file here, or click to browse
                    </p>
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload">
                      <Button variant="secondary" className="gap-2">
                        <ArrowUpFromLine className="h-4 w-4" />
                        Select File
                      </Button>
                    </label>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-6 w-6 text-blue-500" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setFile(null);
                          setIsUploaded(false);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button 
                      className="gap-2 w-full" 
                      disabled={isProcessing}
                      onClick={handleUpload}
                    >
                      <UploadCloud className="h-4 w-4" />
                      {isProcessing ? "Processing..." : "Upload & Validate"}
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
            
            {isUploaded && (
              <>
                <CardHeader className="pt-0 pb-2">
                  <CardTitle className="text-lg">File Preview</CardTitle>
                  <CardDescription>Review the sales data before importing</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sale ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Payment</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockPreviewData.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{row.id || <span className="text-red-500">Missing</span>}</TableCell>
                            <TableCell>
                              {row.date === "invalid-date" ? (
                                <span className="text-red-500">{row.date}</span>
                              ) : (
                                row.date
                              )}
                            </TableCell>
                            <TableCell>{row.customer}</TableCell>
                            <TableCell>{row.items}</TableCell>
                            <TableCell>
                              {row.amount === "₦invalid" ? (
                                <span className="text-red-500">{row.amount}</span>
                              ) : (
                                row.amount
                              )}
                            </TableCell>
                            <TableCell>{row.payment}</TableCell>
                            <TableCell>
                              {row.status === "valid" ? (
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                  Valid
                                </Badge>
                              ) : row.status === "warning" ? (
                                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                                  Warning
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                                  Error
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="text-sm font-medium">Import Status:</p>
                      <p className="text-sm text-amber-600">3 valid transactions, 2 with issues</p>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline">Cancel</Button>
                      <Button disabled={isProcessing}>Import Sales</Button>
                    </div>
                  </div>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
