import BlogCard from "./BlogCard";

export default function BlogsList() {
  return (
    <div>
      <div className="sub-title">Recent Posts</div>
      <div className="grid grid-cols-3 gap-[20px]">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
}
