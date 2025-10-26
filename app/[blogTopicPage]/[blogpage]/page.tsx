"use client";
import { use } from "react";

import { useRouter, useParams } from "next/navigation";

import BlogReading from "@c/BlogReading";
import Comments from "@c/Comments";
import Blogs from "@c/Blogs";

import {
  getAllBlogs,
  getTopicFromLink,
} from "@utils/FrontEndHooks/DataProcessing";

export default function Page({
  params,
}: {
  params: Promise<{ blogpage: string }>;
}) {
  const router = useRouter();
  const param = useParams(); // { topic: "projects-and-tech", blogpage: " SETdfhzfgbhxdfgvvx" }

  const { blogpage } = use(params);

  const topic = getTopicFromLink(param.blogTopicPage?.toString() || "");
  const backLink = param.blogTopicPage;

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
        {getAllBlogs().map((b) => {
          const link = backLink + "/" + b.id;
          return b.blogMeta.topic === topic && b.id !== blogpage ? (
            <Blogs
              key={b.id}
              link={link}
              imageUrl={b.blogMeta.image}
              topic={b.blogMeta.title}
              timeStamp={b.blogMeta.dateCreated}
            />
          ) : null;
        })}
      </div>
    </div>
  );
}
