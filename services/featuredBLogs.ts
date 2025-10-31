import { API_BASE } from "@lib/constants";

export async function getFeaturedBlogs(filters?: {
  id?: string;
  topic?: string;
}) {
  try {
    const params = new URLSearchParams();

    if (filters?.id) params.append("id", filters.id);
    if (filters?.topic) params.append("topic", filters.topic);

    const res = await fetch(
      `${API_BASE}/api/featuredBlogs?${params.toString()}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok)
      throw new Error(`Failed to fetch featured blogs: ${res.status}`);

    return await res.json();
  } catch (err) {
    console.error("Error in getFeaturedBlogs:", err);
    throw err;
  }
}

export const checkIsFeatured = async (id: string) => {
  try {
    const blog = await getFeaturedBlogs({ id });
    return !!blog; // !! converts to real boolean
  } catch {
    return false;
  }
};

// await getFeaturedBlogs(); // all
// await getFeaturedBlogs({ topic: "tech" }); // by topic
// await getFeaturedBlogs({ id: "abc123" }); // single blog
