
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import type { TemplateFilters, TemplateType } from "./TemplateTable";

interface TemplatesFiltersActionsProps {
  tab: TemplateType;
  filters: TemplateFilters;
  setFilters: React.Dispatch<React.SetStateAction<TemplateFilters>>;
  onAdd: () => void;
}

export const TemplatesFiltersActions: React.FC<TemplatesFiltersActionsProps> = ({
  tab,
  filters,
  setFilters,
  onAdd,
}) => (
  <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-4 mb-3 items-start md:items-center">
    <Input
      placeholder={`Search ${
        tab === "email"
          ? "email templates"
          : tab === "sms"
          ? "SMS templates"
          : "alerts"
      }...`}
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
      onClick={onAdd}
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
);

