import { Card, CardContent } from "@/components/ui/card";
import { allProjects } from "contentlayer/generated";
import MdxComponents from "@/components/mdx/mdx-components";

export default async function Projects() {
  return (
    <ul>
      {allProjects.map((project) => (
        <li key={project.title} className={"mb-4"}>
          <Card className="w-full max-w-[640px] p-4">
            <CardContent>
              <MdxComponents post={project} />
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
