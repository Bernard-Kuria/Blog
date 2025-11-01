"use client";
import { use, useEffect, useState } from "react";

import Image from "next/image";

import FeaturedBlog from "@c/FeaturedBlog";
import Milestones from "@c/Milestones";
import Blogs from "@c/Blogs";
import BlogCards from "@c/BlogCard";

import { getAllBlogs } from "@services/blogs";

import { getAllTopics } from "@services/topics";

import { getLinkFromTopic, getTopicMatchingPage } from "@utils/conversions";

import { BlogsType, BlogTopicsType, topic } from "@lib/types";

export default function Page({
  params,
}: {
  params: Promise<{ blogTopicPage: string }>;
}) {
  const { blogTopicPage } = use(params);
  const [targetBlogs, setTargetBlogs] = useState<BlogsType>([]);

  const [loaded, setLoaded] = useState(false);
  const [topicPage, setTopicPage] = useState<topic | undefined>(undefined);
  const [allTopics, setAllTopics] = useState<BlogTopicsType>([]);
  const page = blogTopicPage
    .split("-")
    .map((p) => (p === "%26" ? "&" : p))
    .join("-");

  useEffect(() => {
    getTopicMatchingPage(page).then(setTopicPage);
  }, []);

  useEffect(() => {
    getAllBlogs({ topic: topicPage?.title || "" })
      ?.then(setTargetBlogs)
      .finally(() => setLoaded(true));

    getAllTopics().then(setAllTopics);
  }, [topicPage]);

  if (!loaded) return <div>Loading Blogs</div>;

  return (
    <div className="relative flex flex-col gap-[20px] w-full">
      {/* Background Image */}
      <div className="absolute w-full h-[calc(100vh-70px)]">
        {topicPage?.image === "" ? (
          ""
        ) : (
          <Image
            src={`${topicPage?.image}`}
            alt={topicPage?.title || "Topic Image"}
            fill
            objectFit="cover"
            priority
          />
        )}
      </div>

      <div className="grid justify-center">
        <div className="grid gap-[20px] w-[1035px]">
          <FeaturedBlog topic={topicPage?.title || ""} />

          <div>
            <div className="sub-title">Recent Posts</div>
            <div className="grid grid-cols-3 gap-[20px]">
              <BlogCards location={page} targetBlogs={targetBlogs || []} />
            </div>
          </div>
        </div>
      </div>

      <Milestones topic={topicPage?.title} />

      <div className="page-layout">
        <strong>Explore More Topics:</strong>
        <div className="flex flex-wrap gap-[20px]">
          {allTopics.map((b) => {
            const link = getLinkFromTopic(b.title);
            return page !== link ? (
              <Blogs
                key={b.id}
                link={link}
                imageUrl={b.image}
                topic={b.title}
                timeStamp={b.timeStamp}
              />
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}
