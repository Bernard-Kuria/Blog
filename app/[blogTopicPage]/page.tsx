"use client";
import { use } from "react";

import Image from "next/image";

import FeaturedBlog from "@c/FeaturedBlog";
import Milestones from "@c/Milestones";
import Blogs from "@c/Blogs";
import BlogCards from "@c/BlogCard";

import {
  filterBlogsBy,
  getLinkFromTopic,
  getTopicMatchingPage,
  getAllTopicsGeneralInfo,
} from "@utils/FrontEndHooks/DataProcessing";

export default function Page({
  params,
}: {
  params: Promise<{ blogTopicPage: string }>;
}) {
  const { blogTopicPage } = use(params);
  const topic = getTopicMatchingPage(blogTopicPage);
  const targetBlogs = filterBlogsBy("topic", topic?.title || "");

  return (
    <div className="relative flex flex-col gap-[20px] w-full">
      {/* Background Image */}
      <div className="absolute w-full h-[calc(100vh-70px)]">
        <Image
          src={`${topic?.image}`}
          alt={topic?.title || "Topic Image"}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <div className="grid justify-center">
        <div className="grid gap-[20px] w-[1035px]">
          <FeaturedBlog topic={topic?.title || ""} />

          <div>
            <div className="sub-title">Recent Posts</div>
            <div className="grid grid-cols-3 gap-[20px]">
              <BlogCards location={blogTopicPage} targetBlogs={targetBlogs} />
            </div>
          </div>
        </div>
      </div>

      <Milestones topic={topic?.title} />

      <div className="page-layout">
        <strong>Explore More Topics:</strong>
        <div className="flex flex-wrap gap-[20px]">
          {getAllTopicsGeneralInfo().map((b) => {
            const link = getLinkFromTopic(b.title);
            return blogTopicPage !== link ? (
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
