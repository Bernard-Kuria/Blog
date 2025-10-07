import BlogTopics from "./BlogTopics";

export type topicsType = {
  image: string;
  title: string;
  timeStamp: string;
};

const topics: topicsType[] = [
  {
    image: "Proj-tech.png",
    title: "🔧 Projects & Tech",
    timeStamp: "Last Updated Mar 21, 2025",
  },
  {
    image: "Ideas.png",
    title: "🌍 Startups & Ideas",
    timeStamp: "Last Updated Mar 21, 2025",
  },
  {
    image: "Bike.png",
    title: "🚴 Life on Wheel",
    timeStamp: "Last Updated Mar 21, 2025",
  },
];

export default function Topics() {
  return (
    <div className="w-[1035px] grid justify-center gap-[50px] text-(--secondary-blue) text-center section-title">
      Browse Topics
      <div className="flex flex-wrap gap-[20px]">
        {topics.map((topic, key) => (
          <BlogTopics key={key} {...topic} />
        ))}
      </div>
    </div>
  );
}
