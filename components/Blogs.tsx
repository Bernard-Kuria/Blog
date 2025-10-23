"use client";

import Image from "next/legacy/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { blogTopics } from "@lib/mock-data";

export default function Blogs() {
  const location = usePathname();

  return (
    <div
      className={`w-[1035px] grid gap-[50px]${
        location === "/" ? "justify-center text-center" : "text-left"
      } text-(--secondary-blue)  section-title hover:border-(--primary-blue)`}
    >
      {location === "/" ? "Browse" : "Other"} Topics
      <div className="flex flex-wrap gap-[20px]">
        {blogTopics.map((topic, key) => {
          const link = topic.title.split(" ").join("-").toLowerCase();
          return (
            <Link
              key={key}
              href={`/${link}`}
              className={`${
                (location ?? "").substring(1).includes(link) ? "hidden" : ""
              }`}
            >
              <div
                className={`${
                  location === "/"
                    ? "w-[500px] h-[370px]"
                    : "w-[400px] h-[250px]"
                } border border-(--border-color) p-[5px]`}
              >
                <div
                  className={`relative w-full ${
                    location === "/" ? "h-[250px]" : "h-full"
                  } overflow-hidden`}
                >
                  <Image
                    src={`/assets/blogTopicImg/${topic.image}`}
                    alt="topic image"
                    layout="fill"
                    className="object-cover"
                  />
                </div>
                <div
                  className={`${
                    location === "/" ? "grid" : "hidden"
                  } gap-[20px] p-2 w-full h-[108px] bg-white text-black text-left`}
                >
                  <div className="text-[20px] font-semibold">{topic.title}</div>
                  <div className="text-[12px]">{topic.timeStamp}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
