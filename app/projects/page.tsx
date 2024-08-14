import { allProjects as projects } from "contentlayer/generated";
import MdxComponents from "@/components/mdx/mdx-components";
import { Separator } from "@/components/ui/separator";

export default async function Projects() {
  const sortedProjects = projects.sort((p1, p2) => {
    return compareDates(p1.date, p2.date);
  });

  return (
    <ul>
      {sortedProjects.map((project) => (
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

const compareDates = (d1: string, d2: string) => {
  const date1 = new Date(d1).getTime();
  const date2 = new Date(d2).getTime();
  return date1 < date2 ? 1 : -1;
};
