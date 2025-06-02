import { AppSidebar } from "@/components/atoms/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-screen pt-8 overflow-hidden">
        <div className="fixed top-0">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}