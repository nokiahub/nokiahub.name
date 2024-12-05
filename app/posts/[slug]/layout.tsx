import { ReactNode } from "react";
import "@/styles/mdx.css";
import { cn } from "@/lib/utils";

export default function ArticleLayout({ children }: { children: ReactNode }) {
  return (
    <div className={cn("flex justify-center")}>
      <div className={"max-w-[46rem]"}>{children}</div>
    </div>
  );
}
