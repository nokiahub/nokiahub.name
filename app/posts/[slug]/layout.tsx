import { ReactNode } from "react";
import "@/styles/mdx.css";

export default function ArticleLayout({ children }: { children: ReactNode }) {
  return <div className={"max-w-[48rem]"}>{children}</div>;
}
