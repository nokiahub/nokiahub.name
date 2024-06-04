import { type ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: ThemeProviderProps) {
  return <ThemeProvider attribute={"class"}>{children}</ThemeProvider>;
}
