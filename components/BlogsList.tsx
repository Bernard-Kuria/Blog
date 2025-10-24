"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome/dist";

type Blog = {
  id: string;
  image: string;
  topic: string;
  title: string;
  subtitle: string;
  dateCreated: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
};

type BlogProps = { blog: Blog };

export default function BlogsList({ blog }: BlogProps) {
  const location = usePathname();
  const { views, comments, likes, id } = blog;
  return (
    <Link className="flex-1" href={`${location}/${id}`}>
      <div className="flex gap-[10px] border rounded-[10px] flex-1 p-5">
        <div className="flex-1 flex flex-col gap-[15px]">
          <div className="sub-title">{blog.title}</div>
          <div className="blog-font">{blog.subtitle}</div>
        </div>
        <div className="flex justify-between items-center w-56 h-[15px]">
          <div className="flex gap-[10px]">
            <FontAwesomeIcon icon={["far", "eye"]} className="w-[15px]" />{" "}
            {views}
          </div>
          <div className="flex gap-[10px]">
            <FontAwesomeIcon icon={["far", "comment"]} className="w-[15px]" />
            {comments}
          </div>
          <div className="flex gap-[10px]">
            <FontAwesomeIcon icon={["far", "heart"]} className="w-[15px]" />{" "}
            {likes}
          </div>
        </div>
      </div>
    </Link>
  );
}
