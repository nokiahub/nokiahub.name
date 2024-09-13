"use client";

import { useEffect } from "react";

export default function useViews(name: string) {
  useEffect(() => {
    // increment views
    fetch(`/api/views/${name}`, { method: "POST" }).then((res) => {
      console.log("use views", res);
      if (!res.ok) {
        console.error("Failed to increment views");
      }
    });
  }, [name]);

  return null;
}
