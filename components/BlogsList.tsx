import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome/dist";

type Blog = {
  id: string;
  image: string;
  topic: string;
  title: string;
  subtitle: string;
  dateCreated: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
};

type BlogProps = { blog: Blog };

export default function BlogsList({ blog }: BlogProps) {
  const { views, comments, likes } = blog;
  return (
    <div className="flex gap-[10px] border rounded-[10px] w-full p-5">
      <div className="flex-1 flex flex-col gap-[15px]">
        <div className="sub-title">{blog.title}</div>
        <div className="flex-1 blog-font grid grid-cols-3 gap-[20px]">
          {blog.subtitle}
        </div>
      </div>
      <div className="flex justify-between items-center w-56 h-[15px]">
        <div className="flex gap-[10px]">
          <FontAwesomeIcon icon={["far", "eye"]} className="w-[15px]" /> {views}
        </div>
        <div className="flex gap-[10px]">
          <FontAwesomeIcon icon={["far", "comment"]} className="w-[15px]" />
          {comments}
        </div>
        <div className="flex gap-[10px]">
          <FontAwesomeIcon icon={["far", "heart"]} className="w-[15px]" />{" "}
          {likes}
        </div>
      </div>
    </div>
  );
}
