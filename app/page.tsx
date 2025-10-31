"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Blogs from "@components/Blogs";
import Hero from "@components/Hero";

import {
  getAllTopics,
  getLinkFromTopic,
} from "@utils/FrontEndHooks/DataProcessing";
import { BlogTopicsType } from "@lib/types";

export default function Home() {
  const location = usePathname();
  const [topics, setTopics] = useState<BlogTopicsType>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const data: BlogTopicsType = await getAllTopics();
        setTopics(data);
      } catch (err) {
        console.error("Failed to fetch topics:", err);
        setError("Failed to load topics");
      } finally {
        setLoading(false);
      }
    }
    fetchTopics();
  }, []);

  return (
    <div className="grid justify-center mt-[30px] gap-[100px]">
      <Hero />
      <div
        className={`w-[1035px] grid gap-[50px] ${
          location === "/" ? "justify-center text-center" : "text-left"
        } text-(--secondary-blue) section-title hover:border-(--primary-blue)`}
      >
        {location === "/" ? "Browse" : "Other"} Topics
        <div className="flex flex-wrap gap-[20px]">
          {loading ? (
            <p>Loading topics...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            topics.map((b) => {
              const link = getLinkFromTopic(b.title);
              return (
                <Blogs
                  key={b.id}
                  link={link}
                  imageUrl={b.image}
                  topic={b.title}
                  timeStamp={b.timeStamp}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
