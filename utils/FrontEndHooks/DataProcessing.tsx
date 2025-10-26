import {
  blogContent,
  blogTopics,
  blogs,
  featuredBlogs,
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
export const getAllBlogsContent = () => blogContent;
export const getAllTopics = () => blogTopics;
export const getAllBlogs = () => blogs;
export const getAllFeaturedBlogs = () => featuredBlogs;
export const getAllDrafts = () => drafts;
export const getAllComments = () => comments;
export const getAllTags = () => tags;
export const getAllMilestones = () => milestones;

export const getCommentsById = (id: string) =>
  getAllComments().filter((c) => c.id === id);

// const blogsDBFormat = getAllBlogs().map((bl) => {
//   const { id, ...metadata } = bl;
//   const { blog } = getAllBlogsContent().filter((b) => b.id === bl.id)[0];
//   return {
//     id: bl.id,
//     metadata: metadata,
//     blogContent: blog,
//   };
// });

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
  return getAllTopics().find(
    (t) =>
      getLinkFromTopic(t.title) ===
      page
        .split("-")
        .map((char) => (char === "%26" ? "&" : char))
        .join("-")
  );
};

export const getFeaturedBlogByTopic = (topic: string) => {
  const targetBlogId = getAllFeaturedBlogs().find((f) => f.topic === topic)?.id;
  return filterBlogsBy("id", targetBlogId || [])[0];
};

export const checkIsFeatured = (id: string) =>
  getAllFeaturedBlogs().some((f) => f.id === id);

export const getBlogContentById = (blogId: string) =>
  getAllBlogsContent().find((b) => b.id === blogId)?.blog;

export const getMilestonesByTopic = (topic: string) =>
  getAllMilestones().find((m) => m.topic === topic);

export const filterBlogsBy = (
  type: string,
  filter: string | number | string[]
) => {
  const allBlogs = getAllBlogs();
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

export const filterDraftsBy = (
  type: string,
  filter: string | number | string[]
) => {
  const allBlogs = getAllDrafts();
  switch (type) {
    case "id":
      return allBlogs.filter((blog) => blog.id === filter);
    case "image":
      return allBlogs.filter((blog) => blog.image === filter);
    case "topic":
      return allBlogs.filter((blog) => blog.topic === filter);
    case "title":
      return allBlogs.filter((blog) => blog.title === filter);
    case "dateCreated":
      return allBlogs.filter((blog) => blog.dateCreated === filter);
    case "tags":
      return allBlogs.filter((blog) =>
        blog.tags.includes(typeof filter === "string" ? filter : "")
      );
    default:
      return allBlogs;
  }
};
