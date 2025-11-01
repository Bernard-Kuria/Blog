"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { comment, commentsType } from "@lib/types";
import { useEffect, useState } from "react";

import { getSpecificBlogComments } from "@services/comments";

export default function Comments({ blogId }: { blogId: string }) {
  const [comments, setComments] = useState<commentsType>();
  useEffect(() => {
    getSpecificBlogComments(blogId).then(setComments);
  }, []);

  return (
    <div className="detail-text grid gap-[10px]">
      <strong>Comments (Anonymous)</strong>
      <div className="grid gap-[20px]">
        <EditComment />
        {!comments ? (
          <div>Loading comments</div>
        ) : (
          comments.map((c, id) => <Comment key={id} comment={c} />)
        )}
      </div>
      <div className="text-(--primary-blue)">view more</div>
    </div>
  );
}

function EditComment() {
  return (
    <div className="flex gap-[20px]">
      <div className="w-[14px] h-full bg-(--secondary-blue)"></div>
      <div className="bg-white dark:bg-black w-full p-2">
        <input type="text" placeholder="Add comment here" className="w-full" />
        <hr />
        <div className="text-(--primary-blue)">Add comment</div>
      </div>
    </div>
  );
}

function Comment({ comment }: { comment: comment }) {
  return (
    <div className="flex gap-[20px]">
      <div className="w-[14px] h-full bg-(--secondary-blue)"></div>
      <div className="grid gap-[10px] bg-white dark:bg-black w-full p-2">
        <div className="">{comment.comment}</div>
        <div className="flex gap-[10px] items-center">
          {comment.likes}{" "}
          <FontAwesomeIcon className="icon-size" icon={["far", "thumbs-up"]} />
        </div>
      </div>
    </div>
  );
}
