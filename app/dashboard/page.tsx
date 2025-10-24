import SectionTitle from "@c/SectionTitle";
import BlogsList from "@c/BlogsList";

import { blogTopics, blogs } from "@lib/mock-data";
import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome/dist";

export default function Dashboard() {
  return (
    <div className="grid justify-center">
      <div className="page-layout flex flex-col gap-[30px]">
        <SectionTitle title="My Blogs" />
        {blogTopics.map((topic) => (
          <div key={topic.id}>
            <div className="sub-title">{topic.title}</div>

            <div className="grid gap-[20px]">
              {blogs
                .filter((blog) => blog.topic === topic.title)
                .map((blog) => {
                  return (
                    <div key={blog.id} className="flex gap-[10px] items-center">
                      <BlogsList blog={blog} />
                      <div className="w-[12px] h-[12px]">
                        <FontAwesomeIcon icon={["fas", "trash"]} />
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="h-[20px]"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
