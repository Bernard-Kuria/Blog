"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Login from "./Login";

import { applyToggleStyles } from "@hooks/useTheme";

import { getLinkFromTopic } from "@utils/conversions";
import { getAllTopics } from "@s/topics";
import { topic } from "@lib/types";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const themeModeBtn = useRef<HTMLLIElement | null>(null);
  const themeModeToggle = useRef<HTMLDivElement | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [topicNames, setTopicNames] = useState<string[]>([]);

  const location = usePathname();

  // mount: determine initial theme and set toggle position immediately
  useEffect(() => {
    if (!themeModeBtn.current || !themeModeToggle.current) return;

    const stored = localStorage.getItem("theme");
    let initial: "light" | "dark";

    if (stored === "dark" || stored === "light") {
      initial = stored;
    } else {
      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      initial = prefersDark ? "dark" : "light";
    }

    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    document.documentElement.classList.toggle("light", initial === "light");
    applyToggleStyles(initial, themeModeBtn.current, themeModeToggle.current);
  }, []);

  // whenever theme changes persist and update DOM + toggle styles
  useEffect(() => {
    if (!themeModeBtn.current || !themeModeToggle.current) return;
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
    applyToggleStyles(theme, themeModeBtn.current, themeModeToggle.current);
  }, [theme]);

  function handleThemeBtnClick() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    async function fetchTopics() {
      const topics = await getAllTopics();
      setTopicNames(topics.map((b: topic) => b.title));
    }
    fetchTopics();
  }, []);

  const topicLinks = topicNames.map((topic) => getLinkFromTopic(topic));

  const topics = topicLinks.map((link, index) => ({
    link,
    name: topicNames[index],
  }));

  return (
    <div className="flex w-full h-[40px] mt-[10px] relative items-center mb-[20px]">
      {isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : ""}
      <div
        className={`${
          location === "/" ? "translate-x-[250px]" : "translate-x-[165px]"
        }`}
      >
        <button
          onClick={() => {
            return location === "/"
              ? setIsLoggedIn((prev) => !prev)
              : router.push("/");
          }}
          className="section-title cursor-pointer"
        >
          My Life Uncharted
        </button>
        <div className="font-bold">
          {(() => {
            const match = topics.find((topic) =>
              (location ?? "").substring(1).includes(topic.link)
            );
            return match
              ? match.name
              : location === "/dashboard"
              ? "Dashboard"
              : null;
          })()}
        </div>
      </div>
      <div className="absolute right-0 w-[570px] h-full border-t border-b border-l rounded-tl-[10px] rounded-bl-[10px] border-(--border-color) pr-[160px] pl-[20px]">
        <ul className="flex w-full h-full justify-between text-[12px] items-center text-center">
          <li>
            <Link href="https://bernard-webfolio.web.app/">About Me</Link>
          </li>
          <li className="group relative">
            Topics
            <ul className="absolute min-w-[150px] hidden gap-1 pt-[12px] -translate-x-[30px] group-hover:grid hover:grid z-1">
              {topics.map((topic, index) => (
                <Link href={"/" + topic.link} key={index}>
                  <li className="border border-(--border-color) rounded-[5px] p-1 bg-(--background) hover:bg-(--secondary-blue) hover:text-black">
                    {topic.name}
                  </li>
                </Link>
              ))}
            </ul>
          </li>
          <li>
            <Link href="">Stay in touch</Link>
          </li>
          <li>
            <Link href="">{"Let's talk"}</Link>
          </li>
          <li
            ref={themeModeBtn}
            className="border w-[30px] h-[16px] rounded-[16px] cursor-pointer duration-300"
            onClick={handleThemeBtnClick}
          >
            <div
              ref={themeModeToggle}
              className="w-[12.78px] h-[12.78px] rounded-[12.78px] bg-(--foreground)  translate-y-[.5px] duration-300"
            ></div>
          </li>
        </ul>
      </div>
    </div>
  );
}
