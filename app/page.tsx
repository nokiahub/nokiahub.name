import { cn } from "@/lib/utils";
import { Hero } from "@/components/hero";

export default async function Page() {
  return (
    <main className={"flex justify-center py-8"}>
      <div className={cn("w-full max-w-[960px] px-4 pb-20")}>
        <div className={cn("flex flex-col gap-12")}>
          <Hero />
        </div>
      </div>
    </main>
  );
}
