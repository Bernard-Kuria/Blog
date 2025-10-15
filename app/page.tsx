import BlogTopics from "@c/BlogTopics";
import Hero from "@c/Hero";

export default function Home() {
  return (
    <div className="page-layout">
      <Hero />
      <BlogTopics />
    </div>
  );
}
