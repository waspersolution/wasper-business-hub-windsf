
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import POSHeader from "./POSHeader";

interface POSContainerProps {
  isOnline: boolean;
  isMobile: boolean;
  children: React.ReactNode;
}

export default function POSContainer({ isOnline, isMobile, children }: POSContainerProps) {
  return (
    <DashboardLayout>
      <div className="flex flex-col w-full">
        <POSHeader isOnline={isOnline} isMobile={isMobile} />
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full min-h-[80vh]">
          {children}
        </div>
      </div>
    </DashboardLayout>
  );
}
