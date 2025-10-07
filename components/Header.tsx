import Link from "next/link";

export default function Header() {
  return (
    <div className="flex w-full h-[40px] mt-[10px] relative pl-[250px] items-center">
      <div className="text-(--secondary-blue) text-2xl font-medium">
        {"Bernard's Blog"}
      </div>
      <div className="absolute right-0 w-[570px] h-full border-t border-b border-l rounded-tl-[10px] rounded-bl-[10px] border-(--border-color)">
        <ul className="flex w-full h-full justify-around text-[12px] pr-[165px] pl-[20px] items-center text-center">
          <li>
            <Link href="https://bernard-webfolio.web.app/">About Me</Link>
          </li>
          <li className="group relative">
            <Link href="">Topics</Link>
            <ul className="absolute min-w-[110px] hidden gap-1 pt-[12px] -translate-x-[30px] group-hover:grid hover:grid">
              <Link href="/projects-&-tech">
                <li className="border border-(--border-color) rounded-[5px] p-1 hover:bg-(--border-color) hover:text-black">
                  Projects & Tech
                </li>
              </Link>
              <Link href="/startups-&-ideas">
                <li className="border border-(--border-color) rounded-[5px] p-1 hover:bg-(--border-color) hover:text-black">
                  Startups & Ideas
                </li>
              </Link>
              <Link href="/life-on-wheels">
                <li className="border border-(--border-color) rounded-[5px] p-1 hover:bg-(--border-color) hover:text-black">
                  Life On Wheels
                </li>
              </Link>
            </ul>
          </li>
          <li>
            <Link href="">Stay in touch</Link>
          </li>
          <li>
            <Link href="">{"Let's talk"}</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
