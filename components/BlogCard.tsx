import Image from "next/legacy/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Blog = {
  id: string;
  image: string;
  topic: string;
  title: string;
  dateCreated: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
};

type BlogsType = Blog[];

export default function BlogCards({
  location,
  targetBlogs,
}: {
  location: string;
  targetBlogs: BlogsType;
}) {
  const link = location
    .split("-")
    .map((l) => (l === "%26" ? "&" : l))
    .join("-");
  return targetBlogs.map((blog) => (
    <Link key={blog.id} href={`${link}/${blog.id}`}>
      <div className="border flex flex-col justify-between border-gray-400 h-fit">
        <div className="relative h-[250px]">
          <Image src={`/assets/blogImg/${blog.image}`} alt="" layout="fill" />
        </div>
        <div className="grid gap-[10px] p-[20px]">
          <div className="h-[65px] overflow-hidden sub-title text-(--primary-blue)">
            {blog.title}
          </div>
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
