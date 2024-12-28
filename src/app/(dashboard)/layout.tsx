import React from "react";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider className="h-screen overflow-hidden">
      <AppSidebar />

      <SidebarInset className="h-full">
        <div className="w-fit flex items-center gap-2 px-4 mt-2">
          <SidebarTrigger className="-ml-1" />
        </div>

        <main className="h-screen overflow-hidden p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
