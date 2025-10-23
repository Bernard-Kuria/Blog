"use client";

import Draftify from "@c/Draftify";
import { useState } from "react";
import Link from "next/link";

import { tags, blogTopics } from "@l/data";

export default function CreateModifyBlog() {
  const [topic, setTopic] = useState<string>("");
  const [tagSetter, setTagSetter] = useState<string[]>([""]);

  const topicList: string[] = [];
  const tagList: string[] = [];

  blogTopics.map((topic) => {
    topicList.push(topic.title);
  });

  tags.map((tag) => {
    tagList.push(tag.tagName);
  });

  return (
    <div className="grid justify-center">
      <div className="page-layout flex flex-col gap-[30px]">
        <div className="values text-(--primary-blue)">Create Blog</div>
        <Link className="cursor-pointer w-fit" href={"../life-on-wheels"}>
          &larr; Back
        </Link>
        <Draftify />
        <div className="flex gap-[100px]">
          <div className="grid gap-[20px]">
            Select Topic
            <select
              className="border p-2"
              name="topics"
              onChange={(e) => setTopic(e.target.value)}
            >
              {topicList.map((topic: string, idx: number) => (
                <option key={idx} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-[20px]">
            Select Tag
            <div className="flex gap-[5px] border p-1">
              {tagSetter.map(
                (tag) =>
                  tag !== "" && (
                    <div
                      key={tag}
                      className="p-1 rounded-[10px] bg-[linear-gradient(45deg,var(--primary-blue)_0%,var(--background))]"
                    >
                      {tag}
                    </div>
                  )
              )}
              <select
                name="tags"
                onChange={(e) => {
                  const newTag = e.target.value;
                  setTagSetter((prev) => {
                    const prevTags = prev;
                    return [...prevTags, newTag];
                  });
                }}
              >
                {tagList.map(
                  (tag: string) =>
                    tagSetter.includes(tag) === false && (
                      <option key={tag} value={tag}>
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
