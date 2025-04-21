
import React from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export type TemplateType = "email" | "sms" | "alert";
export type TemplateStatus = "active" | "inactive" | "draft";

export type NotificationTemplate = {
  id: string;
  name: string;
  type: TemplateType;
  updated_at: string;
  status: TemplateStatus;
  subject?: string;
  content: string;
};

export interface TemplateFilters {
  search: string;
  status: "all" | TemplateStatus;
}

interface TemplateTableProps {
  templates: NotificationTemplate[];
  onEdit: (tpl: NotificationTemplate) => void;
  onDelete: (tpl: NotificationTemplate) => void;
  filters: TemplateFilters;
}

export function TemplateTable({ templates, onEdit, onDelete, filters }: TemplateTableProps) {
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
