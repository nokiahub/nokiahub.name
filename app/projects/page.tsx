import { Card, CardContent } from "@/components/ui/card";
import { allProjects } from "contentlayer/generated";
import MdxComponents from "@/components/mdx/mdx-components";
import { Separator } from "@/components/ui/separator";

export default async function Projects() {
  return (
    <ul>
      {allProjects.map((project) => (
        <li key={project.title} className={"mb-4"}>
          <Card className="prose w-full max-w-[640px] border-none p-4 dark:prose-invert">
            <CardContent>
              <MdxComponents post={project} />
            </CardContent>
          </Card>
          <Separator />
        </li>
      ))}
    </ul>
  );
}
