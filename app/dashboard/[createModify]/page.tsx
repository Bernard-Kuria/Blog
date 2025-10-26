"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

import Draftify from "@c/Draftify";
import SectionTitle from "@c/SectionTitle";

import {
  getBlogContentById,
  getAllTags,
} from "@utils/FrontEndHooks/DataProcessing";

export default function CreateModifyBlog({
  params,
}: {
  params: Promise<{ createModify: string }>;
}) {
  const { createModify } = use(params);

  // Manage the topics and tags
  const [topicList, setTopicList] = useState<string[]>([]);
  const [tagList, setTagList] = useState<string[]>([]);

  // Set selected Topics & Tags
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const topicSet: Set<string> = new Set();
    const tagsSet: Set<string> = new Set();

    Object.entries(getAllTags()).forEach(([topic, tagArray]) => {
      topicSet.add(topic);
      tagArray.forEach((tag) => {
        tagsSet.add(tag.tagName);
      });
    });

    // Update the state with the new data
    setTopicList(Array.from(topicSet));
    setTagList(Array.from(tagsSet));
  }, []);

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTag = e.target.value;
    // Update current tags only if tag is not included
    if (!selectedTags.includes(newTag)) {
      setSelectedTags((prevTags) => [...prevTags, newTag]);
    }
  };

  return (
    <div className="grid justify-center">
      <div className="page-layout flex flex-col gap-[30px]">
        <SectionTitle
          title={createModify === "new" ? "Create Blog" : "Modify Blog"}
        />
        <Link className="cursor-pointer w-fit" href={"../dashboard"}>
          &larr; Back
        </Link>
        <Draftify
          data={
            createModify === "new" ? [] : getBlogContentById(createModify) || []
          }
        />
        <div className="flex gap-[100px]">
          <div className="grid gap-[20px]">
            Select Topic
            <select
              className="border p-2"
              name="topics"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
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
        {createModify === "new" ? (
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
        ) : (
          <div className="flex justify-between">
            <button className="border p-2 text-(--primary-blue) border-(--primary-blue) hover:bg-(--primary-blue) hover:text-white cursor-pointer">
              Update Post
            </button>
            <button className="border p-2 text-(--secondary-blue) border-(--secondary-blue) hover:bg-(--secondary-blue) hover:text-white cursor-pointer">
              <Link href={"/dashboard"}>Undo update</Link>
            </button>
            <button className="border p-2 text-red-500 border-red-500 hover:bg-red-500 hover:text-white cursor-pointer">
              Delete This post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
