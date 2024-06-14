import { ReactNode } from "react";
import "@/styles/mdx.css";

export default function ArticleLayout({ children }: { children: ReactNode }) {
  return <div className={"max-w-[40rem]"}>{children}</div>;
}
