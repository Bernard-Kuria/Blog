"use client";

import Image from "next/legacy/image";
import { usePathname } from "next/navigation";

import FeaturedBlog from "@c/FeaturedBlog";
import BlogsList from "@c/BlogsList";
import Milestones from "@c/Milestones";
import BlogTopics from "@components/Blogs";

import { blogTopics } from "@l/data";

export default function LifeOnWheels() {
  const location = usePathname();

  const targetImage = blogTopics.find((topic) => {
    if (topic.title.split(" ").join("-").toLowerCase() === location.slice(1))
      return topic.image;
  });

  return (
    <div className="relative flex flex-col gap-[20px] w-full">
      <div className="absolute w-full h-[calc(100vh-70px)]">
        <Image
          src={`/assets/blogTopicImg/${targetImage?.image}`}
          alt="Bike Riding"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="grid justify-center">
        <div className="grid gap-[20px] w-[1035px]">
          <FeaturedBlog />
          <BlogsList />
        </div>
      </div>
      <Milestones />

      <div className="grid justify-center">
        <BlogTopics />
      </div>
    </div>
  );
}
