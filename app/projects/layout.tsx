import { ReactNode } from "react";
export default function ProjectLayout({ children }: { children: ReactNode }) {
  return <div className={"max-w-[40rem]"}>{children}</div>;
}
