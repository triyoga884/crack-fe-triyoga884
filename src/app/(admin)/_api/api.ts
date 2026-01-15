import {
  UserSchema,
  WorkspaceUpdateFormToApiSchema,
} from '../../../lib/schema';

const API = process.env.NEXT_PUBLIC_LOCAL_API;

//  WORKSPACE
export async function getWorkspaceByUserId(id: string) {
  const res = await fetch(`${API}/workspaces/user/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}

export async function createWorkspace(workspace: any) {
  const res = await fetch(`${API}/workspaces`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
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
    },
    credentials: 'include',
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
    },
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}

// USER
export async function getUsers() {
  const res = await fetch(`${API}/users`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = res.json();
  return data;
}

export async function updateUser(user: UserSchema) {
  const { id, ...rest } = user;
  const res = await fetch(`${API}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(rest),
  });
  const data = res.json();
  return data;
}

export async function deleteUser(id: string) {
  const res = await fetch(`${API}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = res.json();
  return data;
}

// BOOKING

export async function getBookings() {
  const res = await fetch(`${API}/bookings`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = res.json();
  return data;
}

export async function getBookingsMyWorkspace() {
  const res = await fetch(`${API}/bookings/workspace/me`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = res.json();
  return data;
}

export async function deleteBooking(id: string) {
  const res = await fetch(`${API}/bookings/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  const data = res.json();
  return data;
}

// STAT

export async function getAllStat() {
  const res = await fetch(`${API}/stats`, {
    credentials: 'include',
  });
  const data = res.json();
  return data;
}

export async function getStatProvider() {
  const res = await fetch(`${API}/stats/me`, {
    credentials: 'include',
  });
  const data = res.json();
  return data;
}
