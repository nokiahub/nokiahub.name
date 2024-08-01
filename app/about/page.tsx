import { allAboutMes } from "contentlayer/generated";
import MdxComponents from "@/components/mdx/mdx-components";

export default function Page() {
  return <MdxComponents post={allAboutMes[0]} />;
}
