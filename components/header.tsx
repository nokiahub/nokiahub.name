import Link from "next/link";
import Nav from "@/components/nav";
import Burger from "@/components/burger";
import { cn } from "@/lib/utils";

export const Header = () => {
  return (
    <div
      className={
        "sticky top-0 flex items-center justify-between border-b border-border/45 bg-background px-6 py-3"
      }
    >
      <Link className={"text-end text-xl"} href={"/"}>
        형주의 블로그
      </Link>
      <div className={cn("hidden md:block")}>
        <Nav />
      </div>
      <div className={cn("block md:hidden")}>
        <Burger />
      </div>
    </div>
  );
};
