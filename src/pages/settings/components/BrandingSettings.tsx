
import { FormField, FormItem, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Image, Palette } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import type { ReceiptFormValues } from "../hooks/useReceiptSettings";

interface BrandingSettingsProps {
  form: UseFormReturn<ReceiptFormValues>;
  logoPreview: string | null;
  onLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BrandingSettings({ form, logoPreview, onLogoUpload }: BrandingSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Branding</CardTitle>
        <CardDescription>Add your business branding elements to the receipt</CardDescription>
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
                    onChange={onLogoUpload}
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

          {[
            { label: "Business Name", field: "businessName", toggle: "showBusinessName" },
            { label: "Address", field: "address", toggle: "showAddress" },
            { label: "Tax ID / TIN", field: "tin", toggle: "showTIN" },
            { label: "Phone", field: "phone", toggle: "showPhone" },
            { label: "Website", field: "website", toggle: "showWebsite" },
          ].map(({ label, field, toggle }) => (
            <div key={field} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-4">
                <FormField
                  control={form.control}
                  name={`branding.${toggle}`}
                  render={({ field: toggleField }) => (
                    <FormItem className="flex items-center justify-between gap-2 space-y-0">
                      <Label>{label}</Label>
                      <FormControl>
                        <Switch
                          checked={toggleField.value}
                          onCheckedChange={toggleField.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:col-span-8">
                <FormField
                  control={form.control}
                  name={`branding.${field}`}
                  render={({ field: inputField }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          {...inputField} 
                          placeholder={`Your ${label}`}
                          disabled={!form.watch(`branding.${toggle}`)} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
