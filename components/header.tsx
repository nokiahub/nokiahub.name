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
        <Button asChild variant={"ghost"}>
          <Link href={"/posts"} aria-label={"posts"}>
            Posts
          </Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link href={"/projects"} aria-label={"projects"}>
            Projects
          </Link>
        </Button>
        <Button asChild variant={"ghost"} aria-label={"more about me"}>
          <Link href="/about" aria-label="about me">
            Info
          </Link>
        </Button>
        <Button asChild variant={"ghost"} aria-label={"github"}>
          <Link
            target="_blank"
            href="https://github.com/nokiahub"
            aria-label="my github account"
          >
            Github
          </Link>
        </Button>
        <ThemeSwitchToggle />
      </div>
    </nav>
  );
};
