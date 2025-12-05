import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/AdminSidebar';
import { Separator } from '@/components/ui/separator';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="w-full">
        <div className="flex items-center p-2">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mx-2 h-6" />
          <h1>Dashboard</h1>
        </div>
        <Separator />
        {children}
      </main>
    </SidebarProvider>
  );
}
