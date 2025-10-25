import Image from "next/image";
import { getFeaturedBlogByTopic } from "@utils/FrontEndHooks/DataProcessing";

export default function FeaturedBlog({ topic }: { topic: string }) {
  const featuredBlog = getFeaturedBlogByTopic(topic);

  if (!featuredBlog) {
    return <div>Blog not found for topic: {topic}</div>;
  }

  return (
    <div className="grid grid-rows-[30px_1fr] gap-[20px] p-[40px] w-full h-[400px] mt-[calc(100vh-270px)] bg-(--primary-blue)/80 z-1">
      <div className="flex items-center text-white">Featured Blog</div>
      <div className="flex gap-[30px]">
        <div className="relative w-[50%]">
          <Image
            src={`${featuredBlog.image}`}
            alt="Bike Riding"
            fill
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col justify-between h-full w-[50%] text-white">
          <div className="grid h-fit">
            <div className="flex gap-1 items-center detail-text">
              <div className="">{featuredBlog.dateCreated}</div>
              <div className="w-0.5 h-0.5 rounded rounded-0.5 bg-white"></div>
              <div className="">{featuredBlog.minsRead} min read</div>
            </div>
            <div className="blog-title">{featuredBlog.title}</div>
            <div className="blog-font">{featuredBlog.subtitle}</div>
          </div>
          <div className="flex gap-1 detail-text border-t border-t-white pt-[10px] h-fit">
            <div className="">{featuredBlog.views} views</div>
            <div className="">{featuredBlog.comments} comments</div>
            <div className="">{featuredBlog.likes} likes</div>
          </div>
        </div>
      </div>
    </div>
  );
}
