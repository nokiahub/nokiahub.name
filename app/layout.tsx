import "@/styles/globals.css";
import { ReactNode } from "react";
import { Header } from "@/components/header";
import Footer from "../components/footer";
import { Providers } from "@/components/providers";

import { Orbit } from "next/font/google";

const font = Orbit({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

import { cn } from "@/lib/utils";

export const metadata = {
  title: "nokia's blog",
  description: "Generated by Next.js",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={"ko"} suppressHydrationWarning>
      <body
        className={cn(
          "antialiased",
          "flex min-h-screen flex-col justify-between",
          font.className,
        )}
      >
        <Providers>
          <div>
            <Header />
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
