"use client";

import * as React from "react";
import {
  CreditCard,
  Frame,
  Image,
  Images,
  Settings2,
  SparklesIcon,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavSettings } from "./nav-settings";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Generate Images",
      url: "/image-generation",
      icon: Image,
    },
    {
      title: "My Models",
      url: "/models",
      icon: Frame,
    },
    {
      title: "Train Model",
      url: "/train-model",
      icon: Images,
    },
  ],
  navSettings: [
    {
      title: "General",
      url: "/settings",
      icon: Settings2,
    },
    {
      title: "Billing",
      url: "/billing",
      icon: CreditCard,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <SparklesIcon className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Pictoria AI</span>
            <span className="truncate text-xs">PRO</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSettings items={data.navSettings} />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
