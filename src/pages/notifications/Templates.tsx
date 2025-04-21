
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Plus, Mail, Sms, BellRing, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

type TemplateType = "email" | "sms" | "alert";
type TemplateStatus = "active" | "inactive" | "draft";

type NotificationTemplate = {
  id: string;
  name: string;
  type: TemplateType;
  updated_at: string;
  status: TemplateStatus;
  subject?: string;
  content: string;
};

const mockEmailTemplates: NotificationTemplate[] = [
  {
    id: "EMAIL-001",
    name: "Invoice Auto-Mailer",
    type: "email",
    updated_at: "2025-03-21",
    status: "active",
    subject: "Your Invoice from Wasper",
    content: "Dear {customer_name}, your invoice #{invoice_no} is attached.",
  },
  {
    id: "EMAIL-002",
    name: "Payment Reminder",
    type: "email",
    updated_at: "2025-02-15",
    status: "inactive",
    subject: "Payment Reminder",
    content: "Hi {customer_name}, your payment for invoice #{invoice_no} is overdue.",
  },
];

const mockSmsTemplates: NotificationTemplate[] = [
  {
    id: "SMS-001",
    name: "Low Stock Alert",
    type: "sms",
    updated_at: "2025-01-11",
    status: "active",
    content: "Stock Alert: {product_name} is below minimum level in {warehouse}.",
  },
  {
    id: "SMS-002",
    name: "Due Reminder",
    type: "sms",
    updated_at: "2025-03-06",
    status: "draft",
    content: "Reminder: Payment for invoice #{invoice_no} is due.",
  },
];

const mockAlerts: NotificationTemplate[] = [
  {
    id: "ALERT-001",
    name: "Success Notification",
    type: "alert",
    updated_at: "2025-04-01",
    status: "active",
    content: "The operation completed successfully.",
  },
  {
    id: "ALERT-002",
    name: "Low Stock Warning",
    type: "alert",
    updated_at: "2025-04-10",
    status: "active",
    content: "Warning: {product_name} is running low in stock!",
  },
];

interface TemplateFilters {
  search: string;
  status: "all" | TemplateStatus;
}

function TemplateTable({
  templates,
  onEdit,
  onDelete,
  filters,
}: {
  templates: NotificationTemplate[];
  onEdit: (tpl: NotificationTemplate) => void;
  onDelete: (tpl: NotificationTemplate) => void;
  filters: TemplateFilters;
}) {
  const filteredTemplates = templates.filter((tpl) => {
    const matchStatus =
      filters.status === "all" ? true : tpl.status === filters.status;
    const matchSearch =
      tpl.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      tpl.content.toLowerCase().includes(filters.search.toLowerCase()) ||
      (tpl.subject && tpl.subject.toLowerCase().includes(filters.search.toLowerCase()));
    return matchStatus && matchSearch;
  });

  return (
    <Card className="mt-4">
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.map((tpl) => (
                <TableRow key={tpl.id}>
                  <TableCell className="font-medium">{tpl.name}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        tpl.status === "active"
                          ? "bg-green-100 text-green-700"
                          : tpl.status === "inactive"
                          ? "bg-gray-100 text-gray-500"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {tpl.status.charAt(0).toUpperCase() + tpl.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{tpl.updated_at}</TableCell>
                  <TableCell>
                    <span className="text-gray-700 line-clamp-1">
                      {tpl.subject ? <>{tpl.subject}: </> : null}
                      {tpl.content.length > 40
                        ? tpl.content.slice(0, 40) + "..."
                        : tpl.content}
                    </span>
                  </TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      aria-label="Edit"
                      onClick={() => onEdit(tpl)}
                    >
                      <Pencil size={16} className="text-blue-600" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      aria-label="Delete"
                      onClick={() => onDelete(tpl)}
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTemplates.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-400">
                    No templates found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

type TemplateFormMode = "add" | "edit";

function TemplateModal({
  open,
  mode,
  template,
  onClose,
  onSubmit,
}: {
  open: boolean;
  mode: TemplateFormMode;
  template: NotificationTemplate | null;
  onClose: () => void;
  onSubmit: (tpl: NotificationTemplate) => void;
}) {
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

  React.useEffect(() => {
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

export default function NotificationTemplatesPage() {
  const [tab, setTab] = useState<TemplateType>("email");
  const [emailTemplates, setEmailTemplates] =
    useState<NotificationTemplate[]>(mockEmailTemplates);
  const [smsTemplates, setSmsTemplates] = useState<NotificationTemplate[]>(mockSmsTemplates);
  const [alerts, setAlerts] = useState<NotificationTemplate[]>(mockAlerts);

  const [filters, setFilters] = useState<TemplateFilters>({
    search: "",
    status: "all",
  });

  // Modal controls
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<TemplateFormMode>("add");
  const [modalTemplate, setModalTemplate] = useState<NotificationTemplate | null>(null);

  // Handler functions per section
  const handleAdd = () => {
    setModalTemplate(null);
    setModalMode("add");
    setModalOpen(true);
  };

  const handleEdit = (tpl: NotificationTemplate) => {
    setModalTemplate(tpl);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleDelete = (tpl: NotificationTemplate) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${tpl.name}"?`
      )
    ) {
      if (tab === "email") {
        setEmailTemplates((arr) => arr.filter((t) => t.id !== tpl.id));
      } else if (tab === "sms") {
        setSmsTemplates((arr) => arr.filter((t) => t.id !== tpl.id));
      } else if (tab === "alert") {
        setAlerts((arr) => arr.filter((t) => t.id !== tpl.id));
      }
      toast({
        title: "Template deleted.",
        description: `"${tpl.name}" was successfully removed.`,
      });
    }
  };

  const handleModalSubmit = (tpl: NotificationTemplate) => {
    if (modalMode === "add") {
      const newTpl = { ...tpl, id: Math.random().toString(36).substr(2, 8) };
      if (tab === "email") setEmailTemplates((arr) => [newTpl, ...arr]);
      if (tab === "sms") setSmsTemplates((arr) => [newTpl, ...arr]);
      if (tab === "alert") setAlerts((arr) => [newTpl, ...arr]);
      toast({
        title: "Template added",
        description: `"${tpl.name}" was added successfully.`,
      });
    } else if (modalMode === "edit" && modalTemplate) {
      const update = (list: NotificationTemplate[]) =>
        list.map((t) => (t.id === modalTemplate.id ? { ...tpl, id: t.id } : t));
      if (tab === "email") setEmailTemplates(update);
      if (tab === "sms") setSmsTemplates(update);
      if (tab === "alert") setAlerts(update);
      toast({
        title: "Template updated",
        description: `"${tpl.name}" has been updated.`,
      });
    }
  };

  // Responsive icon per-tab
  function tabIcon(t: TemplateType) {
    if (t === "email") return <Mail className="mr-2 text-indigo-400" size={18} />;
    if (t === "sms") return <Sms className="mr-2 text-pink-400" size={18} />;
    if (t === "alert") return <BellRing className="mr-2 text-orange-400" size={18} />;
    return null;
  }

  let currentList = emailTemplates;
  if (tab === "sms") currentList = smsTemplates;
  if (tab === "alert") currentList = alerts;

  return (
    <div className="w-full max-w-5xl mx-auto pb-8">
      <Card>
        <CardHeader className="pb-2 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            Notifications
            <span className="ml-1 text-sm font-light text-muted-foreground">
              Manage all notification templates &amp; alerts
            </span>
          </CardTitle>
          <Tabs value={tab} onValueChange={v => setTab(v as TemplateType)} className="ml-0 md:ml-auto w-full md:w-auto">
            <Tabs.List>
              <Tabs.Trigger value="email" className={tab === "email" ? "font-semibold text-indigo-600" : ""}>
                <Mail size={17} className="mr-1" /> Email Templates
              </Tabs.Trigger>
              <Tabs.Trigger value="sms" className={tab === "sms" ? "font-semibold text-pink-600" : ""}>
                <Sms size={17} className="mr-1" /> SMS Templates
              </Tabs.Trigger>
              <Tabs.Trigger value="alert" className={tab === "alert" ? "font-semibold text-orange-600" : ""}>
                <BellRing size={17} className="mr-1" /> System Alerts
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs>
        </CardHeader>
      </Card>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-4 mb-3 items-start md:items-center">
        <Input
          placeholder={`Search ${tab === "email" ? "email templates" : tab === "sms" ? "SMS templates" : "alerts"}...`}
          value={filters.search}
          onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
          className="md:w-72"
        />
        <select
          value={filters.status}
          onChange={e => setFilters(f => ({ ...f, status: e.target.value as TemplateFilters["status"] }))}
          className="border-gray-300 rounded p-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="draft">Draft</option>
        </select>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setFilters({ search: "", status: "all" })}
        >
          <Filter size={16} />
          Clear
        </Button>
        <div className="flex-1" />
        <Button
          onClick={handleAdd}
          className={`flex items-center gap-2 shadow-md ${tab === "email"
              ? "bg-indigo-600 hover:bg-indigo-700"
              : tab === "sms"
              ? "bg-pink-500 hover:bg-pink-600"
              : "bg-orange-500 hover:bg-orange-600"
            } text-white`}
        >
          <Plus size={17} />{" "}
          {tab === "email"
            ? "Add Email Template"
            : tab === "sms"
            ? "Add SMS Template"
            : "Add System Alert"}
        </Button>
      </div>
      {/* Table */}
      <TemplateTable
        templates={currentList}
        onEdit={handleEdit}
        onDelete={handleDelete}
        filters={filters}
      />
      {/* Modal */}
      <TemplateModal
        open={modalOpen}
        mode={modalMode}
        template={
          modalMode === "edit" && modalTemplate ? modalTemplate : null
        }
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
