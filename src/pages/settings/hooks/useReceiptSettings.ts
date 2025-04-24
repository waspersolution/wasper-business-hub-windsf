
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

export const receiptSchema = z.object({
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

export type ReceiptFormValues = z.infer<typeof receiptSchema>;

export const useReceiptSettings = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const [isUnsaved, setIsUnsaved] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const { toast } = useToast();

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

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
        form.setValue("branding.logoUrl", result);
        setIsUnsaved(true);
      };
      reader.readAsDataURL(file);
      toast({
        title: "Logo uploaded",
        description: "Your logo has been uploaded successfully.",
      });
    }
  };

  const handlePreview = () => {
    const values = form.getValues();
    setIsPreviewOpen(true);
    toast({
      title: "Preview Generated",
      description: "Receipt preview has been generated.",
    });
  };

  const handleRevert = () => {
    form.reset();
    setIsUnsaved(false);
    toast({
      title: "Changes reverted",
      description: "Your changes have been reverted to the last saved settings.",
    });
  };

  const handleSubmit = (values: ReceiptFormValues) => {
    console.log("Receipt settings saved:", values);
    setIsUnsaved(false);
    toast({
      title: "Settings saved",
      description: "Your receipt settings have been saved successfully.",
    });
  };

  return {
    form,
    isPreviewOpen,
    setIsPreviewOpen,
    previewHtml,
    isUnsaved,
    setIsUnsaved,
    logoPreview,
    handleLogoUpload,
    handlePreview,
    handleRevert,
    handleSubmit,
  };
};
