
import { NotificationTemplate } from "./TemplateTable";

export const mockEmailTemplates: NotificationTemplate[] = [
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

export const mockSmsTemplates: NotificationTemplate[] = [
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

export const mockAlerts: NotificationTemplate[] = [
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

