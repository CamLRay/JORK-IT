import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
} from "~/components/ui/sidebar"
import Link from "next/link"
import { Icon } from "@iconify/react/dist/iconify.js"
const menu =[
  { name: "dashboard", path: '/', icon: ["material-symbols:dashboard-outline", "material-symbols:dashboard" ] }, 
  { name: "history", path: '/history', icon: ["material-symbols-light:book-outline", "material-symbols-light:book" ] }, 
  { name: "", path: '', icon: ["f7:plus-app-fill", "f7:plus-app-fill"] }, 
  { name: "exercises", path: '/exercises', icon: ["healthicons:exercise-outline", "healthicons:exercise"] },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-zinc-700 border-zinc-700">
        <SidebarGroup>
        <SidebarMenu> 
        {menu.map((option, index) => (
            <Link key={index} href={option.path} className="capitalize flex" ><Icon icon={option.icon[1]!} className="text-3xl text-white"/>{option.name}</Link>
          ))}
        </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  )
}
