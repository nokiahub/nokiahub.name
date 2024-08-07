import Link from "next/link";
import ThemeSwitchToggle from "@/components/theme-switch-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/posts", label: "Posts" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "Info" },
];

export default function RightNav() {
  return (
    <div className={cn("p-6")}>
      <ul className={cn("flex flex-col items-center gap-2")}>
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
        <li>
          <ThemeSwitchToggle />
        </li>
      </ul>
    </div>
  );
}
