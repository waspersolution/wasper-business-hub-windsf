
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { TemplatesTabsHeader } from "./components/TemplatesTabsHeader";
import { TemplatesFiltersActions } from "./components/TemplatesFiltersActions";
import { TemplateTable, TemplateType, NotificationTemplate, TemplateFilters } from "./components/TemplateTable";
import { TemplateModal } from "./components/TemplateModal";
import { mockEmailTemplates, mockSmsTemplates, mockAlerts } from "./components/mockTemplates";

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
      <TemplatesTabsHeader tab={tab} setTab={setTab} />
      <TemplatesFiltersActions
        tab={tab}
        filters={filters}
        setFilters={setFilters}
        onAdd={handleAdd}
      />
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
