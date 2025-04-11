import { ReactNode } from "react";
import "@/styles/mdx.css";
import { cn } from "@/lib/utils";

export default function ArticleLayout({ children }: { children: ReactNode }) {
  return <div className={cn("prose flex justify-between")}>{children}</div>;
}
