"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { draft } from "@lib/types";

export default function BlogsList({ blog }: { blog: draft }) {
  const location = usePathname();

  return (
    <div className="h-[200px] flex gap-[10px] border rounded-[10px] flex-1 p-5">
      <Link className="flex-1" href={`${location}/${blog.id}`}>
        <div className="flex-1 flex flex-col gap-[15px]">
          <div className="sub-title">{blog.title}</div>
          <div className="flex-1 blog-font">{blog.subtitle}</div>
        </div>
      </Link>
    </div>
  );
}
