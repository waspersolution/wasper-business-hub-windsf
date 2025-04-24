
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function POSSettings() {
  const [activeTab, setActiveTab] = useState("general");
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">POS Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure point of sale behavior and receipt templates
            </p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="receipts">Receipts</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-2 rounded-md bg-primary/10">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <CardTitle>General POS Settings</CardTitle>
                  <CardDescription>
                    Configure behavior of the point of sale system
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="quick-checkout">Quick Checkout</Label>
                    <p className="text-sm text-muted-foreground">
                      Skip confirmation screen during checkout
                    </p>
                  </div>
                  <Switch id="quick-checkout" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-print">Auto-Print Receipts</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically print receipt after sale
                    </p>
                  </div>
                  <Switch id="auto-print" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-view">Default POS View</Label>
                    <Select defaultValue="grid">
                      <SelectTrigger id="default-view">
                        <SelectValue placeholder="Select default view" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">Grid View</SelectItem>
                        <SelectItem value="list">List View</SelectItem>
                        <SelectItem value="category">Category View</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="items-per-page">Products Per Page</Label>
                    <Select defaultValue="16">
                      <SelectTrigger id="items-per-page">
                        <SelectValue placeholder="Select items per page" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8">8 items</SelectItem>
                        <SelectItem value="16">16 items</SelectItem>
                        <SelectItem value="24">24 items</SelectItem>
                        <SelectItem value="32">32 items</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button>Save General Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="receipts" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-2 rounded-md bg-primary/10">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <CardTitle>Receipt Settings</CardTitle>
                  <CardDescription>
                    Configure receipt format and content
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="receipt-header">Receipt Header</Label>
                    <Input id="receipt-header" placeholder="Company Name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="receipt-size">Receipt Paper Size</Label>
                    <Select defaultValue="80mm">
                      <SelectTrigger id="receipt-size">
                        <SelectValue placeholder="Select receipt size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="58mm">58mm</SelectItem>
                        <SelectItem value="80mm">80mm</SelectItem>
                        <SelectItem value="a4">A4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="receipt-footer">Receipt Footer</Label>
                  <Textarea id="receipt-footer" placeholder="Thank you for your purchase!" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-tax">Show Tax Details</Label>
                    <p className="text-sm text-muted-foreground">
                      Display tax breakdown on receipts
                    </p>
                  </div>
                  <Switch id="show-tax" defaultChecked />
                </div>
                
                <div className="pt-4">
                  <Button>Save Receipt Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-2 rounded-md bg-primary/10">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>
                    Configure payment methods and options
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="cash">Cash</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable cash payments
                    </p>
                  </div>
                  <Switch id="cash" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="card">Card</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable card payments
                    </p>
                  </div>
                  <Switch id="card" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="mobile">Mobile Payments</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable mobile wallet payments
                    </p>
                  </div>
                  <Switch id="mobile" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="credit">Store Credit</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow payments with store credit
                    </p>
                  </div>
                  <Switch id="credit" />
                </div>
                
                <div className="pt-4">
                  <Button>Save Payment Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
