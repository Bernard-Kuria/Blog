"use client";

import Image from "next/image";

import { getFeaturedBlogs } from "@services/featuredBlogs";
import { getAllBlogs } from "@services/blogs";
import { getLinkFromTopic } from "@utils/conversions";
import Link from "@node_modules/next/link";
import { useEffect, useState } from "react";
import { Blog } from "@lib/types";

export default function FeaturedBlog({ topic }: { topic: string }) {
  console.log(topic);
  const [featuredBlog, setFeaturedBlog] = useState<Blog | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getFeaturedBlogs({ topic: topic })
      .then((e) => getAllBlogs({ id: e[0].id }).then(setFeaturedBlog))
      .finally(() => setLoaded(true));
  }, []);

  if (!featuredBlog) {
    return <div>Blog not found for topic: {topic}</div>;
  }

  if (!loaded) return <div>Loading Featured blog</div>;

  return (
    <Link
      href={`/${
        getLinkFromTopic(featuredBlog.blogMeta.topic) + "/" + featuredBlog.id
      }`}
      className="grid grid-rows-[30px_1fr] gap-[20px] p-[40px] w-full h-[400px] mt-[calc(100vh-270px)] bg-(--primary-blue)/80 z-1"
    >
      <div className="flex items-center text-white">Featured Blog</div>
      <div className="flex gap-[30px]">
        <div className="relative w-[50%]">
          {featuredBlog.blogMeta.image === "" ? (
            ""
          ) : (
            <Image
              src={`${featuredBlog.blogMeta.image}`}
              alt="Bike Riding"
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="flex flex-col justify-between h-full w-[50%] text-white">
          <div className="grid h-fit">
            <div className="flex gap-1 items-center detail-text">
              <div className="">{featuredBlog.blogMeta.dateCreated}</div>
              <div className="w-0.5 h-0.5 rounded rounded-0.5 bg-white"></div>
              <div className="">{featuredBlog.blogMeta.minsRead} min read</div>
            </div>
            <div className="blog-title">{featuredBlog.blogMeta.title}</div>
            <div className="blog-font">{featuredBlog.blogMeta.subtitle}</div>
          </div>
          <div className="flex gap-1 detail-text border-t border-t-white pt-[10px] h-fit">
            <div className="">{featuredBlog.blogMeta.views} views</div>
            <div className="">{featuredBlog.blogMeta.comments} comments</div>
            <div className="">{featuredBlog.blogMeta.likes} likes</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
