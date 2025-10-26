import Link from "next/link";

import SectionTitle from "@c/SectionTitle";
import BlogsList from "@c/BlogsList";
import DraftList from "@c/DraftList";

import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome/dist";

import {
  filterBlogsBy,
  filterDraftsBy,
  getAllTopics,
} from "@utils/FrontEndHooks/DataProcessing";

export default function Dashboard() {
  return (
    <div className="grid justify-center">
      <div className="page-layout flex flex-col gap-[30px]">
        <div className="flex gap-[50px] items-center">
          <SectionTitle title="My Blogs" />
          <button className="button">
            <Link href={"/dashboard/new"}>create new blog</Link>
          </button>
        </div>

        {getAllTopics().map((topic) => (
          <div key={topic.id}>
            <div className="sub-title">{topic.title}</div>

            <div className="grid gap-[20px]">
              {filterBlogsBy("topic", topic.title).map((blog) => {
                return (
                  <div
                    key={blog.id}
                    className="w-full flex justify-between gap-[10px] items-center"
                  >
                    <BlogsList blog={blog} />
                    <FontAwesomeIcon
                      icon={["fas", "trash"]}
                      className="hover:text-red-500 cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <hr className="border-gray-500" />

        <div className="sub-title">Drafts</div>

        {getAllTopics().map((topic) => (
          <div key={topic.id}>
            <div className="sub-title">{topic.title}</div>

            <div className="grid gap-[20px]">
              {filterDraftsBy("topic", topic.title).map((blog) => {
                return (
                  <div
                    key={blog.id}
                    className="w-full flex justify-between gap-[10px] items-center"
                  >
                    <DraftList blog={blog} />
                    <FontAwesomeIcon
                      icon={["fas", "trash"]}
                      className="hover:text-red-500 cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
