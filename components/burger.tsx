"use client";

import { useState } from "react";
import RightNav from "@/components/right-nav";
import { Menu } from "lucide-react";

export default function Burger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <Menu />
      </button>
      {open && <RightNav onClose={() => setOpen(false)} />}
    </>
  );
}
