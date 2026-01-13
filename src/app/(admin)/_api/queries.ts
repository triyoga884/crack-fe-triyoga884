import { useQuery } from '@tanstack/react-query';
import { getUsers, getWorkspaceByUserId } from './api';

export function useWorkspaceByUserId(id: string) {
  return useQuery({
    queryKey: ['workspaces', 'userId', id],
    queryFn: () => getWorkspaceByUserId(id),
    enabled: !!id,
  });
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
}
