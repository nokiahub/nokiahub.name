import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeSwitchToggle from "@/components/theme-switch-toggle";
import { cn } from "@/lib/utils";

export const links = [
  { href: "/posts", label: "dev", ariaLabel: "dev" },
  { href: "/etc", label: "etc", ariaLabel: "more personal stuff" },
  { href: "/about", label: "info", ariaLabel: "about me" },
];

export default function Nav() {
  return (
    <div className={cn("flex items-center")}>
      {links.map(({ href, label, ariaLabel }) => (
        <Button key={label} asChild variant="ghost" aria-label={ariaLabel}>
          <Link href={href} aria-label={ariaLabel}>
            {label}
          </Link>
        </Button>
      ))}
      <ThemeSwitchToggle />
    </div>
  );
}
