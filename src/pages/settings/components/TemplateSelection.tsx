
import { FormField, FormItem } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import type { ReceiptFormValues } from "../hooks/useReceiptSettings";

const templateImages = {
  classic: "https://via.placeholder.com/300x400?text=Classic+Template",
  compact: "https://via.placeholder.com/300x400?text=Compact+Template",
  detailed: "https://via.placeholder.com/300x400?text=Detailed+Template",
};

export function TemplateSelection({ form }: { form: UseFormReturn<ReceiptFormValues> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Selection</CardTitle>
        <CardDescription>Choose a base template for your receipts</CardDescription>
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
  );
}
