
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Barcode } from "lucide-react";

export default function POSAddItem() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-wasper-primary">Quick Add</h2>
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Barcode className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Scan barcode..."
            className="pl-9"
          />
        </div>
        <Button variant="secondary">
          <Plus className="mr-1 h-4 w-4" />
          Add
        </Button>
      </div>
    </div>
  );
}
