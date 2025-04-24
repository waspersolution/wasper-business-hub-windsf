import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "@/contexts/SessionContext";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import { Printer, Save, Undo, Image, EyeOff, Eye, Palette } from "lucide-react";

// Define the receipt template schema
const receiptSchema = z.object({
  template: z.enum(["classic", "compact", "detailed"]),
  branding: z.object({
    logoUrl: z.string().optional(),
    accentColor: z.string().default("#9b87f5"),
    showBusinessName: z.boolean().default(true),
    showAddress: z.boolean().default(true),
    showTIN: z.boolean().default(true),
    showPhone: z.boolean().default(true),
    showWebsite: z.boolean().default(false),
    businessName: z.string().optional(),
    address: z.string().optional(),
    tin: z.string().optional(),
    phone: z.string().optional(),
    website: z.string().optional(),
  }),
  layout: z.object({
    headerHtml: z.string().default(""),
    footerHtml: z.string().default(""),
    columns: z.object({
      sku: z.boolean().default(true),
      description: z.boolean().default(true),
      quantity: z.boolean().default(true),
      price: z.boolean().default(true),
      discount: z.boolean().default(false),
      total: z.boolean().default(true),
    }),
    fontFamily: z.string().default("sans-serif"),
    fontSize: z.string().default("12"),
  }),
  format: z.object({
    paperSize: z.enum(["80mm", "58mm", "a4", "letter"]).default("80mm"),
    orientation: z.enum(["portrait", "landscape"]).default("portrait"),
    margins: z.string().default("default"),
  }),
});

type ReceiptFormValues = z.infer<typeof receiptSchema>;

// Mock template images
const templateImages = {
  classic: "https://via.placeholder.com/300x400?text=Classic+Template",
  compact: "https://via.placeholder.com/300x400?text=Compact+Template",
  detailed: "https://via.placeholder.com/300x400?text=Detailed+Template",
};

// Font options
const fontOptions = [
  { value: "sans-serif", label: "Sans-serif" },
  { value: "serif", label: "Serif" },
  { value: "monospace", label: "Monospace" },
];

// Font size options
const fontSizeOptions = [
  { value: "10", label: "Small (10pt)" },
  { value: "12", label: "Medium (12pt)" },
  { value: "14", label: "Large (14pt)" },
  { value: "16", label: "X-Large (16pt)" },
];

// Margin presets
const marginPresets = [
  { value: "default", label: "Default" },
  { value: "narrow", label: "Narrow" },
  { value: "wide", label: "Wide" },
  { value: "custom", label: "Custom" },
];

export default function ReceiptSettings() {
  const { session } = useSession();
  const { toast } = useToast();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const [isUnsaved, setIsUnsaved] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Check if user has permissions to access this page
  const hasAccess = session.currentRole === "super_admin" || session.currentRole === "company_admin";

  // Set up form with default values
  const form = useForm<ReceiptFormValues>({
    resolver: zodResolver(receiptSchema),
    defaultValues: {
      template: "classic",
      branding: {
        accentColor: "#9b87f5",
        showBusinessName: true,
        showAddress: true,
        showTIN: true,
        showPhone: true,
        showWebsite: false,
      },
      layout: {
        headerHtml: "Thank you for your purchase!",
        footerHtml: "Please come again!",
        columns: {
          sku: true,
          description: true,
          quantity: true,
          price: true,
          discount: false,
          total: true,
        },
        fontFamily: "sans-serif",
        fontSize: "12",
      },
      format: {
        paperSize: "80mm",
        orientation: "portrait",
        margins: "default",
      },
    },
  });

  // Watch for form changes to enable/disable save button
  const watchedValues = form.watch();

  // Handle logo upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Show preview of the logo
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
        form.setValue("branding.logoUrl", result);
        setIsUnsaved(true);
      };
      reader.readAsDataURL(file);
      
      // In a real implementation, you would upload the file to your server
      // and set the URL returned by the server
      
      toast({
        title: "Logo uploaded",
        description: "Your logo has been uploaded successfully.",
      });
    }
  };

  // Handle form submission
  const onSubmit = (values: ReceiptFormValues) => {
    // API call to save receipt template
    // fetch('/api/settings/receipt', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(values),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     setIsUnsaved(false);
    //     toast({
    //       title: "Settings saved",
    //       description: "Your receipt settings have been saved successfully.",
    //     });
    //   })
    //   .catch(error => {
    //     console.error('Error saving receipt settings:', error);
    //     toast({
    //       title: "Error",
    //       description: "Failed to save receipt settings. Please try again.",
    //       variant: "destructive",
    //     });
    //   });
    
    // For demo, just show success toast
    console.log("Receipt settings saved:", values);
    setIsUnsaved(false);
    toast({
      title: "Settings saved",
      description: "Your receipt settings have been saved successfully.",
    });
  };

  // Handle preview button click
  const handlePreview = () => {
    const values = form.getValues();
    
    // API call to generate receipt preview
    // fetch('/api/receipts/preview', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(values),
    // })
    //   .then(response => response.text())
    //   .then(html => {
    //     setPreviewHtml(html);
    //     setIsPreviewOpen(true);
    //   })
    //   .catch(error => {
    //     console.error('Error generating receipt preview:', error);
    //     toast({
    //       title: "Error",
    //       description: "Failed to generate receipt preview. Please try again.",
    //       variant: "destructive",
    //     });
    //   });
    
    // For demo, just show a toast and set preview to open
    console.log("Generate preview for:", values);
    setIsPreviewOpen(true);
    toast({
      title: "Preview Generated",
      description: "Receipt preview has been generated.",
    });
  };

  // Reset form to last saved values
  const handleRevert = () => {
    form.reset();
    setIsUnsaved(false);
    toast({
      title: "Changes reverted",
      description: "Your changes have been reverted to the last saved settings.",
    });
  };

  // If user doesn't have access, show unauthorized message
  if (!hasAccess) {
    return (
      <DashboardLayout>
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Receipt Settings</h1>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-6">
                <h2 className="text-xl font-semibold text-destructive mb-2">Access Denied</h2>
                <p>You don't have permission to access receipt settings. Please contact an administrator.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Receipt Settings</h1>
            <p className="text-muted-foreground mt-1">
              Customize how your receipts look and what information they display
            </p>
          </div>
          <div className="space-x-2">
            {isUnsaved && (
              <Button variant="outline" onClick={handleRevert}>
                <Undo className="mr-2 h-4 w-4" />
                Revert
              </Button>
            )}
            <Button disabled={!isUnsaved} onClick={form.handleSubmit(onSubmit)}>
              <Save className="mr-2 h-4 w-4" />
              Save Template
            </Button>
            <Button variant="secondary" onClick={handlePreview}>
              <Printer className="mr-2 h-4 w-4" />
              Preview Receipt
            </Button>
          </div>
        </div>

        <Form {...form}>
          <form onChange={() => setIsUnsaved(true)} className="space-y-8">
            {/* Section 1: Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Template Selection</CardTitle>
                <CardDescription>
                  Choose a base template for your receipts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="template"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {["classic", "compact", "detailed"].map((template) => (
                          <div 
                            key={template}
                            className={`border-2 rounded-lg p-2 cursor-pointer transition-all hover:shadow-md ${
                              field.value === template 
                                ? "border-primary ring-2 ring-primary/20" 
                                : "border-muted"
                            }`}
                            onClick={() => field.onChange(template)}
                          >
                            <div className="aspect-[3/4] overflow-hidden rounded bg-muted mb-2">
                              <img 
                                src={templateImages[template as keyof typeof templateImages]} 
                                alt={`${template} template`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-center font-medium capitalize mt-2">{template}</p>
                          </div>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Section 2: Branding */}
            <Card>
              <CardHeader>
                <CardTitle>Branding</CardTitle>
                <CardDescription>
                  Add your business branding elements to the receipt
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Logo Upload */}
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Logo</h3>
                  <div className="flex items-start space-x-4">
                    <div className="w-32 h-32 border rounded-md flex items-center justify-center bg-muted overflow-hidden">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo preview" className="max-w-full max-h-full object-contain" />
                      ) : (
                        <Image className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <Button asChild variant="outline">
                        <label className="cursor-pointer">
                          <Image className="mr-2 h-4 w-4" />
                          Upload Logo
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleLogoUpload}
                          />
                        </label>
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Recommended size: 300x150 pixels, max 1MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accent Color */}
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Accent Color</h3>
                  <FormField
                    control={form.control}
                    name="branding.accentColor"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-4">
                        <div 
                          className="w-10 h-10 rounded-full border shadow-sm"
                          style={{ backgroundColor: field.value }}
                        />
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Palette className="h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              type="color"
                              className="w-24 h-10 p-1"
                            />
                            <Input 
                              value={field.value} 
                              onChange={field.onChange}
                              className="w-32"
                              placeholder="#000000"
                            />
                          </div>
                        </FormControl>
                        <FormDescription>Select your primary brand color</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                {/* Business Info Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Business Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Toggle which information appears on your receipts
                  </p>

                  <div className="space-y-4">
                    {/* Business Name */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-4">
                        <FormField
                          control={form.control}
                          name="branding.showBusinessName"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between gap-2 space-y-0">
                              <FormLabel>Business Name</FormLabel>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="md:col-span-8">
                        <FormField
                          control={form.control}
                          name="branding.businessName"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="Your Business Name"
                                  disabled={!form.watch("branding.showBusinessName")}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-4">
                        <FormField
                          control={form.control}
                          name="branding.showAddress"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between gap-2 space-y-0">
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="md:col-span-8">
                        <FormField
                          control={form.control}
                          name="branding.address"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="Your Business Address"
                                  disabled={!form.watch("branding.showAddress")} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* TIN */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-4">
                        <FormField
                          control={form.control}
                          name="branding.showTIN"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between gap-2 space-y-0">
                              <FormLabel>Tax ID / TIN</FormLabel>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="md:col-span-8">
                        <FormField
                          control={form.control}
                          name="branding.tin"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="Your Tax ID Number"
                                  disabled={!form.watch("branding.showTIN")} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-4">
                        <FormField
                          control={form.control}
                          name="branding.showPhone"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between gap-2 space-y-0">
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="md:col-span-8">
                        <FormField
                          control={form.control}
                          name="branding.phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="Your Phone Number"
                                  disabled={!form.watch("branding.showPhone")} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Website */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-4">
                        <FormField
                          control={form.control}
                          name="branding.showWebsite"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between gap-2 space-y-0">
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="md:col-span-8">
                        <FormField
                          control={form.control}
                          name="branding.website"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="Your Website URL"
                                  disabled={!form.watch("branding.showWebsite")} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Layout & Content */}
            <Card>
              <CardHeader>
                <CardTitle>Layout & Content</CardTitle>
                <CardDescription>
                  Customize the content and appearance of your receipt
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Header/Footer HTML Editor */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Custom Text</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="layout.headerHtml"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Receipt Header</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              rows={3} 
                              placeholder="Enter header content (supports HTML)" 
                            />
                          </FormControl>
                          <FormDescription>
                            Supports placeholders: {"{date}"}, {"{time}"}, {"{order_number}"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="layout.footerHtml"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Receipt Footer</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              rows={3} 
                              placeholder="Enter footer content (supports HTML)" 
                            />
                          </FormControl>
                          <FormDescription>
                            Supports placeholders: {"{cashier}"}, {"{branch}"}, {"{transaction_id}"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                {/* Line Item Columns */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Line Item Columns</h3>
                  <p className="text-sm text-muted-foreground">
                    Select which columns appear for each product in the receipt
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="layout.columns.sku"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">SKU/Code</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="layout.columns.description"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Description</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="layout.columns.quantity"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Quantity</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="layout.columns.price"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Unit Price</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="layout.columns.discount"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Discount</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="layout.columns.total"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Total</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                {/* Font Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Typography</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="layout.fontFamily"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Font Family</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Font" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {fontOptions.map(font => (
                                <SelectItem key={font.value} value={font.value}>
                                  {font.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="layout.fontSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Font Size</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {fontSizeOptions.map(size => (
                                <SelectItem key={size.value} value={size.value}>
                                  {size.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 4: Format */}
            <Card>
              <CardHeader>
                <CardTitle>Format</CardTitle>
                <CardDescription>
                  Set the physical dimensions and orientation of your receipt
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Paper Size */}
                <FormField
                  control={form.control}
                  name="format.paperSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Paper Size</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="80mm" />
                            </FormControl>
                            <FormLabel className="font-normal">80mm Thermal</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="58mm" />
                            </FormControl>
                            <FormLabel className="font-normal">58mm Thermal</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="a4" />
                            </FormControl>
                            <FormLabel className="font-normal">A4</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="letter" />
                            </FormControl>
                            <FormLabel className="font-normal">Letter</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                {/* Orientation */}
                <FormField
                  control={form.control}
                  name="format.orientation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Orientation</FormLabel>
                      <div className="flex items-center gap-4 pt-2">
                        <ToggleGroup 
                          type="single" 
                          value={field.value} 
                          onValueChange={(value) => {
                            if (value) field.onChange(value);
                          }}
                          className="grid grid-cols-2 w-full max-w-md"
                        >
                          <ToggleGroupItem 
                            value="portrait" 
                            className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                            aria-label="Portrait orientation"
                          >
                            Portrait
                          </ToggleGroupItem>
                          <ToggleGroupItem 
                            value="landscape" 
                            className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                            aria-label="Landscape orientation"
                          >
                            Landscape
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </div>
                      <FormDescription>
                        Landscape orientation only available for A4 and Letter sizes
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                {/* Margin Presets */}
                <FormField
                  control={form.control}
                  name="format.margins"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Margin Presets</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Margin Preset" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {marginPresets.map(preset => (
                            <SelectItem key={preset.value} value={preset.value}>
                              {preset.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Section 5: Preview & Save (buttons already added at the top) */}
            <div className="flex justify-end gap-2">
              {isUnsaved && (
                <Button variant="outline" onClick={handleRevert}>
                  <Undo className="mr-2 h-4 w-4" />
                  Revert
                </Button>
              )}
              <Button disabled={!isUnsaved} onClick={form.handleSubmit(onSubmit)}>
                <Save className="mr-2 h-4 w-4" />
                Save Template
              </Button>
              <Button variant="secondary" onClick={handlePreview}>
                <Printer className="mr-2 h-4 w-4" />
                Preview Receipt
              </Button>
            </div>
          </form>
        </Form>

        {/* Receipt Preview Dialog */}
        {isPreviewOpen && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Receipt Preview</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsPreviewOpen(false)}>
                    <EyeOff className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                <div className="border rounded-md p-6 bg-white">
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground">
                      This is a preview using sample data
                    </p>
                  </div>

                  {/* Mock receipt preview */}
                  <div className="space-y-4 font-mono text-sm">
                    {/* Logo would appear here */}
                    <div className="text-center">
                      <h2 className="font-bold">WASPER BUSINESS HUB</h2>
                      <p>123 Business Avenue</p>
                      <p>TIN: 123-456-789-000</p>
                      <p>Tel: (123) 456-7890</p>
                      <p>www.wasper.example.com</p>
                    </div>
                    
                    <div className="text-center border-t border-b py-2">
                      <p>Sales Receipt</p>
                      <p>Receipt #: INV-123456</p>
                      <p>Date: 24/04/2025 10:30 AM</p>
                      <p>Cashier: John Doe</p>
                    </div>
                    
                    <div>
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b">
                            <th className="py-1">Item</th>
                            <th className="py-1 text-right">Qty</th>
                            <th className="py-1 text-right">Price</th>
                            <th className="py-1 text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-1">Product One</td>
                            <td className="py-1 text-right">2</td>
                            <td className="py-1 text-right">$10.00</td>
                            <td className="py-1 text-right">$20.00</td>
                          </tr>
                          <tr>
                            <td className="py-1">Product Two</td>
                            <td className="py-1 text-right">1</td>
                            <td className="py-1 text-right">$15.00</td>
                            <td className="py-1 text-right">$15.00</td>
                          </tr>
                          <tr>
                            <td className="py-1">Product Three</td>
                            <td className="py-1 text-right">3</td>
                            <td className="py-1 text-right">$5.00</td>
                            <td className="py-1 text-right">$15.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>$50.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (10%):</span>
                        <span>$5.00</span>
                      </div>
                      <div className="flex justify-between font-bold border-t border-b py-1 my-1">
                        <span>Total:</span>
                        <span>$55.00</span>
                      </div>
                    </div>
                    
                    <div className="text-center pt-2">
                      <p>Payment Method: Cash</p>
                      <p>Amount Paid: $60.00</p>
                      <p>Change Due: $5.00</p>
                    </div>
                    
                    <div className="text-center border-t pt-2">
                      <p>Thank you for your purchase!</p>
                      <p>Please come again!</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button onClick={() => setIsPreviewOpen(false)}>Close</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
