import Link from "next/link";
import ThemeSwitchToggle from "./ThemeSwitchTogle";
import GithubIcon from "../icons/GithubIcon";
import { AboutIcon } from "../icons/AboutIcon";

export const Header = () => {
  return (
    <nav className={"navbar sticky top-0 bg-background px-6"}>
      <div className={"navbar-start"}>
        <Link className={"text-xl font-bold"} href={"/"}>
          형주의 블로그
        </Link>
      </div>
      <div className={"navbar-end"}>
        <ul className={"menu menu-horizontal flex gap-6 px-1"}>
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
      </div>
    </nav>
  );
};
