import BlogEdit from "@c/BlogEdit";
import Link from "next/link";

export default function page() {
  return (
    <div className="grid justify-center">
      <div className="page-layout flex flex-col gap-[30px]">
        <div className="values text-(--primary-blue)">Create Blog</div>
        <Link className="cursor-pointer w-fit" href={"../life-on-wheels"}>
          &larr; Back
        </Link>
        <BlogEdit />
      </div>
    </div>
  );
}
