import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import ThemeSwitchToggle from "@/components/theme-switch-toggle";
import { MouseEvent } from "react";

type Props = {
  onClose: () => void;
};

const links = [
  { href: "/posts", label: "Posts" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "Info" },
];

export default function RightNav({ onClose }: Props) {
  const handleInnerClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={cn("fixed inset-0 backdrop-brightness-50")}
      onClick={onClose}
    >
      <div
        className={cn("fixed inset-y-0 right-0 w-[75%] bg-background p-4 px-6")}
        onClick={handleInnerClick}
      >
        <button onClick={onClose}>
          <ArrowRight />
        </button>
        <ul>
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} onClick={onClose}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <ThemeSwitchToggle />
      </div>
    </div>
  );
}
