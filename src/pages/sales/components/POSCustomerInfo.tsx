
import { User } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Customer } from "@/types/sales";

interface POSCustomerInfoProps {
  selectedCustomer: Customer | null;
  selectedGroup: string | null;
}

export default function POSCustomerInfo({ selectedCustomer, selectedGroup }: POSCustomerInfoProps) {
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm">
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">
          {selectedCustomer ? selectedCustomer.name : "Walk-in Customer"}
        </span>
        {selectedGroup && (
          <Badge variant="secondary" className="ml-auto text-xs">
            Group discount applied
          </Badge>
        )}
      </div>
    </div>
  );
}
