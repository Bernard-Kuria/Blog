import SectionTitle from "@c/SectionTitle";
import BlogsList from "@c/BlogsList";

import { blogTopics, blogContent } from "@lib/mock-data";
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
              {blogContent
                .filter((blog) => blog.topic === topic.title)
                .map((blog) => {
                  const title =
                    blog.blog.find((b) => b.type === "heading")?.content ?? "";
                  const subtitle =
                    blog.blog.find((b) => b.type === "subheading")?.content ??
                    "";

                  return (
                    <div key={blog.id} className="flex gap-[10px] items-center">
                      <BlogsList title={title} subtitle={subtitle} />
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
