import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type Props = {
  onClose: () => void;
};

export default function RightNav({ onClose }: Props) {
  return (
    <div className={cn("fixed inset-0 backdrop-brightness-50")}>
      <div
        className={cn("fixed inset-y-0 right-0 w-[75%] bg-background p-4 px-6")}
      >
        <button onClick={onClose}>
          <ArrowRight />
        </button>
        <ul>
          <li>
            <Link href={"/posts"}>Posts</Link>
          </li>
          <li>
            <Link href={"/projects"}>Projects</Link>
          </li>
          <li>
            <Link href={"/about"}>Info</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
