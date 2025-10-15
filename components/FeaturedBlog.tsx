import Image from "next/image";

export default function FeaturedBlog() {
  return (
    <div className="grid grid-rows-[30px_1fr] gap-[20px] p-[40px] w-full h-[400px] mt-[calc(100vh-270px)] bg-(--primary-blue)/80 z-1">
      <div className="flex items-center text-white">Featured Blog</div>
      <div className="flex gap-[30px]">
        <div className="relative w-[50%]">
          <Image
            src="/bike-riding.jpg"
            alt="Bike Riding"
            fill
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col justify-between h-full w-[50%] text-white">
          <div className="grid h-fit">
            <div className="flex gap-1 items-center detail-text">
              <div className="">Mar 22, 2023</div>
              <div className="w-0.5 h-0.5 rounded rounded-0.5 bg-white"></div>
              <div className="">2 min read</div>
            </div>
            <div className="blog-title">Top Hikes in Nyeri</div>
            <div className="blog-font">
              Create a blog post subtitle that summarizes your post in a few
              short, punchy sentences and entices your audience to continue
              reading....
            </div>
          </div>
          <div className="flex gap-1 detail-text border-t border-t-white pt-[10px] h-fit">
            <div className="">12 views</div>
            <div className="">4 comments</div>
          </div>
        </div>
      </div>
    </div>
  );
}
