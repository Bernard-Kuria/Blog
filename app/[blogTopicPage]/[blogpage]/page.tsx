"use client";
import { use, useEffect, useState } from "react";

import { useRouter, useParams } from "next/navigation";

import BlogReading from "@c/BlogReading";
import Comments from "@c/Comments";
import Blogs from "@c/Blogs";

import { getAllBlogs } from "@services/blogs";

import { getTopicFromLink } from "@utils/conversions";

import { BlogsType } from "@lib/types";

export default function Page({
  params,
}: {
  params: Promise<{ blogpage: string }>;
}) {
  const [blogs, setBlogs] = useState<BlogsType | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const param = useParams();

  const { blogpage } = use(params);

  const topic = getTopicFromLink(param.blogTopicPage?.toString() || "");
  const backLink = param.blogTopicPage;

  useEffect(() => {
    getAllBlogs()
      .then(setBlogs)
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded) return <div>Loading Blogs</div>;

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
        {blogs
          ? blogs.map((b) => {
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
            })
          : null}
      </div>
    </div>
  );
}
