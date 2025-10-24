"use client";
import { use } from "react";

import Image from "next/legacy/image";

import FeaturedBlog from "@c/FeaturedBlog";
import Milestones from "@c/Milestones";
import Blogs from "@c/Blogs";
import BlogCards from "@c/BlogCard";

import { blogTopics, blogs } from "@lib/mock-data";

export default function Page({
  params,
}: {
  params: Promise<{ blogTopicPage: string }>;
}) {
  const { blogTopicPage } = use(params);

  // Find the matching topic by blogTopicPage
  const topic = blogTopics.find(
    (t) =>
      t.title.split(" ").join("-").toLowerCase() ===
      blogTopicPage
        .split("-")
        .map((char) => (char === "%26" ? "&" : char))
        .join("-")
  );

  // Filter all blogs that belong to this topic
  const targetBlogs = blogs.filter((blog) => blog.topic === topic?.title);

  return (
    <div className="relative flex flex-col gap-[20px] w-full">
      {/* Background Image */}
      <div className="absolute w-full h-[calc(100vh-70px)]">
        <Image
          src={`/assets/blogTopicImg/${topic?.image}`}
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

      <div className="page-layout flex flex-wrap gap-[20px]">
        {blogTopics.map((b) => {
          const link = b.title.toLocaleLowerCase().split(" ").join("-");
          return blogTopicPage !== link ? (
            <Blogs
              key={b.id}
              type={"topic"}
              link={link}
              imageUrl={b.image}
              topic={b.title}
              timeStamp={b.timeStamp}
            />
          ) : null;
        })}
      </div>
    </div>
  );
}
