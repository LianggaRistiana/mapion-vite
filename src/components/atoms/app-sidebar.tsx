import { MapIcon, PlusIcon, MapPinnedIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { logout } from "@/services/logutService";
import { ConfirmDialog } from "./confirm-dialog";

const items = [
  {
    title: "Home",
    url: "/home",
    icon: MapIcon,
  },
  {
    title: "Jalan",
    url: "/road",
    icon: MapPinnedIcon,
  },
  {
    title: "Tambah jalan",
    url: "/add-road",
    icon: PlusIcon,
  },
]

export function AppSidebar() {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const handleLogout = async () => {
    try {
      const res = await logout()
      localStorage.removeItem('token')
      toast.success(res.meta.message || 'Berhasil logout')
      navigate('/login')
    } catch (err: any) {
      toast.error(err.message ?? 'Gagal logout')
    }
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={currentPath === item.url}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
        <ConfirmDialog
          title="Apakah anda yakin ingin keluar?"
          description="aksi ini akan mengeluarkan akun anda saat ini dari website"
          onConfirm={handleLogout}
        >
          <Button className="w-full">
            Keluar
          </Button>
        </ConfirmDialog>
      </SidebarFooter>
    </Sidebar>
  )
}