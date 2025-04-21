
export function getStatusColor(status: string) {
  switch (status) {
    case "completed": return "success";
    case "pending": return "warning";
    case "cancelled": return "danger";
    default: return "outline";
  }
}

export function getPaymentMethodDisplay(method: string) {
  switch (method) {
    case "card": return "Credit/Debit Card";
    case "cash": return "Cash";
    case "transfer": return "Bank Transfer";
    default: return method;
  }
}
