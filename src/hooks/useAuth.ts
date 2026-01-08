// src/hooks/useAuth.ts
import { useMe } from '../auth/queries';

export function useAuth() {
  const { data: user, isLoading, isError } = useMe();

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    isError,
  };
}
