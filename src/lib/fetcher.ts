// src/lib/fetcher.ts
let accessToken: string | null = null;

export function setAccessToken(token: string) {
  accessToken = token;
}

export function clearAccessToken() {
  accessToken = null;
}

export function getAccessToken() {
  return accessToken;
}

export async function authFetch(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> {
  const res = await fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    credentials: 'include',
  });

  if (res.status !== 401) return res;

  // try refresh
  const refreshRes = await fetch('http://localhost:3001/auth/refresh', {
    method: 'POST',
    credentials: 'include',
  });

  if (!refreshRes.ok) {
    clearAccessToken();
    throw new Error('Unauthorized');
  }

  const data = await refreshRes.json();
  setAccessToken(data.accessToken);

  return fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: `Bearer ${data.accessToken}`,
    },
    credentials: 'include',
  });
}
