import { Metadata } from "next";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "I'm Hyungju.",
};

export default function Page() {
  return (
    <div className={cn("grid grid-cols-1 gap-12 gap-y-8 pt-6 sm:grid-cols-2")}>
      <div>
        <p>
          <h1 className={cn("text-xl")}>안녕하세요.</h1>
          <br />
          css 스타일링, 애니메이션, 클린코드, 리팩토링에 관심이 있습니다.
          <br />
          유연하고 확장 가능한 프로그램 설계를 좋아합니다.
          <br />
        </p>
        <Separator className={"my-6"} />
        <ul className={cn("flex flex-col gap-2")}>
          <li>
            <Link
              target="_blank"
              href="https://github.com/nokiahub"
              aria-label="my github account"
            >
              Github
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://hazel-case-679.notion.site/29-Frontend-Developer-80d76411929b4b9e9d1cc034177385b7?pvs=4"
            >
              Resume
            </Link>
          </li>
        </ul>
        <Separator className={"my-6"} />
        <Link href={"mailto:jeonghj157@gmail.com"}>jeonghj157@gmail.com</Link>
      </div>
      <div className={cn("relative h-full")}>
        <Image
          className={"aspect-square rotate-[-4deg] rounded-xl"}
          src={"/images/me.png"}
          alt={"profile picture"}
          width={300}
          height={200}
        />
        <div
          className={cn(
            "absolute bottom-3 left-5 rounded-b-xl rounded-tl-xl bg-emerald-50 p-2 py-1.5 text-sm font-bold text-emerald-600",
          )}
        >
          제가 키우는 반려토끼에요.
        </div>
      </div>
    </div>
  );
}
