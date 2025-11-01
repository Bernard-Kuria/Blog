import { API_BASE } from "@utils/constants";

export async function getAllDrafts(filters?: { id?: string; topic?: string }) {
  const params = new URLSearchParams();

  if (filters?.id) params.append("id", filters.id);
  if (filters?.topic) params.append("topic", filters.topic);

  const res = await fetch(`${API_BASE}/api/drafts?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch drafts");
  return res.json();
}

export async function getDraftMetaById(id: string) {
  try {
    const res = await fetch(`${API_BASE}/api/drafts/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch drafts: ${res.status}`);
    const data = await res.json();
    return { id: data.id, blogMeta: data.blogMeta };
  } catch (err) {
    console.error("Error in getAllDraftsContent:", err);
    throw err;
  }
}
