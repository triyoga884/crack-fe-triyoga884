'use client';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/AdminSidebar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return router.push('/login');

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
