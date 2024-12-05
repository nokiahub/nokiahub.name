import "@/styles/globals.css";
import { ReactNode } from "react";
import { Header } from "@/components/header";
import Footer from "../components/footer";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { Providers } from "@/components/providers";

import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const helveticaNeue = localFont({
  src: "./fonts/HelveticaNeueCyr-Medium.woff2",
  display: "swap",
  weight: "500",
});

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
      <body className={cn(helveticaNeue.className, "antialiased")}>
        <Providers>
          <Header />
          <main className={"flex justify-center py-8"}>
            <div className={cn("w-full max-w-[960px] px-4")}>{children}</div>
          </main>
          <Footer />
          <ScrollToTopButton />
        </Providers>
      </body>
    </html>
  );
}
