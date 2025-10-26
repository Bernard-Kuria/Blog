"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome/dist";

import { Blog } from "@lib/types";
import { checkIsFeatured } from "@utils/FrontEndHooks/DataProcessing";

export default function BlogsList({ blog }: { blog: Blog }) {
  const location = usePathname();
  const { id } = blog;
  const { title, subtitle, views, comments, likes } = blog.blogMeta;

  return (
    <div className="h-[200px] flex gap-[10px] border rounded-[10px] flex-1 p-5">
      <Link className="flex-1" href={`${location}/${id}`}>
        <div className="flex-1 flex flex-col gap-[15px]">
          <div className="sub-title">{title}</div>
          <div className="flex-1 blog-font">{subtitle}</div>
        </div>
      </Link>
      <div className="bg-(--foreground)/30 rounded-2xl p-5 flex flex-col justify-between">
        <div className="flex justify-between items-center w-56 h-[15px] detail-text">
          <div className="flex items-center gap-[10px]">
            <FontAwesomeIcon icon={["far", "eye"]} className="w-[15px]" />{" "}
            {views}
          </div>
          <div className="flex items-center gap-[10px]">
            <FontAwesomeIcon icon={["far", "comment"]} className="w-[15px]" />
            {comments}
          </div>
          <div className="flex items-center gap-[10px]">
            <FontAwesomeIcon icon={["far", "heart"]} className="w-[15px]" />{" "}
            {likes}
          </div>
        </div>
        <button
          className={`${checkIsFeatured(id) ? "buttonInverted" : "button"}`}
        >
          {checkIsFeatured(id) ? "Featured" : "Set as Featured"}
        </button>
      </div>
    </div>
  );
}
