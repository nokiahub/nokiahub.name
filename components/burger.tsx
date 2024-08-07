"use client";

import RightNav from "@/components/right-nav";
import { Menu } from "lucide-react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function Burger() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Menu />
      </DrawerTrigger>
      <DrawerContent>
        <RightNav />
      </DrawerContent>
    </Drawer>
  );
}
