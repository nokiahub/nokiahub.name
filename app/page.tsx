import { Posts } from "@/components/posts";
import { cn } from "@/lib/utils";
import { Tags } from "@/components/tags";

export default function Page() {
  return (
    <div className={cn("flex flex-col gap-12")}>
      <Tags />
      <Posts />
    </div>
  );
}
