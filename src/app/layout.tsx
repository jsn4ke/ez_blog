import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchProvider from "@/components/search/SearchProvider";
import { siteName, siteDescription } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteName}`,
    default: `${siteName} | ${siteDescription}`,
  },
  description: siteDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
          <Footer />
          <SearchProvider searchUrl="/api/search" />
        </ThemeProvider>
      </body>
    </html>
  );
}
