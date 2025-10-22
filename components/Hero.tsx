import Image from "next/legacy/image";

export default function Hero() {
  const lines = [
    {
      width: "200",
      height: "15",
      top: "50%",
      left: "-100px",
      color: "bg-(--primary-blue)",
    },
    {
      width: "210",
      height: "30",
      top: "30px",
      left: "30%",
      color: "bg-(--foreground)",
    },
    {
      width: "170",
      height: "30",
      top: "338px",
      left: "275px",
      color: "bg-(--foreground)",
    },
    {
      width: "70",
      height: "30",
      top: "390px",
      left: "541px",
      color: "bg-(--primary-blue)",
    },
    {
      width: "210",
      height: "25",
      top: "70%",
      left: "930px",
      color: "bg-(--primary-blue)",
    },
  ];

  return (
    <div className="relative w-[1035px] h-[450px] border-[5px] rounded-[10px] border-(--border-color) flex items-center p-[30px]">
      <div className="merriweather-font text-[80px] w-[65%] font-semibold leading-tight">
        Miles, <span className="text-(--primary-blue)">Mindsets</span> & Making
        Stuff
      </div>

      <div className="relative w-[350px] h-[350px] overflow-hidden">
        <Image
          src="/chill.jpg"
          alt="chill image"
          layout="fill"
          className="object-cover object-[0%_40%]"
        />
      </div>

      <div className="absolute top-[-68px] left-[-70px]">
        <div className="relative p-[3px]">
          <BorderLines />
          <div className="relative w-[143px] h-[198px] overflow-hidden">
            <Image
              src="assets/blogImg/bike-riding.jpg"
              alt="chill image"
              layout="fill"
              className="object-cover object-[0%_40%]"
            />
          </div>
        </div>
      </div>

      <div className="absolute top-[360px] left-[-70px] p-[4px]">
        <div className="relative p-[3px]">
          <BorderLines />
          <div className="relative w-[292px] h-[143px] overflow-hidden">
            <Image
              src="assets/blogTopicImg/jkuat-hackathon.jpg"
              alt="chill image"
              layout="fill"
              className="object-cover object-[0%_40%]"
            />
          </div>
        </div>
      </div>

      {lines.map((line, i) => (
        <div
          key={i}
          className={`absolute ${line.color}`}
          style={{
            width: `${line.width}px`,
            height: `${line.height}px`,
            top: line.top,
            left: line.left,
          }}
        />
      ))}

      <div className="absolute h-auto left-[70%] top-[-4px] flex">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div
            key={i}
            className={`bg-(--background)`}
            style={{
              width: `20px`,
              height: `6px`,
              transform: `rotate(135deg)`,
            }}
          />
        ))}
      </div>

      <div className="absolute h-auto left-[30%] bottom-[-4px] flex">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div
            key={i}
            className={`bg-(--background)`}
            style={{
              width: `20px`,
              height: `6px`,
              transform: `rotate(135deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function BorderLines() {
  return (
    <>
      <div className="absolute top-0 left-0">
        <div className="w-[20px] h-[1px] bg-(--secondary-blue)"></div>
        <div className="w-[20px] h-[1px] bg-(--secondary-blue) rotate-90 -translate-x-[10px] translate-y-[9px]"></div>
      </div>
      <div className="absolute bottom-0 right-0">
        <div className="w-[20px] h-[1px] bg-(--secondary-blue) translate-y-[1px]"></div>
        <div className="w-[20px] h-[1px] bg-(--secondary-blue) rotate-90 translate-x-[10px] -translate-y-[10px]"></div>
      </div>
    </>
  );
}
