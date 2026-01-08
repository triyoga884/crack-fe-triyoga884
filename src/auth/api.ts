// src/features/auth/api.ts
import {
  authFetch,
  setAccessToken,
  clearAccessToken,
  getAccessToken,
} from '@/lib/fetcher';

const API = 'http://localhost:3001/auth';

export async function login(email: string, password: string) {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Login failed');

  const data = await res.json();
  setAccessToken(data.access_token);
  return data;
}

export async function getMe() {
  const res = await authFetch(`${API}/me`);
  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
}

export async function logout() {
  await fetch(`${API}/logout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getAccessToken()}` },
    credentials: 'include',
  });
  clearAccessToken();
}
