import { allProjects } from "contentlayer/generated";
import MdxComponents from "@/components/mdx/mdx-components";
import { Separator } from "@/components/ui/separator";

export default async function Projects() {
  return (
    <ul>
      {allProjects.map((project) => (
        <li key={project.title}>
          <div className="prose w-full max-w-[640px] border-none dark:prose-invert">
            <MdxComponents post={project} />
          </div>
          <Separator className={"my-8"} />
        </li>
      ))}
    </ul>
  );
}
