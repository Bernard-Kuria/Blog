"use client";

import { useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type BlogProps = {
  type: string;
  link: string;
  imageUrl: string;
  topic: string;
  timeStamp: string;
};

export default function Blogs({
  type = "topic",
  link,
  imageUrl,
  topic,
  timeStamp,
}: BlogProps) {
  const location = usePathname();
  const [hovered, setHovered] = useState(false);

  return (
    <div className="">
      <div className="flex flex-wrap gap-[20px]">
        <Link
          href={`/${link}`}
          className={`${
            (location ?? "").substring(1).includes(link) ? "hidden" : ""
          }`}
        >
          <div
            className={`${
              location === "/" ? "w-[500px] h-[370px]" : "w-[400px] h-[250px]"
            } border border-(--border-color) p-[5px] overflow-hidden`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div
              className={`relative w-full ${
                location === "/" ? "h-[250px]" : "h-full"
              } overflow-hidden`}
            >
              <Image
                src={`/assets/${
                  type === "topic"
                    ? "blogTopicImg"
                    : location === "/"
                    ? "blogTopicImg"
                    : "blogImg"
                }/${imageUrl}`}
                alt="image"
                layout="fill"
                className="object-cover"
              />
            </div>
            <div
              className={`duration-300 ${
                location === "/"
                  ? "grid h-[108px]"
                  : location !== "/" && hovered === true
                  ? "opacity-100 -translate-y-[108px] h-[108px]"
                  : "opacity-0 h-[0px]"
              } gap-[20px] p-2 w-full bg-white text-black text-left`}
            >
              <div className="text-[20px] font-semibold">{topic}</div>
              <div className="text-[12px]">{timeStamp}</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
