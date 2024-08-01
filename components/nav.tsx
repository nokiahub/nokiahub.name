import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeSwitchToggle from "@/components/theme-switch-toggle";
import { cn } from "@/lib/utils";

export default function Nav() {
  return (
    <div className={cn("flex items-center")}>
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
  );
}
