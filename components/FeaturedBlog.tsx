import Image from "next/image";
import { featuredBlog, blogs } from "@lib/mock-data";

type featuredBlogProps = { topic: string };

export default function FeaturedBlog({ topic }: featuredBlogProps) {
  const getFeaturedBlog = (topic: string) => {
    const targetBlogId = featuredBlog.find((f) => f.topic === topic)?.id;
    return blogs.find((b) => b.id === targetBlogId);
  };

  const targetFeaturedBlog = getFeaturedBlog(topic);

  if (!targetFeaturedBlog) {
    return <div>Blog not found for topic: {topic}</div>;
  }

  return (
    <div className="grid grid-rows-[30px_1fr] gap-[20px] p-[40px] w-full h-[400px] mt-[calc(100vh-270px)] bg-(--primary-blue)/80 z-1">
      <div className="flex items-center text-white">Featured Blog</div>
      <div className="flex gap-[30px]">
        <div className="relative w-[50%]">
          <Image
            src="/assets/blogImg/bike-riding.jpg"
            alt="Bike Riding"
            fill
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col justify-between h-full w-[50%] text-white">
          <div className="grid h-fit">
            <div className="flex gap-1 items-center detail-text">
              <div className="">{targetFeaturedBlog.dateCreated}</div>
              <div className="w-0.5 h-0.5 rounded rounded-0.5 bg-white"></div>
              <div className="">{targetFeaturedBlog.minsRead} min read</div>
            </div>
            <div className="blog-title">{targetFeaturedBlog.title}</div>
            <div className="blog-font">{targetFeaturedBlog.subtitle}</div>
          </div>
          <div className="flex gap-1 detail-text border-t border-t-white pt-[10px] h-fit">
            <div className="">{targetFeaturedBlog.views} views</div>
            <div className="">{targetFeaturedBlog.comments} comments</div>
            <div className="">{targetFeaturedBlog.likes} likes</div>
          </div>
        </div>
      </div>
    </div>
  );
}
