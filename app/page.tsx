import BlogTopics from "@c/BlogTopics";
import Hero from "@c/Hero";

export default function Home() {
  return (
    <div className="grid justify-center mt-[30px] gap-[100px]">
      <Hero />
      <BlogTopics />
    </div>
  );
}
