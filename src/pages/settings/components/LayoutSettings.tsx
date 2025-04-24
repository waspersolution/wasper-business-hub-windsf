
import { FormField, FormItem, FormControl, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { UseFormReturn } from "react-hook-form";
import type { ReceiptFormValues } from "../hooks/useReceiptSettings";

const fontOptions = [
  { value: "sans-serif", label: "Sans-serif" },
  { value: "serif", label: "Serif" },
  { value: "monospace", label: "Monospace" },
];

const fontSizeOptions = [
  { value: "10", label: "Small (10pt)" },
  { value: "12", label: "Medium (12pt)" },
  { value: "14", label: "Large (14pt)" },
  { value: "16", label: "X-Large (16pt)" },
];

export function LayoutSettings({ form }: { form: UseFormReturn<ReceiptFormValues> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Layout & Content</CardTitle>
        <CardDescription>Customize the content and appearance of your receipt</CardDescription>
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
            {[
              { label: "SKU/Code", field: "sku" },
              { label: "Description", field: "description" },
              { label: "Quantity", field: "quantity" },
              { label: "Unit Price", field: "price" },
              { label: "Discount", field: "discount" },
              { label: "Total", field: "total" },
            ].map(({ label, field }) => (
              <FormField
                key={field}
                control={form.control}
                name={`layout.columns.${field}`}
                render={({ field: { value, onChange } }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={value}
                        onCheckedChange={onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{label}</FormLabel>
                  </FormItem>
                )}
              />
            ))}
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
  );
}
