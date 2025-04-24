
import { FormField, FormItem, FormControl, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { UseFormReturn } from "react-hook-form";
import type { ReceiptFormValues } from "../hooks/useReceiptSettings";

const marginPresets = [
  { value: "default", label: "Default" },
  { value: "narrow", label: "Narrow" },
  { value: "wide", label: "Wide" },
  { value: "custom", label: "Custom" },
];

export function FormatSettings({ form }: { form: UseFormReturn<ReceiptFormValues> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Format</CardTitle>
        <CardDescription>Set the physical dimensions and orientation of your receipt</CardDescription>
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
                  {[
                    { value: "80mm", label: "80mm Thermal" },
                    { value: "58mm", label: "58mm Thermal" },
                    { value: "a4", label: "A4" },
                    { value: "letter", label: "Letter" },
                  ].map(({ value, label }) => (
                    <FormItem key={value} className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={value} />
                      </FormControl>
                      <FormLabel className="font-normal">{label}</FormLabel>
                    </FormItem>
                  ))}
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
  );
}
