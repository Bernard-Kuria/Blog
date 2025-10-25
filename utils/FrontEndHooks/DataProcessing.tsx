import {
  blogContent,
  blogTopics,
  blogs,
  featuredBlog,
  drafts,
  comments,
  tags,
  milestones,
} from "@lib/mock-data";

const imagesHome = [
  "/assets/homeImages/chill.jpg",
  "/assets/homeImages/bike-riding.jpg",
  "/assets/homeImages/jkuat-hackathon.jpg",
];

export const homePageImages = () => imagesHome;
export const getAllBlogsContentInfo = () => blogContent;
export const getAllTopicsGeneralInfo = () => blogTopics;
export const getAllBlogsGeneralInfo = () => blogs;
export const getAllFeaturedBlogs = () => featuredBlog;
export const getAllDrafts = () => drafts;
export const getAllComments = () => comments;
export const getAllTags = () => tags;
export const getAllMilestones = () => milestones;

export const getCommentsById = (id: string) =>
  getAllComments().filter((c) => c.id === id);

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

export const getTopicMatchingPage = (page: string) => {
  return getAllTopicsGeneralInfo().find(
    (t) =>
      getLinkFromTopic(t.title) ===
      page
        .split("-")
        .map((char) => (char === "%26" ? "&" : char))
        .join("-")
  );
};

export const getBlogForCurrentPage = (page: string) =>
  getAllBlogsContentInfo().find((b) => b.id === page)?.blog;

export const getFeaturedBlogByTopic = (topic: string) => {
  const targetBlogId = getAllFeaturedBlogs().find((f) => f.topic === topic)?.id;
  return filterBlogsBy("id", targetBlogId || [])[0];
};

export const getBlogContentById = (blogId: string) =>
  getAllBlogsContentInfo().filter((b) => b.id === blogId)[0].blog;

export const getMilestonesByTopic = (topic: string) =>
  getAllMilestones().find((m) => {
    if (m.topic === topic) return m.milestones;
  });

export const filterBlogsBy = (
  type: string,
  filter: string | number | string[]
) => {
  switch (type) {
    case "id":
      return blogs.filter((blog) => blog.id === filter);
    case "image":
      return blogs.filter((blog) => blog.image === filter);
    case "topic":
      return blogs.filter((blog) => blog.topic === filter);
    case "title":
      return blogs.filter((blog) => blog.title === filter);
    case "subtitle":
      return blogs.filter((blog) => blog.subtitle === filter);
    case "dateCreated":
      return blogs.filter((blog) => blog.dateCreated === filter);
    case "tags":
      return blogs.filter((blog) =>
        blog.tags.includes(typeof filter === "string" ? filter : "")
      );
    case "minsRead":
      return blogs.filter((blog) => blog.minsRead === filter);
    case "likes":
      return blogs.filter((blog) => blog.likes === filter);
    case "comments":
      return blogs.filter((blog) => blog.comments === filter);
    case "views":
      return blogs.filter((blog) => blog.views === filter);
    default:
      return blogs;
  }
};
