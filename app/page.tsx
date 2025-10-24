"use client";

import { usePathname } from "next/navigation";

import Blogs from "@components/Blogs";
import Hero from "@c/Hero";

import { blogTopics } from "@lib/mock-data";

export default function Home() {
  const location = usePathname();

  return (
    <div className="grid justify-center mt-[30px] gap-[100px]">
      <Hero />
      <div
        className={`w-[1035px] grid gap-[50px]${
          location === "/" ? "justify-center text-center" : "text-left"
        } text-(--secondary-blue)  section-title hover:border-(--primary-blue)`}
      >
        {location === "/" ? "Browse" : "Other"} Topics
        <div className="flex flex-wrap gap-[20px]">
          {blogTopics.map((b) => {
            const link = b.title.toLowerCase().split(" ").join("-");
            return (
              <Blogs
                key={b.id}
                type={b.title.toLocaleLowerCase().split("-").join("-")}
                link={link}
                imageUrl={b.image}
                topic={b.title}
                timeStamp={b.timeStamp}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
