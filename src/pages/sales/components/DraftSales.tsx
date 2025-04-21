
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, ShoppingBag, User, Calendar } from "lucide-react";
import { DraftSale } from "@/types/sales";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Mock draft sales
const mockDraftSales: DraftSale[] = [
  {
    id: "DS001",
    branch_id: "B001",
    customer_id: "C1",
    customer_name: "John Doe",
    items: [
      { id: "I1", sale_id: "DS001", product_id: "P1", quantity: 2, unit_price: 200, total: 400 },
      { id: "I2", sale_id: "DS001", product_id: "P2", quantity: 1, unit_price: 950, total: 950 }
    ],
    total: 1350,
    created_at: "2025-04-20T15:30:00",
    created_by: "U001",
    created_by_name: "Sales Staff"
  },
  {
    id: "DS002",
    branch_id: "B001",
    items: [
      { id: "I3", sale_id: "DS002", product_id: "P3", quantity: 3, unit_price: 150, total: 450 }
    ],
    total: 450,
    created_at: "2025-04-21T10:15:00",
    created_by: "U001",
    created_by_name: "Sales Staff"
  }
];

interface DraftSalesProps {
  onResumeDraft: (draft: DraftSale) => void;
}

export default function DraftSales({ onResumeDraft }: DraftSalesProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleResumeDraft = (draft: DraftSale) => {
    onResumeDraft(draft);
    setIsOpen(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Resume Draft
          <Badge variant="secondary" className="ml-1">{mockDraftSales.length}</Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Saved Drafts</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[400px] mt-2">
          {mockDraftSales.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No draft sales found
            </div>
          ) : (
            <div className="space-y-3">
              {mockDraftSales.map((draft) => (
                <div key={draft.id} className="border rounded-lg p-3 hover:bg-slate-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium flex items-center">
                        <ShoppingBag className="h-4 w-4 mr-1 text-wasper-primary" />
                        Draft #{draft.id}
                      </h4>
                      
                      <div className="text-sm text-muted-foreground mt-1">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {draft.customer_name || "Walk-in Customer"}
                        </div>
                        <div className="flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(new Date(draft.created_at), "MMM dd, yyyy • hh:mm a")}
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <span className="text-sm">{draft.items.length} items</span>
                        <span className="font-semibold text-wasper-primary block">
                          ₦{draft.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      onClick={() => handleResumeDraft(draft)}
                    >
                      Resume
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
