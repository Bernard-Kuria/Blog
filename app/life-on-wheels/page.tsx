"use client";

import Image from "next/legacy/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FeaturedBlog from "@c/FeaturedBlog";
import Milestones from "@c/Milestones";
import BlogTopics from "@components/Blogs";

import { blogTopics, blogs } from "@l/data";
import type { blog, blogsType } from "@lib/types";

export default function LifeOnWheels() {
  const location = usePathname();

  const targetImage = blogTopics.find((topic) => {
    if (topic.title.split(" ").join("-").toLowerCase() === location.slice(1))
      return topic.image;
  });

  const targetBlogs = blogs.filter(
    (blog) =>
      blog.topic ===
      location
        .slice(1)
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
  );

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

          <div>
            <div className="sub-title">Recent Posts</div>
            <div className="grid grid-cols-3 gap-[20px]">
              <BlogCards targetBlogs={targetBlogs} />
            </div>
          </div>
        </div>
      </div>
      <Milestones />

      <div className="grid justify-center">
        <BlogTopics />
      </div>
    </div>
  );
}

function BlogCards({ targetBlogs }: { targetBlogs: blogsType }) {
  const location = usePathname();
  return targetBlogs.map((blog: blog) => (
    <Link key={blog.id} href={location + "/blog-page"}>
      <div className="border grid grid-rows-[70%_1fr] border-gray-400 h-[400px]">
        <div className="relative">
          <Image src={`/assets/blogImg/${blog.image}`} alt="" layout="fill" />
        </div>
        <div className="grid gap-[10px] p-[20px]">
          <div className="sub-title text-(--primary-blue)">{blog.title}</div>
          <div className="flex justify-between border-t border-gray-600 detail-text pt-[10px]">
            <div>{blog.views}</div>
            <div className="flex gap-[10px] items-center">
              <FontAwesomeIcon className="icon-size" icon={["far", "heart"]} />{" "}
              {blog.likes}
            </div>
            <div className="flex gap-[10px] items-center">
              <FontAwesomeIcon
                className="icon-size"
                icon={["far", "message"]}
              />{" "}
              {blog.comments}
            </div>
          </div>
        </div>
      </div>
    </Link>
  ));
}
