export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

import {
  BlogsType,
  BlogTopicsType,
  commentsType,
  draftsType,
  Milestones,
} from "@lib/types";

const imagesHome = [
  "/assets/homeImages/chill.jpg",
  "/assets/homeImages/bike-riding.jpg",
  "/assets/homeImages/jkuat-hackathon.jpg",
];

export const homePageImages = () => imagesHome;

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

export async function allTopics() {
  const topics: BlogTopicsType = await getAllTopics();
  return topics;
}

export async function getAllBlogs() {
  const res = await fetch(`${API_BASE}/api/blogs`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export async function getAllFeaturedBlogs() {
  try {
    const res = await fetch(`${API_BASE}/api/featuredBlogs`, {
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

export async function getAllDrafts() {
  try {
    const res = await fetch(`${API_BASE}/api/drafts`, {
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

export async function getAllMilestones() {
  try {
    const res = await fetch(`${API_BASE}/api/milestones`, {
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

export const getCommentsById = async (id: string) => {
  const comments: commentsType = await getAllComments();
  return comments.filter((c) => c.id === id);
};

export const getTopicFromLink = (link: string) =>
  link
    .split("-")
    .map((p) => (p === "%26" ? "&" : p))
    .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
    .join(" ");

export const getLinkFromTopic = (b: string) =>
  b
    .toLowerCase()
    .split(" ")
    .map((p) => (p === "%26" ? "&" : p))
    .join("-");

export const getTopicMatchingPage = async (page: string) => {
  const topics: BlogTopicsType = await getAllTopics();
  return topics.find(
    (t) =>
      getLinkFromTopic(t.title) ===
      page
        .split("-")
        .map((char) => (char === "%26" ? "&" : char))
        .join("-")
  );
};

export const getFeaturedBlogByTopic = async (topic: string) => {
  const allFeaturedBlogs: { id: string; topic: string }[] =
    await getAllFeaturedBlogs();
  const targetBlogId = allFeaturedBlogs.find((f) => f.topic === topic)?.id;
  const blog = await getBlogMetaById(targetBlogId || "");
  return blog;
};

export const checkIsFeatured = async (id: string) => {
  const allFeaturedBlogs: { id: string; topic: string }[] =
    await getAllFeaturedBlogs();
  const isFeatured = allFeaturedBlogs.some((f) => f.id === id);
  return isFeatured;
};

export const getMilestonesByTopic = async (topic: string) => {
  const milestones: Milestones[] = await getAllMilestones();
  return milestones.find((m) => m.topic === topic);
};

export const filterBlogsBy = async (
  type: string,
  filter: string | number | string[]
) => {
  const allBlogs: BlogsType = await getAllBlogs();
  switch (type) {
    case "id":
      return allBlogs.filter((blog) => blog.id === filter);
    case "image":
      return allBlogs.filter((blog) => blog.blogMeta.image === filter);
    case "topic":
      return allBlogs.filter((blog) => blog.blogMeta.topic === filter);
    case "title":
      return allBlogs.filter((blog) => blog.blogMeta.title === filter);
    case "subtitle":
      return allBlogs.filter((blog) => blog.blogMeta.subtitle === filter);
    case "dateCreated":
      return allBlogs.filter((blog) => blog.blogMeta.dateCreated === filter);
    case "tags":
      return allBlogs.filter((blog) =>
        blog.blogMeta.tags.includes(typeof filter === "string" ? filter : "")
      );
    case "minsRead":
      return allBlogs.filter((blog) => blog.blogMeta.minsRead === filter);
    case "likes":
      return allBlogs.filter((blog) => blog.blogMeta.likes === filter);
    case "comments":
      return allBlogs.filter((blog) => blog.blogMeta.comments === filter);
    case "views":
      return allBlogs.filter((blog) => blog.blogMeta.views === filter);
    default:
      return allBlogs;
  }
};

export const filterDraftsByTopic = async (topic: string) => {
  const allBlogs: draftsType = await getAllDrafts();
  return allBlogs.filter((blog) => blog.topic === topic);
};
