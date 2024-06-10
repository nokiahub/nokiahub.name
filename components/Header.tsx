import Link from "next/link";
import ThemeSwitchToggle from "./ThemeSwitchTogle";
import GithubIcon from "@/components/icons/GithubIcon";
import { AboutIcon } from "@/components/icons/AboutIcon";

export const Header = () => {
  return (
    <nav
      className={
        "border-border/45 sticky top-0 flex justify-between border-b bg-background px-6 py-3"
      }
    >
      <Link className={"text-xl font-bold"} href={"/"}>
        형주의 블로그
      </Link>
      <ul className={"flex items-center gap-6 px-1"}>
        <ThemeSwitchToggle />
        <Link
          target="_blank"
          href="https://github.com/nokiahub"
          aria-label="my github account"
        >
          <GithubIcon />
        </Link>
        <Link href="/about" aria-label="about me">
          <AboutIcon />
        </Link>
      </ul>
    </nav>
  );
};
