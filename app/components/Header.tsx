import Link from "next/link";
import ThemeSwitchToggle from "./ThemeSwitchTogle";
import GithubIcon from "../icons/GithubIcon";
import { AboutIcon } from "../icons/AboutIcon";

export const Header = () => {
  return (
    <nav
      className={
        "border-border flex w-full items-center justify-between border-b p-[1.25rem] pb-[1rem] pt-[0.75rem]"
      }
    >
      <div className={"bg-opacity-10"}>
        <Link href={"/"}>형주의 블로그</Link>
      </div>
      <div className={"flex gap-[1.5rem]"}>
        <div className={"m-0 flex flex-col justify-center text-lg"}>
          <ThemeSwitchToggle />
        </div>
        <div className={"m-0 flex flex-col justify-center text-lg"}>
          <Link
            target="_blank"
            href="https://github.com/nokiahub"
            aria-label="my github account"
          >
            <GithubIcon />
          </Link>
        </div>
        <div className={"m-0 flex flex-col justify-center text-lg"}>
          <Link href="/about" aria-label="about me">
            <AboutIcon />
          </Link>
        </div>
      </div>
    </nav>
  );
};
