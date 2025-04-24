
import { useSession } from "@/contexts/SessionContext";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Save, Undo } from "lucide-react";
import { useReceiptSettings } from "./hooks/useReceiptSettings";
import { TemplateSelection } from "./components/TemplateSelection";
import { BrandingSettings } from "./components/BrandingSettings";
import { LayoutSettings } from "./components/LayoutSettings";
import { FormatSettings } from "./components/FormatSettings";
import { ReceiptPreviewDialog } from "./components/ReceiptPreviewDialog";

export default function ReceiptSettings() {
  const { session } = useSession();
  const {
    form,
    isPreviewOpen,
    setIsPreviewOpen,
    isUnsaved,
    logoPreview,
    handleLogoUpload,
    handlePreview,
    handleRevert,
    handleSubmit,
  } = useReceiptSettings();

  // Check if user has permissions to access this page
  const hasAccess = session.currentRole === "super_admin" || session.currentRole === "company_admin";

  // If user doesn't have access,  show unauthorized message
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
            <Button disabled={!isUnsaved} onClick={form.handleSubmit(handleSubmit)}>
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
          <form onChange={() => form.getValues()} className="space-y-8">
            <TemplateSelection form={form} />
            <BrandingSettings 
              form={form} 
              logoPreview={logoPreview}
              onLogoUpload={handleLogoUpload}
            />
            <LayoutSettings form={form} />
            <FormatSettings form={form} />
          </form>
        </Form>

        <ReceiptPreviewDialog
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
