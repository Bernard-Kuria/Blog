import Image from "next/image";

const topics = [
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

export default function BlogTopics() {
  return (
    <div className="w-[1035px] grid justify-center gap-[50px] text-(--secondary-blue) text-center section-title">
      Browse Topics
      <div className="flex flex-wrap gap-[20px]">
        {topics.map((topic, key) => (
          <div
            key={key}
            className="w-[500px] h-[370px] border border-(--border-color) p-[5px]"
          >
            <div className="relative w-full h-[250px] overflow-hidden">
              <Image
                src={`/assets/${topic.image}`}
                alt="topic image"
                fill
                className="object-cover"
              />
            </div>
            <div className="grid gap-[20px] p-2 w-full h-[108px] bg-white text-black text-left">
              <div className="text-[20px] font-semibold">{topic.title}</div>
              <div className="text-[12px]">{topic.timeStamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
