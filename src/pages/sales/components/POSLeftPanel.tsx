
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import POSSearchBar from "./POSSearchBar";
import POSQuantityInput from "./POSQuantityInput";
import POSProductList from "./POSProductList";
import DraftSales from "./DraftSales";
import CustomerGroupSelector from "./CustomerGroupSelector";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid } from "lucide-react";

interface POSLeftPanelProps {
  searchQuery: string;
  viewMode: "grid" | "list";
  selectedCategory: string;
  currentQuantity: number;
  products: any[];
  onSearchChange: (value: string) => void;
  onViewModeChange: (mode: "grid" | "list") => void;
  onCategoryChange: (category: string) => void;
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProductSelect: (product: any) => void;
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  quantityInputRef: React.RefObject<HTMLInputElement>;
  addToCartButtonRef: React.RefObject<HTMLButtonElement>;
  onCustomerGroupSelect: (groupId: string) => void;
  onCustomerSelect: (customer: any) => void;
}

const categories = [
  { id: "all", name: "All Items", icon: Grid },
  { id: "beverages", name: "Beverages", icon: Grid },
  { id: "food", name: "Food", icon: Grid },
  { id: "electronics", name: "Electronics", icon: Grid },
  { id: "clothing", name: "Clothing", icon: Grid },
  { id: "personal", name: "Personal Care", icon: Grid },
];

export default function POSLeftPanel({ 
  searchQuery,
  viewMode,
  selectedCategory,
  currentQuantity,
  products,
  onSearchChange,
  onViewModeChange,
  onCategoryChange,
  onQuantityChange,
  onProductSelect,
  onSearchKeyDown,
  searchInputRef,
  quantityInputRef,
  addToCartButtonRef,
  onCustomerGroupSelect,
  onCustomerSelect
}: POSLeftPanelProps) {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Branch: <span className="font-bold text-wasper-primary">Main Branch</span></h3>
            <Badge variant="outline">Branch ID: B001</Badge>
          </div>
          <CustomerGroupSelector 
            currentBranchId="B001"
            onCustomerGroupSelect={onCustomerGroupSelect}
            onCustomerSelect={onCustomerSelect}
          />
        </CardContent>
      </Card>

      <DraftSales onResumeDraft={() => {}} />

      <POSSearchBar 
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        onKeyDown={onSearchKeyDown}
        inputRef={searchInputRef}
      />

      <POSQuantityInput 
        quantity={currentQuantity}
        onQuantityChange={onQuantityChange}
        onKeyDown={onSearchKeyDown}
        onAddToCart={() => onProductSelect(products[0])}
        inputRef={quantityInputRef}
        buttonRef={addToCartButtonRef}
        disabled={products.length === 0}
      />

      <div className="bg-white rounded-lg shadow p-3">
        <Tabs value={selectedCategory} onValueChange={onCategoryChange}>
          <TabsList className="flex w-full overflow-x-auto pb-1 hide-scrollbar">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex gap-1 items-center whitespace-nowrap"
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <POSProductList 
        viewMode={viewMode}
        products={products}
        onProductSelect={onProductSelect}
      />
    </div>
  );
}
