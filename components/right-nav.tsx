import Link from "next/link";
import ThemeSwitchToggle from "@/components/theme-switch-toggle";
import { cn } from "@/lib/utils";
import { links } from "@/components/nav";

export default function RightNav() {
  return (
    <div className={cn("p-6")}>
      <ul className={cn("flex flex-col items-center gap-2")}>
        {links.map(({ href, label, ariaLabel }) => (
          <li key={href}>
            <Link href={href} aria-label={ariaLabel}>
              {label}
            </Link>
          </li>
        ))}
        <li>
          <ThemeSwitchToggle />
        </li>
      </ul>
    </div>
  );
}
