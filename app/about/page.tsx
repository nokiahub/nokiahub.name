import { Metadata } from "next";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const metadata: Metadata = {
  title: "I'm Hyungju.",
};

export default function Page() {
  return (
    <div className={cn("grid grid-cols-1  gap-8 sm:grid-cols-2")}>
      <div className={cn("row-span-3")}>
        <p>
          안녕하세요. 3년차 프론트엔드 개발자 정형주입니다.
          <br />
          알고리즘, 클린코드, 리팩토링에 관심이 있습니다.
          <br />
          유연하고 확장 가능한 프로그램 설계를 좋아합니다.
          <br />
        </p>

        <div className={cn("row-span-2")}>
          <p>
            <br />더 자세한 내용은{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://hazel-case-679.notion.site/29-Frontend-Developer-80d76411929b4b9e9d1cc034177385b7?pvs=4"
            >
              이력서
            </a>
            에서 확인하실 수 있습니다.
            <br />
            감사합니다!
          </p>
        </div>
      </div>
      <div className={cn("row-span-5")}>
        <Image
          className={"rotate-3 rounded-xl"}
          src={"/images/me.jpeg"}
          alt={"profile picture"}
          width={200}
          height={300}
        />
      </div>
    </div>
  );
}
