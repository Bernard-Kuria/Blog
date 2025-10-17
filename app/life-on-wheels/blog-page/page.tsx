import BlogArea from "@c/BlogArea";
import Comments from "@c/Comments";
import BlogTopics from "@components/BlogTopics";

export default function BlogPage() {
  return (
    <div className="grid justify-center gap-[30px]">
      <div>Back</div>
      <BlogArea />
      <Comments />
      <BlogTopics />
    </div>
  );
}
