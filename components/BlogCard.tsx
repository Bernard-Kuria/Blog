import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BlogsType } from "@lib/types";
import { getLinkFromTopic, getTopicFromLink } from "@utils/conversions";

export default function BlogCards({
  location,
  targetBlogs,
}: {
  location: string;
  targetBlogs: BlogsType;
}) {
  return targetBlogs.map((blog) => {
    const { image, title, views, likes, comments } = blog.blogMeta;

    return (
      <Link
        key={blog.id}
        href={`${getLinkFromTopic(getTopicFromLink(location))}/${blog.id}`}
      >
        <div className="border flex flex-col justify-between border-gray-400 h-fit">
          <div className="relative h-[250px]">
            {image ? <Image src={`${image}`} alt="" fill /> : ""}
          </div>
          <div className="grid gap-[10px] p-[20px]">
            <div className="h-[65px] overflow-hidden sub-title text-(--primary-blue)">
              {title}
            </div>
            <div className="flex justify-between border-t border-gray-600 detail-text pt-[10px]">
              <div>
                <FontAwesomeIcon className="icon-size" icon={["far", "eye"]} />
                {"  "}
                {views}
              </div>
              <div className="flex gap-[10px] items-center">
                <FontAwesomeIcon
                  className="icon-size"
                  icon={["far", "heart"]}
                />{" "}
                {likes}
              </div>
              <div className="flex gap-[10px] items-center">
                <FontAwesomeIcon
                  className="icon-size"
                  icon={["far", "message"]}
                />{" "}
                {comments}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  });
}
