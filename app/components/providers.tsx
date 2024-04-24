import { type ThemeProviderProps } from 'next-themes/dist/types';
import { ThemeProvider } from 'next-themes';
import * as React from 'react';

export function Providers({ children, ...props }: ThemeProviderProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
