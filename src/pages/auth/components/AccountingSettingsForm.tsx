
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { RegisterFormValues } from "../schemas/registerSchema";
import { DateFields } from "./accounting-settings/DateFields";
import { CurrencySelect } from "./accounting-settings/CurrencySelect";
import { TimezoneSelect } from "./accounting-settings/TimezoneSelect";

interface AccountingSettingsFormProps {
  form: UseFormReturn<RegisterFormValues>;
  isLoading: boolean;
  handleLogoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AccountingSettingsForm({ 
  form, 
  isLoading,
  handleLogoChange 
}: AccountingSettingsFormProps) {
  return (
    <div className="space-y-4">
      <DateFields form={form} isLoading={isLoading} />
      <CurrencySelect form={form} isLoading={isLoading} />
      <TimezoneSelect form={form} isLoading={isLoading} />
      
      <FormField
        control={form.control}
        name="logo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Upload Logo</FormLabel>
            <FormControl>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleLogoChange(e);
                    field.onChange(e.target.files?.[0]);
                  }}
                  className="cursor-pointer"
                  disabled={isLoading}
                />
                <Upload className="h-5 w-5 text-gray-400" />
              </div>
            </FormControl>
            <FormDescription>
              Optional: Upload your company logo (PNG, JPG up to 2MB)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
