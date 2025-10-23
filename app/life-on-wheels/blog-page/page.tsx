import BlogReading from "@components/BlogReading";
import Comments from "@c/Comments";
import Blogs from "@components/Blogs";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="page-layout grid gap-[30px]">
      <Link className="cursor-pointer w-fit" href={"../life-on-wheels"}>
        &larr; Back
      </Link>
      <BlogReading />
      <Comments />
      <Blogs />
    </div>
  );
}
