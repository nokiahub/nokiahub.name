"use client";

import { useTheme } from "next-themes";
import { Bird, Rat } from "lucide-react";
import { Button } from "@/components/ui/button";
const ThemeSwitchToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isLightTheme = theme === "light";

  return (
    <Button
      variant={"ghost"}
      onClick={handleToggleTheme}
      aria-label={isLightTheme ? "Activate dark theme" : "Activate light theme"}
      aria-pressed={!isLightTheme}
    >
      {theme === "light" ? <Bird /> : <Rat />}
    </Button>
  );
};

export default ThemeSwitchToggle;
