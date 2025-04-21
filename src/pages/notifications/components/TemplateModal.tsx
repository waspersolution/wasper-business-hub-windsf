
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import type { NotificationTemplate, TemplateStatus, TemplateType } from "./TemplateTable";

type TemplateFormMode = "add" | "edit";

interface TemplateModalProps {
  open: boolean;
  mode: TemplateFormMode;
  template: NotificationTemplate | null;
  onClose: () => void;
  onSubmit: (tpl: NotificationTemplate) => void;
}

export function TemplateModal({
  open,
  mode,
  template,
  onClose,
  onSubmit,
}: TemplateModalProps) {
  const [state, setState] = useState<NotificationTemplate>(
    template ??
      ({
        id: "",
        name: "",
        type: "email",
        updated_at: new Date().toISOString().split("T")[0],
        status: "active",
        subject: "",
        content: "",
      } as NotificationTemplate)
  );

  useEffect(() => {
    if (template) setState(template);
    else
      setState({
        id: "",
        name: "",
        type: "email",
        updated_at: new Date().toISOString().split("T")[0],
        status: "active",
        subject: "",
        content: "",
      });
  }, [template, open, mode]);

  const isEmail = state.type === "email";
  const isSms = state.type === "sms";
  const isAlert = state.type === "alert";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.name || !state.content || (isEmail && !state.subject)) {
      toast({
        title: "Please fill in all required fields.",
        description:
          "Name, content, and subject (for email) are required fields.",
        variant: "destructive",
      });
      return;
    }
    onSubmit({ ...state });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "add"
              ? isAlert
                ? "Add System Alert"
                : isEmail
                ? "Add Email Template"
                : "Add SMS Template"
              : isAlert
              ? "Edit System Alert"
              : isEmail
              ? "Edit Email Template"
              : "Edit SMS Template"}
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name*
            </label>
            <Input
              value={state.name}
              onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
              maxLength={40}
              placeholder="Template name"
              required
            />
          </div>
          {isEmail && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject*
              </label>
              <Input
                value={state.subject || ""}
                onChange={(e) =>
                  setState((s) => ({ ...s, subject: e.target.value }))
                }
                maxLength={100}
                placeholder="Email subject"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content*
            </label>
            <textarea
              className="w-full mt-1 rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
              value={state.content}
              onChange={(e) =>
                setState((s) => ({ ...s, content: e.target.value }))
              }
              rows={4}
              placeholder={
                isEmail
                  ? "Dear {customer_name}, your invoice is ready."
                  : isSms
                  ? "Hi {name}, payment is due..."
                  : "Stock running low!"
              }
              maxLength={400}
              required
            />
            <div className="text-xs text-muted-foreground mt-1">
              You can use tags like <code>{'{customer_name}'}</code>, <code>{'{invoice_no}'}</code>, etc.
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              className="w-full mt-1 border-gray-300 rounded"
              value={state.status}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  status: e.target.value as TemplateStatus,
                }))
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">
              {mode === "add" ? "Save Template" : "Update Template"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
