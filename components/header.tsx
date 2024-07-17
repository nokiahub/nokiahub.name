import Link from "next/link";
import ThemeSwitchToggle from "./theme-switch-toggle";
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
      <div className={"flex items-center"}>
        <Link href={"/posts"} aria-label={"posts"}>
          <Button variant={"ghost"}>Posts</Button>
        </Link>
        <Link href={"/projects"} aria-label={"projects"}>
          <Button variant={"ghost"}>Projects</Button>
        </Link>
        <Link href="/about" aria-label="about me">
          <Button variant={"ghost"} aria-label={"more about me"}>
            Info
          </Button>
        </Link>
        <Link
          target="_blank"
          href="https://github.com/nokiahub"
          aria-label="my github account"
        >
          <Button variant={"ghost"} aria-label={"github"}>
            Github
          </Button>
        </Link>
        <ThemeSwitchToggle />
      </div>
    </nav>
  );
};
