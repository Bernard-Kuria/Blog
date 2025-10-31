import { API_BASE } from "@lib/constants";

export async function getAllComments() {
  try {
    const res = await fetch(`${API_BASE}/api/comments`, {
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

export const getSpecificBlogComments = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE}/api/comments/${id}`, {
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
};

export const getSpecificBlog = async (blog: string, id: string) => {
  try {
    const res = await fetch(`${API_BASE}/api/comments/${blog}/${id}`, {
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
};
