"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OutputBlock from "./DraftifyProComponents/OutputBlock";

import { getBlogContentById } from "@s/blogContent";
import { getBlogMetaById } from "@s/blogs";
import { blogContent, Blog } from "@lib/types";

export default function BlogArea({ blogId }: { blogId: string }) {
  const [blog, setBlog] = useState<Blog>();
  const [blogContent, setBlogContent] = useState<blogContent>();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const [blog, content] = await Promise.all([
          getBlogMetaById(blogId),
          getBlogContentById(blogId),
        ]);

        if (mounted) {
          setBlog(blog);
          setBlogContent(content);
        }
      } catch (err) {
        console.error("Failed to load blog data:", err);
      } finally {
        if (mounted) setIsloading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [blogId]);

  if (isLoading) return <div>Loading Blog...</div>;

  return (
    <div className="flex flex-col gap-[20px] min-h-[1170px] h-fit p-[100px] bg-white dark:bg-black blog-text">
      <div className="flex detail-text">
        <div className="flex-1 flex gap-[10px]">
          <div>{blog?.blogMeta.dateCreated}</div>
          <div>{blog?.blogMeta.minsRead} min read</div>
        </div>
        <div className="flex gap-[10px] items-center cursor-pointer">
          <FontAwesomeIcon
            className="icon-size"
            icon={["fas", "share-nodes"]}
          />
          <FontAwesomeIcon className="icon-size" icon={["fas", "download"]} />
        </div>
      </div>

      {blogContent ? (
        <OutputBlock blocksData={blogContent.blogContent} />
      ) : (
        <div>No blog data</div>
      )}

      <div className="flex detail-text">
        <div className="flex gap-[30px]">
          <div>
            <strong>{blog?.blogMeta.views}</strong> views
          </div>
          <div>
            <strong>{blog?.blogMeta.comments}</strong> comments
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="flex gap-[10px] items-center">
          <strong>{blog?.blogMeta.likes}</strong>
          <FontAwesomeIcon className="icon-size" icon={["far", "heart"]} />
        </div>
      </div>
    </div>
  );
}
