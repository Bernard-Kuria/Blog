import { API_BASE } from "@utils/constants";

export async function getAllBlogsContent() {
  try {
    const res = await fetch(`${API_BASE}/api/blogs/all`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error in getAllBlogsContent:", err);
    throw err;
  }
}

export async function getBlogContentById(id: string) {
  try {
    const res = await fetch(`${API_BASE}/api/blogs/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
    const data = await res.json();
    return { id: data.id, blogContent: data.blogContent };
  } catch (err) {
    console.error("Error in getAllBlogsContent:", err);
    throw err;
  }
}
