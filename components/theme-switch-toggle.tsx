"use client";

import { useTheme } from "next-themes";
import { Bird, Rat } from "lucide-react";
import { Button } from "@/components/ui/button";
const ThemeSwitchToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isLightTheme = theme === "light" || !theme;

  return (
    <Button
      size={"icon"}
      variant={"ghost"}
      onClick={handleToggleTheme}
      aria-label={isLightTheme ? "Switch to dark mode" : "Switch to light mode"}
    >
      {isLightTheme ? <Bird /> : <Rat />}
    </Button>
  );
};

export default ThemeSwitchToggle;
