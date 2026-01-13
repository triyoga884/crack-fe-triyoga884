const API = process.env.NEXT_PUBLIC_LOCAL_API;

export async function authFetch(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> {
  const res = await fetch(input, {
    ...init,
    credentials: 'include',
  });

  if (res.status !== 401) return res;

  // try refresh
  const refreshRes = await fetch(`${API}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!refreshRes.ok) throw new Error('Unauthorized');

  return fetch(input, {
    ...init,
    credentials: 'include',
  });
}
