
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, BellRing } from "lucide-react";
import React from "react";
import type { TemplateType } from "./TemplateTable";

interface TabsHeaderProps {
  tab: TemplateType;
  setTab: (tab: TemplateType) => void;
}

export const TemplatesTabsHeader: React.FC<TabsHeaderProps> = ({ tab, setTab }) => (
  <Card>
    <CardHeader className="pb-2 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
      <CardTitle className="flex items-center gap-2 text-lg">
        Notifications
        <span className="ml-1 text-sm font-light text-muted-foreground">
          Manage all notification templates &amp; alerts
        </span>
      </CardTitle>
      <Tabs value={tab} onValueChange={v => setTab(v as TemplateType)} className="ml-0 md:ml-auto w-full md:w-auto">
        <TabsList>
          <TabsTrigger value="email" className={tab === "email" ? "font-semibold text-indigo-600" : ""}>
            <Mail size={17} className="mr-1" /> Email Templates
          </TabsTrigger>
          <TabsTrigger value="sms" className={tab === "sms" ? "font-semibold text-pink-600" : ""}>
            <MessageSquare size={17} className="mr-1" /> SMS Templates
          </TabsTrigger>
          <TabsTrigger value="alert" className={tab === "alert" ? "font-semibold text-orange-600" : ""}>
            <BellRing size={17} className="mr-1" /> System Alerts
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </CardHeader>
  </Card>
);

