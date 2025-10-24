"use client";
import { use } from "react";

import { useRouter, useParams } from "next/navigation";

import BlogReading from "@c/BlogReading";
import Comments from "@c/Comments";
import Blogs from "@c/Blogs";

import { blogs } from "@lib/mock-data";

export default function Page({
  params,
}: {
  params: Promise<{ blogpage: string }>;
}) {
  const router = useRouter();
  const param = useParams(); // { topic: "projects-and-tech", blogpage: "self-balancing-robot" }

  const { blogpage } = use(params);

  const topicLowecase = param.blogTopicPage
    ?.toString()
    .split("-")
    .map((p) => (p === "%26" ? "&" : p));

  const backLink = topicLowecase?.join("-");

  const topic = topicLowecase
    ?.map((t) => t.charAt(0).toUpperCase() + t.slice(1))
    ?.join(" ");

  return (
    <div className="page-layout grid gap-[30px]">
      <button
        className="cursor-pointer w-fit"
        onClick={() => router.push(`/${backLink}`)}
      >
        &larr; Back
      </button>
      <BlogReading blogId={blogpage} />
      <Comments blogId={blogpage} />
      <strong>More on this topic:</strong>
      <div className="page-layout flex flex-wrap gap-[20px]">
        {blogs.map((b) => {
          const link = backLink + "/" + b.id;
          return b.topic === topic ? (
            <Blogs
              key={b.id}
              type={"blog"}
              link={link}
              imageUrl={b.image}
              topic={b.title}
              timeStamp={b.dateCreated}
            />
          ) : null;
        })}
      </div>
    </div>
  );
}
