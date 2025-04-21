
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";

export default function POSAddItem() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-wasper-primary">Add Item</h2>
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Search or scan item..."
          className="flex-1"
          disabled
        />
        <Button variant="secondary" disabled>
          <Search className="mr-2" />
          Search
        </Button>
        <Button variant="outline" disabled>
          <Plus className="mr-2" />
          Quick Add
        </Button>
      </div>
    </div>
  );
}
