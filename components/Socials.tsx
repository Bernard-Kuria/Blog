import { IconPrefix, IconName } from "@fortawesome/fontawesome-common-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "@node_modules/next/link";

const socials = [
  { socialHandle: "https://bernard-webfolio.web.app", icon: ["fas", "globe"] },
  {
    socialHandle: "https://bernard-webfolio.web.app",
    icon: ["fab", "instagram"],
  },
  { socialHandle: "https://bernard-webfolio.web.app", icon: ["fab", "github"] },
  {
    socialHandle: "https://bernard-webfolio.web.app",
    icon: ["fab", "x-twitter"],
  },
  {
    socialHandle: "https://bernard-webfolio.web.app",
    icon: ["fab", "facebook-f"],
  },
];

export default function Socials() {
  return (
    <div className="fixed grid gap-[10px] justify-center p-[10px] w-[30px] min-h-[100px] bg-(--primary-blue) rounded-tl-[10px] rounded-bl-[10px] right-0 top-[100px] text-(--secondary-blue) text-[20px] z-10">
      {socials.map((social, idx) => (
        <Link key={idx} href={`${social.socialHandle}`}>
          <FontAwesomeIcon
            icon={[social.icon[0] as IconPrefix, social.icon[1] as IconName]}
          />
        </Link>
      ))}
    </div>
  );
}
