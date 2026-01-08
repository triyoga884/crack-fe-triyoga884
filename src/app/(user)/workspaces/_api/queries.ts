import { useQuery } from '@tanstack/react-query';
import { getAllVerifiedWorkspaces, getWorkspaceById } from './api';

export function useAllVerifiedWorkspaces() {
  return useQuery({
    queryKey: ['workspaces'],
    queryFn: getAllVerifiedWorkspaces,
  });
}

export function useWorkspaceById(id: string): any {
  return useQuery({
    queryKey: ['workspace', id],
    queryFn: () => getWorkspaceById(id),
    enabled: !!id,
  });
}
