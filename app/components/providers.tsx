import { type ThemeProviderProps } from 'next-themes/dist/types';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: ThemeProviderProps) {
  // @ts-ignore
  return <ThemeProvider>{children}</ThemeProvider>;
}
