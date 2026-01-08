const API = process.env.NEXT_PUBLIC_LOCAL_API;

export async function getAllVerifiedWorkspaces() {
  const res = await fetch(`${API}/workspaces/verified`);
  const data = await res.json();
  return data;
}

export async function getWorkspaceById(id: string) {
  const res = await fetch(`${API}/workspaces/${id}`);
  const data = await res.json();
  return data;
}
