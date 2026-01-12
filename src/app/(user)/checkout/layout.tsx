'use client';

import { useAuth } from '@/hooks/useAuth';
import { redirect, useRouter } from 'next/navigation';

export default function UserProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated) redirect('/login');

  return <>{children}</>;
}
