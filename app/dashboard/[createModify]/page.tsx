"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import Draftify from "@c/Draftify";
import { tags, blogContent } from "@lib/mock-data";
import SectionTitle from "@components/SectionTitle";

export default function CreateModifyBlog({
  params,
}: {
  params: Promise<{ createModify: string }>;
}) {
  const { createModify } = use(params);

  // Use state to manage the topic and tag lists
  const [topicList, setTopicList] = useState<string[]>([]);
  const [tagList, setTagList] = useState<string[]>([]);

  // Use a state for the selected topic and tags
  const [topic, setTopic] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    // This effect runs only once after the component mounts
    const topicSet: Set<string> = new Set();
    const tagsArray: string[] = [];

    Object.entries(tags).forEach(([topic, tagArray]) => {
      topicSet.add(topic);
      tagArray.forEach((tag) => {
        tagsArray.push(tag.tagName);
      });
    });

    // Update the state with the new data
    setTopicList(Array.from(topicSet));
    setTagList(tagsArray);
  }, []); // The empty dependency array ensures it runs only once

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTag = e.target.value;
    if (!selectedTags.includes(newTag)) {
      // Use the functional update to get the latest state
      setSelectedTags((prevTags) => [...prevTags, newTag]);
    }
  };

  const data = blogContent.find((b) => b.id === createModify)?.blog;

  return (
    <div className="grid justify-center">
      <div className="page-layout flex flex-col gap-[30px]">
        <SectionTitle
          title={createModify === "new" ? "Create Blog" : "Modify Blog"}
        />
        <Link className="cursor-pointer w-fit" href={"../dashboard"}>
          &larr; Back
        </Link>
        <Draftify data={createModify === "new" ? [] : data} />
        <div className="flex gap-[100px]">
          <div className="grid gap-[20px]">
            Select Topic
            <select
              className="border p-2"
              name="topics"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option value="" disabled>
                Select a topic
              </option>
              {topicList.map((t, idx) => (
                <option key={idx} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-[20px]">
            Select Tag
            <div className="flex gap-[5px] border p-1">
              {selectedTags.map((tag) => (
                <div
                  key={tag}
                  className="p-1 rounded-[10px] bg-[linear-gradient(45deg,var(--primary-blue)_0%,var(--background))]"
                >
                  {tag}
                </div>
              ))}
              <select name="tags" value="" onChange={handleTagChange}>
                <option value="" disabled>
                  Select a tag
                </option>
                {tagList.map(
                  (tag, idx) =>
                    !selectedTags.includes(tag) && (
                      <option key={idx} value={tag}>
                        {tag}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button className="border p-2 text-(--primary-blue) border-(--primary-blue) hover:bg-(--primary-blue) hover:text-white cursor-pointer">
            Add New Post
          </button>
          <button className="border p-2 text-(--secondary-blue) border-(--secondary-blue) hover:bg-(--secondary-blue) hover:text-white cursor-pointer">
            Save as Draft
          </button>
          <button className="border p-2 text-red-500 border-red-500 hover:bg-red-500 hover:text-white cursor-pointer">
            Delete Draft
          </button>
        </div>
      </div>
    </div>
  );
}
