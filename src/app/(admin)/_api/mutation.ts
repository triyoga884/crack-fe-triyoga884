import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWorkspace, deleteWorkspace, updateWorkspace } from './api';
import { WorkspaceUpdateFormToApiSchema } from '../../../lib/schema';

export function useCreateWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (workspaces: any) => createWorkspace(workspaces),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces'],
      });
    },
  });
}

export function useUpdateWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (workspace: WorkspaceUpdateFormToApiSchema) =>
      updateWorkspace(workspace),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces'],
      });
    },
  });
}

export function useDeleteWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteWorkspace(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces'],
      });
    },
  });
}
