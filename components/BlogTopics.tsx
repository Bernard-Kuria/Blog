import Image from "next/image";
import { topicsType } from "./Topics";

export default function BlogTopics({ image, title, timeStamp }: topicsType) {
  return (
    <div className="w-[500px] h-[370px] border border-(--border-color) p-[5px]">
      <div className="relative w-full h-[250px] overflow-hidden">
        <Image
          src={`/assets/${image}`}
          alt="topic image"
          fill
          className="object-cover"
        />
      </div>
      <div className="grid gap-[20px] p-2 w-full h-[108px] bg-white text-black text-left">
        <div className="text-[20px] font-semibold">{title}</div>
        <div className="text-[12px]">{timeStamp}</div>
      </div>
    </div>
  );
}
