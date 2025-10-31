import { API_BASE } from "@lib/constants";

export async function getAllBlogs(filters?: { id?: string; topic?: string }) {
  const params = new URLSearchParams();

  if (filters?.id) params.append("id", filters.id);
  if (filters?.topic) params.append("topic", filters.topic);

  const res = await fetch(
    `${API_BASE}/api/featuredBlogs?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export async function getBlogMetaById(id: string) {
  try {
    const res = await fetch(`${API_BASE}/api/blogs/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
    const data = await res.json();
    return { id: data.id, blogMeta: data.blogMeta };
  } catch (err) {
    console.error("Error in getAllBlogsContent:", err);
    throw err;
  }
}
