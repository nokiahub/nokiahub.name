"use client";

import useViews from "@/app/posts/hooks/useViews";

export default function Views({ name }: { name: string }) {
  const views = useViews(name);

  return <span>{views}</span>;
}
