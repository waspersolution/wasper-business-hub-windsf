
export const mockRecordChanges = [
  {
    id: "CHG001",
    action: "update",
    user: "Jane Doe",
    entity: "Product",
    entityId: "PRD456",
    entityName: "Rice 5kg",
    module: "inventory",
    date: "2025-04-20 09:30",
    changes: [
      { field: "price", oldValue: "₦4,500", newValue: "₦4,800" },
      { field: "stock", oldValue: "25", newValue: "20" }
    ]
  },
  {
    id: "CHG002",
    action: "create",
    user: "Ibrahim Hassan",
    entity: "Customer",
    entityId: "CUST789",
    entityName: "Lagos Grocers Ltd",
    module: "customers",
    date: "2025-04-20 10:15",
    changes: [
      { field: "name", oldValue: "", newValue: "Lagos Grocers Ltd" },
      { field: "email", oldValue: "", newValue: "contact@lagosgrocers.com" },
      { field: "phone", oldValue: "", newValue: "+2348012345678" }
    ]
  },
  {
    id: "CHG003",
    action: "delete",
    user: "Admin System",
    entity: "Discount",
    entityId: "DISC123",
    entityName: "Holiday Discount 10%",
    module: "sales",
    date: "2025-04-20 11:45",
    changes: [
      { field: "name", oldValue: "Holiday Discount 10%", newValue: "" },
      { field: "value", oldValue: "10%", newValue: "" },
      { field: "active", oldValue: "true", newValue: "" }
    ]
  },
  {
    id: "CHG004",
    action: "update",
    user: "Chidi Okafor",
    entity: "Order",
    entityId: "ORD456",
    entityName: "Order #ORD456",
    module: "sales",
    date: "2025-04-20 13:20",
    changes: [
      { field: "status", oldValue: "Pending", newValue: "Completed" },
      { field: "payment_status", oldValue: "Unpaid", newValue: "Paid" }
    ]
  },
  {
    id: "CHG005",
    action: "update",
    user: "Fatima Umar",
    entity: "User",
    entityId: "USR789",
    entityName: "Ibrahim Hassan",
    module: "users",
    date: "2025-04-20 14:30",
    changes: [
      { field: "role", oldValue: "Inventory Manager", newValue: "Branch Manager" },
      { field: "permissions", oldValue: "inventory.view,inventory.edit", newValue: "inventory.view,inventory.edit,sales.view,sales.create" }
    ]
  },
  {
    id: "CHG006",
    action: "create",
    user: "Ibrahim Hassan",
    entity: "Stock Transfer",
    entityId: "TRF123",
    entityName: "Transfer #TRF123",
    module: "inventory",
    date: "2025-04-20 15:40",
    changes: [
      { field: "from_branch", oldValue: "", newValue: "Main Warehouse" },
      { field: "to_branch", oldValue: "", newValue: "Apapa Branch" },
      { field: "items_count", oldValue: "", newValue: "15" }
    ]
  },
];
