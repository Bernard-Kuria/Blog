export default function Comments() {
  return (
    <div className="detail-text grid gap-[10px]">
      <strong>Comments</strong>
      <div className="grid gap-[20px]">
        <EditComment />
        <Comment />
        <Comment />
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

function Comment() {
  return (
    <div className="flex gap-[20px]">
      <div className="w-[14px] h-full bg-(--secondary-blue)"></div>
      <div className="grid gap-[10px] bg-white dark:bg-black w-full p-2">
        <div className="">Great Post</div>
        <div>1</div>
      </div>
    </div>
  );
}
