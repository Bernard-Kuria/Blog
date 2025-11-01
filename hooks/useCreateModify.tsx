"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { blogContent, content, tagsType } from "@lib/types";

import { getAllTags } from "@services/tags";
import { getBlogContentById } from "@services/blogContent";

export function useTagsAndTopics(id: string) {
  const [topicList, setTopicList] = useState<string[]>([]);
  const [tagList, setTagList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blogContent, setBlogContent] = useState<content | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) {
          setError("No blog ID provided");
          setLoading(false);
          return;
        }

        const allTags: tagsType = await Promise.resolve(getAllTags());
        const blogContent: blogContent =
          id === "new"
            ? { id: "", blogContent: {} }
            : await getBlogContentById(id);

        const blog = blogContent?.blogContent;

        if (!blog) {
          setError(`Blog with ID ${id} not found`);
          setBlogContent(null);
          return;
        }

        const topicSet = new Set<string>();
        const tagsSet = new Set<string>();

        allTags.map((tagGroup) => {
          topicSet.add(tagGroup.topic);
          tagGroup.tags.map((tag) => tagsSet.add(tag));
        });

        setTopicList(Array.from(topicSet));
        setTagList(Array.from(tagsSet));
        setBlogContent(
          blog ?? [
            {
              id: "",
              type: "",
              content: "",
              tableContent: null,
            },
          ]
        );
      } catch (err) {
        console.error(err);
        console.error(
          "Error fetching tags or blog:",
          err instanceof Error ? err.message : err
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return { topicList, tagList, loading, error, blogContent };
}

export const applyToggleStyles = (
  t: "light" | "dark",
  btn: HTMLLIElement | null,
  toggle: HTMLDivElement | null
) => {
  if (!btn || !toggle) return;
  if (t === "dark") {
    btn.style.borderColor = "#f4f5f0";
    btn.style.backgroundColor = "#232323";
    toggle.style.backgroundColor = "#f4f5f0";
    toggle.style.transform = "translateX(15px)";
  } else {
    btn.style.borderColor = "#232323";
    btn.style.backgroundColor = "#f4f5f0";
    toggle.style.backgroundColor = "#232323";
    toggle.style.transform = "translateX(1px)";
  }
};

export const handleTagChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  selectedTags: string[],
  setSelectedTags: Dispatch<SetStateAction<string[]>>
) => {
  const newTag = e.target.value;
  if (!selectedTags.includes(newTag)) {
    setSelectedTags((prevTags) => [...prevTags, newTag]);
  }
};
