import { cn } from "@/lib/utils";
import { Hero } from "@/components/hero";

export default async function Page() {
  return (
    <div className={cn("flex flex-col gap-12")}>
      <Hero />
    </div>
  );
}
