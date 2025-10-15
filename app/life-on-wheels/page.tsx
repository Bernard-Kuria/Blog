import Image from "next/image";

import FeaturedBlog from "@c/FeaturedBlog";
import BlogsList from "@c/BlogsList";

export default function page() {
  return (
    <div className="relative grid grid-cols-1 gap-[20px] px-[165px] justify-center">
      <div className="absolute w-full h-[calc(100vh-70px)]">
        <Image
          src="/assets/Bike-riders.png"
          alt="Bike Riding"
          fill
          objectFit="cover"
        />
      </div>
      <FeaturedBlog />
      <BlogsList />
    </div>
  );
}
