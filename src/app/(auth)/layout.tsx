'use client';

import { useAuth } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return null;
  if (isAuthenticated && user.role === 'USER') {
    redirect('/');
  } else if (isAuthenticated && user.role !== 'USER') redirect('/dashboard');

  return <>{children}</>;
}
