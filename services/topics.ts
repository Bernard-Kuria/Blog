import { API_BASE } from "@utils/constants";

export async function getAllTopics() {
  try {
    const res = await fetch(`${API_BASE}/api/blogTopics`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch topics: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error in getAllTopics:", err);
    throw err;
  }
}
