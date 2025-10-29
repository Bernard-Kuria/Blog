"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import SectionTitle from "@c/SectionTitle";
import BlogsList from "@c/BlogsList";
import DraftList from "@c/DraftList";
import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome/dist";
import {
  filterBlogsBy,
  filterDraftsByTopic,
  getAllTopics,
} from "@utils/FrontEndHooks/DataProcessing";
import { BlogsType, BlogTopicsType, draftsType } from "@lib/types";

export default function Dashboard() {
  const [topics, setTopics] = useState<BlogTopicsType>();
  const [blogsByTopic, setBlogsByTopic] = useState<Record<string, BlogsType>>(
    {}
  );
  const [draftsByTopic, setDraftsByTopic] = useState<
    Record<string, draftsType>
  >({});

  useEffect(() => {
    async function fetchBlogsAndDrafts() {
      const blogsMap: Record<string, BlogsType> = {};
      const draftsMap: Record<string, draftsType> = {};

      const allTopics = await getAllTopics();
      setTopics(allTopics);

      if (allTopics) {
        for (const topic of allTopics) {
          const blogs = await filterBlogsBy("topic", topic.title);
          const drafts = await filterDraftsByTopic(topic.title);

          // Load the blogsMap and draftsMap in {topic: draft/blog}
          blogsMap[topic.title] = blogs;
          draftsMap[topic.title] = drafts;
        }
      }

      setBlogsByTopic(blogsMap);
      setDraftsByTopic(draftsMap);
    }

    fetchBlogsAndDrafts();
  }, []); // only run once when topics change

  return (
    <div className="grid justify-center">
      <div className="page-layout flex flex-col gap-[30px]">
        <div className="flex gap-[50px] items-center">
          <SectionTitle title="My Blogs" />
          <button className="button">
            <Link href={"/dashboard/new"}>create new blog</Link>
          </button>
        </div>

        {/* BLOGS */}
        {!topics ? (
          <div>Loading topics</div>
        ) : (
          topics.map((topic) => (
            <div key={topic.id}>
              <div className="sub-title">{topic.title}</div>

              <div className="grid gap-[20px]">
                {(blogsByTopic[topic.title] || []).map((blog) => (
                  <div
                    key={blog.id}
                    className="w-full flex justify-between gap-[10px] items-center"
                  >
                    <BlogsList blog={blog} />
                    <FontAwesomeIcon
                      icon={["fas", "trash"]}
                      className="hover:text-red-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        <hr className="border-gray-500" />

        {/* DRAFTS */}
        <div className="sub-title">Drafts</div>
        {!topics ? (
          <div>Loading topics</div>
        ) : (
          topics.map((topic) => (
            <div key={topic.id}>
              <div className="sub-title">{topic.title}</div>

              <div className="grid gap-[20px]">
                {(draftsByTopic[topic.title] || []).map((blog) => (
                  <div
                    key={blog.id}
                    className="w-full flex justify-between gap-[10px] items-center"
                  >
                    <DraftList blog={blog} />
                    <FontAwesomeIcon
                      icon={["fas", "trash"]}
                      className="hover:text-red-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
