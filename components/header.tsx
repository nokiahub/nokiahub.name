import Link from "next/link";
import ThemeSwitchToggle from "./theme-switch-toggle";
import Github from "@/components/icons/github";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <nav
      className={
        "sticky top-0 flex items-center justify-between border-b border-border/45 bg-background px-6 py-3"
      }
    >
      <Link className={"text-end text-xl"} href={"/"}>
        형주의 블로그
      </Link>
      <ul className={"flex items-center px-1"}>
        <Link href={"/projects"} aria-label={"projects"}>
          <Button variant={"ghost"}>Projects</Button>
        </Link>
        <ThemeSwitchToggle />
        <Link
          target="_blank"
          href="https://github.com/nokiahub"
          aria-label="my github account"
        >
          <Button variant={"ghost"}>
            <Github />
          </Button>
        </Link>
        <Link href="/about" aria-label="about me">
          <Button variant={"ghost"}>
            <Info />
          </Button>
        </Link>
      </ul>
    </nav>
  );
};
