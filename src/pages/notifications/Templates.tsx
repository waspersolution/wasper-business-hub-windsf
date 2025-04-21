
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Plus, Mail, MessageSquare, BellRing } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { TemplateTable, TemplateType, NotificationTemplate, TemplateFilters } from "./components/TemplateTable";
import { TemplateModal } from "./components/TemplateModal";

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

type TemplateFormMode = "add" | "edit";

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

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<TemplateFormMode>("add");
  const [modalTemplate, setModalTemplate] = useState<NotificationTemplate | null>(null);

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
            <TabsList>
              <TabsTrigger value="email" className={tab === "email" ? "font-semibold text-indigo-600" : ""}>
                <Mail size={17} className="mr-1" /> Email Templates
              </TabsTrigger>
              <TabsTrigger value="sms" className={tab === "sms" ? "font-semibold text-pink-600" : ""}>
                <MessageSquare size={17} className="mr-1" /> SMS Templates
              </TabsTrigger>
              <TabsTrigger value="alert" className={tab === "alert" ? "font-semibold text-orange-600" : ""}>
                <BellRing size={17} className="mr-1" /> System Alerts
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
      </Card>
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
      <TemplateTable
        templates={currentList}
        onEdit={handleEdit}
        onDelete={handleDelete}
        filters={filters}
      />
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
