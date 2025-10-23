"use client";
import { milestones } from "@lib/data";
import { usePathname } from "next/navigation";

export default function Milestones() {
  const location = usePathname();

  const targetMilestones = location
    .slice(1)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const topicMilestones = milestones.find((m) => {
    if (m.topic === targetMilestones) return m.milestones;
  });

  return (
    <div className="w-full grid justify-center h-[300px] text-white bg-(--primary-blue)">
      <div className="w-[1035px] flex justify-between items-center h-full">
        {topicMilestones?.milestones.map((milestone) => (
          <div key={milestone.id} className="sub-title text-center">
            <div className="values">{milestone.value}</div>
            {milestone.title}
          </div>
        ))}
      </div>
    </div>
  );
}
