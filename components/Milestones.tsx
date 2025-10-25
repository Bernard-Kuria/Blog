"use client";

import { getMilestonesByTopic } from "@utils/FrontEndHooks/DataProcessing";

export default function Milestones({
  topic = "",
}: {
  topic: string | undefined;
}) {
  return (
    <div className="w-full grid justify-center h-[300px] text-white bg-(--primary-blue)">
      <div className="w-[1035px] flex justify-between items-center h-full">
        {getMilestonesByTopic(topic)?.milestones.map((milestone) => (
          <div key={milestone.id} className="sub-title text-center">
            <div className="values">{milestone.value}</div>
            {milestone.title}
          </div>
        ))}
      </div>
    </div>
  );
}
