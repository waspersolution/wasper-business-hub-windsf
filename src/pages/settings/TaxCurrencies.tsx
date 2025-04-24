
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DollarSign } from "lucide-react";
import { useState } from "react";

export default function TaxCurrencies() {
  const [activeTab, setActiveTab] = useState("tax");
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tax & Currencies</h1>
            <p className="text-muted-foreground mt-1">
              Configure tax rates, rules, and currency settings
            </p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="tax">Tax Settings</TabsTrigger>
            <TabsTrigger value="currencies">Currencies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tax" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-2 rounded-md bg-primary/10">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <CardTitle>Tax Configuration</CardTitle>
                  <CardDescription>
                    Configure tax rates and rules for your business
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="tax-inclusive">Tax Inclusive Pricing</Label>
                    <p className="text-sm text-muted-foreground">
                      Display prices with tax included
                    </p>
                  </div>
                  <Switch id="tax-inclusive" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-tax">Default Tax Rate (%)</Label>
                    <Input id="default-tax" type="number" placeholder="10.00" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tax-calculation">Tax Calculation Method</Label>
                    <Select defaultValue="per-item">
                      <SelectTrigger id="tax-calculation">
                        <SelectValue placeholder="Select calculation method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="per-item">Per Item</SelectItem>
                        <SelectItem value="subtotal">On Subtotal</SelectItem>
                        <SelectItem value="total">On Total</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button>Save Tax Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="currencies" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-2 rounded-md bg-primary/10">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <CardTitle>Currency Settings</CardTitle>
                  <CardDescription>
                    Configure base currency and display options
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="base-currency">Base Currency</Label>
                    <Select defaultValue="USD">
                      <SelectTrigger id="base-currency">
                        <SelectValue placeholder="Select base currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">US Dollar ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                        <SelectItem value="GBP">British Pound (£)</SelectItem>
                        <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                        <SelectItem value="CAD">Canadian Dollar (C$)</SelectItem>
                        <SelectItem value="AUD">Australian Dollar (A$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency-position">Currency Symbol Position</Label>
                    <Select defaultValue="before">
                      <SelectTrigger id="currency-position">
                        <SelectValue placeholder="Select symbol position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="before">Before amount ($100)</SelectItem>
                        <SelectItem value="after">After amount (100$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="decimal-separator">Decimal Separator</Label>
                    <Select defaultValue=".">
                      <SelectTrigger id="decimal-separator">
                        <SelectValue placeholder="Select decimal separator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=".">Period (.)</SelectItem>
                        <SelectItem value=",">Comma (,)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="thousand-separator">Thousand Separator</Label>
                    <Select defaultValue=",">
                      <SelectTrigger id="thousand-separator">
                        <SelectValue placeholder="Select thousand separator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=",">Comma (,)</SelectItem>
                        <SelectItem value=".">Period (.)</SelectItem>
                        <SelectItem value=" ">Space ( )</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button>Save Currency Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
