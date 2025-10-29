"use client";

import { useEffect, useState } from "react";
import { getMilestonesByTopic } from "@utils/FrontEndHooks/DataProcessing";
import type { Milestones } from "@lib/types";

export default function Milestones({
  topic = "",
}: {
  topic: string | undefined;
}) {
  const [milestones, setMilestones] = useState<Milestones>();

  useEffect(() => {
    getMilestonesByTopic(topic).then(setMilestones);
  }, []);
  return (
    <div className="w-full grid justify-center h-[300px] text-white bg-(--primary-blue)">
      <div className="w-[1035px] flex justify-between items-center h-full">
        {!milestones ? (
          <div>Loading Milestones</div>
        ) : (
          milestones?.milestones.map((milestone, idx) => (
            <div key={idx} className="sub-title text-center">
              <div className="values">{milestone.value}</div>
              {milestone.title}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
