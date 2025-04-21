
import { useState } from "react";
import { Wifi, WifiOff, Loader2, Grid, List, Search, User, Plus, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import POSAddItem from "./POSAddItem";
import POSCart from "./POSCart";
import POSSummary from "./POSSummary";

// Mock categories
const categories = [
  { id: "all", name: "All Items", icon: Grid },
  { id: "beverages", name: "Beverages", icon: Grid },
  { id: "food", name: "Food", icon: Grid },
  { id: "electronics", name: "Electronics", icon: Grid },
  { id: "clothing", name: "Clothing", icon: Grid },
  { id: "personal", name: "Personal Care", icon: Grid },
];

// Mock products
const products = [
  { id: 1, name: "Coca-Cola 50cl", price: 200, category: "beverages", stock: 24 },
  { id: 2, name: "Bread Sliced 600g", price: 950, category: "food", stock: 15 },
  { id: 3, name: "iPhone Charger", price: 3500, category: "electronics", stock: 8 },
  { id: 4, name: "T-Shirt Plain", price: 2500, category: "clothing", stock: 30 },
  { id: 5, name: "Hand Soap", price: 800, category: "personal", stock: 12 },
  { id: 6, name: "Pepsi 50cl", price: 200, category: "beverages", stock: 20 },
  { id: 7, name: "Rice 1kg", price: 1800, category: "food", stock: 25 },
  { id: 8, name: "USB Cable", price: 1500, category: "electronics", stock: 14 },
  { id: 9, name: "Water 50cl", price: 150, category: "beverages", stock: 48 },
];

export default function POS() {
  // Demo online/offline UI
  const [isOnline, setIsOnline] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  
  const isMobile = useIsMobile();

  // Filter products by search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Company header on mobile */}
      {isMobile && (
        <div className="bg-white p-3 shadow-sm flex items-center justify-between mb-4 rounded-lg">
          <h1 className="text-lg font-bold text-wasper-primary">Wasper POS</h1>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="text-green-600 h-5 w-5" />
            ) : (
              <WifiOff className="text-yellow-500 h-5 w-5" />
            )}
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full min-h-[80vh]">
        {/* Left: Product Selection Area */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Search & View Toggle */}
          <div className="bg-white rounded-lg shadow p-3 flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant={viewMode === "grid" ? "default" : "outline"} 
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "outline"} 
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="bg-white rounded-lg shadow p-3">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
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

          {/* Product Grid/List */}
          <div className="bg-white rounded-lg shadow p-3 flex-1">
            <div className={`${viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3' : 'flex flex-col gap-2'}`}>
              {filteredProducts.map((product) => (
                viewMode === 'grid' ? (
                  <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                    <div className="bg-wasper-light h-24 flex items-center justify-center">
                      <div className="text-2xl font-bold text-wasper-primary">
                        {product.name.substring(0, 1)}
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <div className="font-medium truncate">{product.name}</div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-sm font-semibold">₦{product.price.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Stock: {product.stock}</div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div 
                    key={product.id} 
                    className="p-2 border rounded-md flex items-center hover:bg-slate-50 cursor-pointer"
                  >
                    <div className="bg-wasper-light h-10 w-10 rounded-md flex items-center justify-center mr-3">
                      <div className="font-bold text-wasper-primary">
                        {product.name.substring(0, 1)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground">Stock: {product.stock}</div>
                    </div>
                    <div className="font-semibold">₦{product.price.toLocaleString()}</div>
                  </div>
                )
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No products found. Try a different search.
              </div>
            )}
          </div>
        </div>

        {/* Right: Cart & Checkout - Show on Desktop, Hide on Mobile */}
        <div className="w-full md:max-w-sm md:flex flex-col gap-4 hidden">
          {/* Offline/Sync status */}
          <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow">
            <div className="flex items-center gap-2">
              {isOnline ? (
                <>
                  <Wifi className="text-green-600" />
                  <span className="text-green-700 font-medium">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="text-yellow-500" />
                  <span className="text-yellow-700 font-medium">Offline</span>
                </>
              )}
            </div>
            {!isOnline && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                disabled
              >
                <Loader2 className="h-4 w-4 animate-spin" />
                Sync
              </Button>
            )}
          </div>
          
          {/* Cart section */}
          <div className="bg-white rounded-lg shadow-lg p-4 flex-1 flex flex-col">
            <POSCart />
          </div>
          
          {/* Sales summary/payment */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <POSSummary onComplete={() => setIsReceiptOpen(true)} />
          </div>
        </div>

        {/* Mobile: Cart Button */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button className="fixed bottom-4 right-4 z-10 rounded-full shadow-lg size-14 p-0">
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full size-6 flex items-center justify-center">
                  2
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold">₦</span>
                  <span className="text-[10px]">View Cart</span>
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] px-0">
              <SheetHeader className="px-4">
                <SheetTitle>Your Cart</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-auto p-4">
                  <POSCart />
                </div>
                <div className="p-4 border-t">
                  <POSSummary onComplete={() => setIsReceiptOpen(true)} />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>

      {/* Receipt Modal */}
      <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Receipt #12345</DialogTitle>
          </DialogHeader>
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="text-center mb-4">
              <h3 className="font-bold text-lg">Wasper Business</h3>
              <p className="text-sm text-gray-500">123 Main Street, City</p>
              <p className="text-sm text-gray-500">Tel: +234 123 4567</p>
              <p className="text-sm text-gray-500">Date: {new Date().toLocaleString()}</p>
            </div>
            
            <div className="border-t border-b py-2 my-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Item</span>
                <span>Total</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <div>
                  <p>Coca-Cola 50cl</p>
                  <p className="text-xs text-gray-500">2 × ₦200</p>
                </div>
                <span>₦400</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <div>
                  <p>Bread Sliced 600g</p>
                  <p className="text-xs text-gray-500">1 × ₦950</p>
                </div>
                <span>₦950</span>
              </div>
            </div>
            
            <div className="mt-2 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₦1,350</span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span>-₦100</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>₦1,250</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Payment Method:</span>
                <span>Cash</span>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center gap-3">
              <Button variant="outline" size="sm">
                Print
              </Button>
              <Button variant="outline" size="sm">
                Download
              </Button>
              <Button variant="outline" size="sm">
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
