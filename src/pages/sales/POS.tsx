
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/contexts/SessionContext";
import { useState } from "react";

// Mock product data for demonstration
const mockProducts = [
  { id: "1", name: "Laptop", price: 120000, sku: "LP001", image: "https://placeholder.pics/svg/100" },
  { id: "2", name: "Smartphone", price: 45000, sku: "SP001", image: "https://placeholder.pics/svg/100" },
  { id: "3", name: "Headphones", price: 5000, sku: "HP001", image: "https://placeholder.pics/svg/100" },
  { id: "4", name: "USB Drive", price: 2500, sku: "USB001", image: "https://placeholder.pics/svg/100" },
  { id: "5", name: "Monitor", price: 35000, sku: "MN001", image: "https://placeholder.pics/svg/100" },
  { id: "6", name: "Keyboard", price: 3000, sku: "KB001", image: "https://placeholder.pics/svg/100" },
];

// Cart item type
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const POS = () => {
  const { session } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Add product to cart
  const addToCart = (product: typeof mockProducts[0]) => {
    setCart(prevCart => {
      // Check if product already in cart
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if already in cart
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      } else {
        // Add new item to cart
        return [...prevCart, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Filter products based on search term
  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Process payment (would connect to payment gateway in real implementation)
  const processPayment = (paymentMethod: string) => {
    alert(`Processing ${paymentMethod} payment for ₦${cartTotal.toLocaleString()}`);
    setCart([]);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4">
        <h1 className="text-2xl font-bold">Point of Sale (POS)</h1>
        
        <div className="flex flex-1 gap-4 h-full">
          {/* Product Selection */}
          <Card className="w-2/3">
            <CardHeader className="pb-3">
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Search and select products to add to cart
              </CardDescription>
              <div className="mt-2">
                <Input 
                  placeholder="Search by name or SKU..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <div 
                    key={product.id} 
                    className="border rounded-md p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => addToCart(product)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-xs">{product.sku}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{product.name}</h3>
                        <p className="text-sm text-wasper-secondary font-bold">₦{product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Cart and Payment */}
          <Card className="w-1/3 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle>Cart</CardTitle>
              <CardDescription>
                {cart.length} {cart.length === 1 ? 'item' : 'items'} in cart
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 overflow-auto">
                {cart.length > 0 ? (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="text-xs text-gray-500">₦{item.price.toLocaleString()} each</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-7 w-7 p-0 text-red-500"
                            onClick={() => removeFromCart(item.id)}
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <p className="text-muted-foreground">No items in cart</p>
                    <p className="text-sm text-muted-foreground">Click on products to add them to your cart</p>
                  </div>
                )}
              </div>
              
              {/* Total and Payment */}
              <div className="mt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>₦{cartTotal.toLocaleString()}</span>
                </div>
                
                {cart.length > 0 && (
                  <Tabs defaultValue="cash">
                    <TabsList className="grid grid-cols-4 w-full">
                      <TabsTrigger value="cash">Cash</TabsTrigger>
                      <TabsTrigger value="card">Card</TabsTrigger>
                      <TabsTrigger value="transfer">Transfer</TabsTrigger>
                      <TabsTrigger value="credit">Credit</TabsTrigger>
                    </TabsList>
                    <TabsContent value="cash" className="mt-2">
                      <Button className="w-full bg-wasper-secondary hover:bg-wasper-accent" onClick={() => processPayment('cash')}>
                        Complete Cash Payment
                      </Button>
                    </TabsContent>
                    <TabsContent value="card" className="mt-2">
                      <Button className="w-full bg-wasper-secondary hover:bg-wasper-accent" onClick={() => processPayment('card')}>
                        Process Card Payment
                      </Button>
                    </TabsContent>
                    <TabsContent value="transfer" className="mt-2">
                      <Button className="w-full bg-wasper-secondary hover:bg-wasper-accent" onClick={() => processPayment('transfer')}>
                        Complete Bank Transfer
                      </Button>
                    </TabsContent>
                    <TabsContent value="credit" className="mt-2">
                      <div className="space-y-2">
                        <Label htmlFor="customer">Customer</Label>
                        <Input id="customer" placeholder="Select customer" />
                        <Button className="w-full bg-wasper-secondary hover:bg-wasper-accent" onClick={() => processPayment('credit')}>
                          Record Credit Sale
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default POS;
