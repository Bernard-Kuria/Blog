"use client";

import { usePathname } from "next/navigation";

import BlogReading from "@components/BlogReading";
import Comments from "@c/Comments";
import Blogs from "@components/Blogs";
import Link from "next/link";

export default function BlogPage() {
  const location = usePathname();

  // Split the pathname string into an array by the '/' delimiter
  const pathSegments = location.split("/");

  // The last segment of the path is often an empty string due to the leading slash.
  // The filter(Boolean) call removes this and any other empty strings from the array.
  const filteredSegments = pathSegments.filter(Boolean);

  // Remove the last item from the array of path segments
  filteredSegments.pop();

  // Join the array back into a string with '/' delimiters
  const parentPath = "/" + filteredSegments.join("/");

  return (
    <div className="page-layout grid gap-[30px]">
      <Link className="cursor-pointer w-fit" href={`${parentPath}`}>
        &larr; Back
      </Link>
      <BlogReading />
      <Comments />
      <Blogs />
    </div>
  );
}
