import Image from "next/legacy/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { blogs, blogContent } from "@lib/mock-data";
import OutputBlock from "./DraftifyProComponents/OutputBlock";

export default function BlogArea({ blogId }: { blogId: string }) {
  const blog = blogs.filter((b) => b.id === blogId)[0];
  const content = blogContent.filter((b) => b.id === blogId)[0].blog;

  return (
    <div className="flex flex-col gap-[20px] min-h-[1170px] h-fit p-[100px] bg-white dark:bg-black blog-text">
      <div className="flex detail-text">
        <div className="flex-1 flex gap-[10px]">
          <div>{blog.dateCreated}</div>
          <div className="w-[0.5px] h-[0.5px] rounded-[0.5px]"></div>
          <div>{blog.minsRead} min read</div>
        </div>
        <div className="flex gap-[10px] items-center cursor-pointer">
          <FontAwesomeIcon
            className="icon-size"
            icon={["fas", "share-nodes"]}
          />
          <FontAwesomeIcon className="icon-size" icon={["fas", "download"]} />
        </div>
      </div>

      <OutputBlock blocksData={content} />

      <div className="flex detail-text">
        <div className="flex gap-[30px]">
          <div>
            <strong>{blog.views}</strong> views
          </div>
          <div>
            <strong>{blog.comments}</strong> comments
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="flex gap-[10px] items-center">
          <strong>{blog.likes}</strong>{" "}
          <FontAwesomeIcon className="icon-size" icon={["far", "heart"]} />
        </div>
      </div>
    </div>
  );
}
