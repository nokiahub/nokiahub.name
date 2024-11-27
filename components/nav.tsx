import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeSwitchToggle from "@/components/theme-switch-toggle";
import { cn } from "@/lib/utils";

export const links = [
  { href: "/posts", label: "dev", ariaLabel: "dev" },
  { href: "/about", label: "info", ariaLabel: "about me" },
  {
    href: "https://github.com/nokiahub",
    label: "Github",
    ariaLabel: "my github account",
    external: true,
  },
];

export default function Nav() {
  return (
    <div className={cn("flex items-center")}>
      {links.map(({ href, label, ariaLabel, external }) => (
        <Button key={label} asChild variant="ghost" aria-label={ariaLabel}>
          <Link
            href={href}
            {...(external && { target: "_blank" })}
            aria-label={ariaLabel}
          >
            {label}
          </Link>
        </Button>
      ))}
      <ThemeSwitchToggle />
    </div>
  );
}
