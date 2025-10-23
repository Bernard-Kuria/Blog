type BlogsListProps = {
  title?: string;
  subtitle?: string;
};

export default function BlogsList({ title, subtitle }: BlogsListProps) {
  return (
    <div className="border rounded-[10px] w-full grid gap-[15px] p-5">
      <div className="sub-title">{title}</div>
      <div className="blog-font grid grid-cols-3 gap-[20px]">{subtitle}</div>
    </div>
  );
}
