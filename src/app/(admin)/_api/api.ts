import { getAccessToken } from '../../../lib/fetcher';
import { WorkspaceUpdateFormToApiSchema } from '../../../lib/schema';

const API = process.env.NEXT_PUBLIC_LOCAL_API;

export async function getWorkspaceByUserId(id: string) {
  const res = await fetch(`${API}/workspaces/user/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
  const data = await res.json();
  return data;
}

export async function createWorkspace(workspace: any) {
  const res = await fetch(`${API}/workspaces`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(workspace),
  });
  const data = await res.json();
  return data;
}

export async function updateWorkspace(
  workspace: WorkspaceUpdateFormToApiSchema
) {
  const res = await fetch(`${API}/workspaces/${workspace.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(workspace),
  });
  const data = await res.json();
  return data;
}

export async function deleteWorkspace(id: string) {
  const res = await fetch(`${API}/workspaces/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
  const data = await res.json();
  return data;
}
