import {
  // useAuthBootstrap,
  useMe,
} from '../auth/queries';

export function useAuth() {
  const { data: user, isLoading, isError } = useMe();
  // const bootstrap = useAuthBootstrap();

  // const isChecking = bootstrap.isLoading;

  return {
    user,
    isAuthenticated: !!user,
    // isChecking,
    isLoading,
    isError,
  };
}
