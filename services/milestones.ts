import { API_BASE } from "@lib/constants";

export async function getAllMilestones(topic?: string) {
  try {
    const res = await fetch(
      `${API_BASE}/api/milestones?topic=${
        topic ? encodeURIComponent(topic) : ""
      }`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok)
      throw new Error(`Failed to fetch featured blogs: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error in getAllFeaturedBlogs:", err);
    throw err;
  }
}
