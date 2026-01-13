import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createWorkspace,
  deleteUser,
  deleteWorkspace,
  updateUser,
  updateWorkspace,
} from './api';
import {
  UserSchema,
  WorkspaceUpdateFormToApiSchema,
} from '../../../lib/schema';

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

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: UserSchema) => updateUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });
}
