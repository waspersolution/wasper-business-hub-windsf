
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Languages } from "lucide-react";
import { useState } from "react";

export default function Localization() {
  const [activeTab, setActiveTab] = useState("language");
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Language & Localization</h1>
            <p className="text-muted-foreground mt-1">
              Configure language preferences and regional settings
            </p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="language">Language</TabsTrigger>
            <TabsTrigger value="regional">Regional Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="language" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-2 rounded-md bg-primary/10">
                  <Languages className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <CardTitle>Language Settings</CardTitle>
                  <CardDescription>
                    Select default language and translation options
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="defaultLanguage">Default Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="defaultLanguage">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English (US)</SelectItem>
                        <SelectItem value="en-gb">English (UK)</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                        <SelectItem value="ar">Arabic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fallbackLanguage">Fallback Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="fallbackLanguage">
                        <SelectValue placeholder="Select fallback language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English (US)</SelectItem>
                        <SelectItem value="en-gb">English (UK)</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button>Save Language Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="regional" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-2 rounded-md bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <CardTitle>Regional Settings</CardTitle>
                  <CardDescription>
                    Configure date, time, and number formats
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select defaultValue="MM/DD/YYYY">
                      <SelectTrigger id="dateFormat">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        <SelectItem value="DD.MM.YYYY">DD.MM.YYYY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeFormat">Time Format</Label>
                    <Select defaultValue="12">
                      <SelectTrigger id="timeFormat">
                        <SelectValue placeholder="Select time format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12-hour (AM/PM)</SelectItem>
                        <SelectItem value="24">24-hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="UTC">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Standard Time (EST)</SelectItem>
                        <SelectItem value="CST">Central Standard Time (CST)</SelectItem>
                        <SelectItem value="PST">Pacific Standard Time (PST)</SelectItem>
                        <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="CET">Central European Time (CET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="numberFormat">Number Format</Label>
                    <Select defaultValue="1,234.56">
                      <SelectTrigger id="numberFormat">
                        <SelectValue placeholder="Select number format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1,234.56">1,234.56</SelectItem>
                        <SelectItem value="1.234,56">1.234,56</SelectItem>
                        <SelectItem value="1 234.56">1 234.56</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button>Save Regional Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
