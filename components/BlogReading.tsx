import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import OutputBlock from "./DraftifyProComponents/OutputBlock";

import {
  filterBlogsBy,
  getBlogContentById,
} from "@utils/FrontEndHooks/DataProcessing";

export default function BlogArea({ blogId }: { blogId: string }) {
  const blog = filterBlogsBy("id", blogId)[0];

  return (
    <div className="flex flex-col gap-[20px] min-h-[1170px] h-fit p-[100px] bg-white dark:bg-black blog-text">
      <div className="flex detail-text">
        <div className="flex-1 flex gap-[10px]">
          <div>{blog.blogMeta.dateCreated}</div>
          <div className="w-[0.5px] h-[0.5px] rounded-[0.5px]"></div>
          <div>{blog.blogMeta.minsRead} min read</div>
        </div>
        <div className="flex gap-[10px] items-center cursor-pointer">
          <FontAwesomeIcon
            className="icon-size"
            icon={["fas", "share-nodes"]}
          />
          <FontAwesomeIcon className="icon-size" icon={["fas", "download"]} />
        </div>
      </div>

      <OutputBlock blocksData={getBlogContentById(blogId)} />

      <div className="flex detail-text">
        <div className="flex gap-[30px]">
          <div>
            <strong>{blog.blogMeta.views}</strong> views
          </div>
          <div>
            <strong>{blog.blogMeta.comments}</strong> comments
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="flex gap-[10px] items-center">
          <strong>{blog.blogMeta.likes}</strong>{" "}
          <FontAwesomeIcon className="icon-size" icon={["far", "heart"]} />
        </div>
      </div>
    </div>
  );
}
