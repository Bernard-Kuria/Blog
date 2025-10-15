import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BlogCard() {
  return (
    <div className="border grid grid-rows-[70%_1fr] border-gray-400 h-[400px]">
      <div className="relative">
        <Image src="/Cyclers.png" alt="" fill />
      </div>
      <div className="grid gap-[10px] p-[20px]">
        <div className="sub-title text-(--primary-blue)">
          Nyeri: A hilly journey
        </div>
        <div className="flex justify-between border-t border-gray-600 detail-text pt-[10px]">
          <div>67 views</div>
          <div className="flex gap-[10px] items-center">
            <FontAwesomeIcon className="icon-size" icon={["far", "heart"]} /> 0
          </div>
          <div className="flex gap-[10px] items-center">
            <FontAwesomeIcon className="icon-size" icon={["far", "message"]} />{" "}
            3
          </div>
        </div>
      </div>
    </div>
  );
}
