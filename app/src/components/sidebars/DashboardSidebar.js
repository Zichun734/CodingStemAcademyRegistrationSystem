import * as React from "react"
import { Plus } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import SideCalendar from "@/components/calendar/side"


export function DashboardSidebar({...props}) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh bg-background"
      {...props}
    >
      <SidebarContent>
        <SideCalendar />
      </SidebarContent>
    </Sidebar>
  )
}