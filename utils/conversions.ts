import { BlogTopicsType } from "../lib/types";
import { getAllTopics } from "@services/topics";

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
