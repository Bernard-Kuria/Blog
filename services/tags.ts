import { API_BASE } from "@utils/constants";

export async function getAllTags() {
  try {
    const res = await fetch(`${API_BASE}/api/tags`, {
      cache: "no-store",
    });
    if (!res.ok)
      throw new Error(`Failed to fetch featured blogs: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error in getAllFeaturedBlogs:", err);
    throw err;
  }
}
