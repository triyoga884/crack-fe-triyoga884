import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWorkspace, deleteWorkspace, updateWorkspace } from './api';
import { WorkspaceUpdateFormToApiSchema } from '../../../lib/schema';

export function useCreateWorkspace(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (workspaces: any) => createWorkspace(workspaces),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', 'userId', id],
      });
    },
  });
}

export function useUpdateWorkspace(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (workspace: WorkspaceUpdateFormToApiSchema) =>
      updateWorkspace(workspace),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', 'userId', id],
      });
    },
  });
}

export function useDeleteWorkspace(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteWorkspace(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', 'userId', id],
      });
    },
  });
}
