import { useQuery } from '@tanstack/react-query';
import { getWorkspaceByUserId } from './api';

export function useWorkspaceByUserId(id: string) {
  return useQuery({
    queryKey: ['workspaces', 'userId', id],
    queryFn: () => getWorkspaceByUserId(id),
    enabled: !!id,
  });
}
