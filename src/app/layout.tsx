import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ToasterProvider } from "@/components/providers/ToasterProvider";
import { APP_NAME } from "@/lib/constants";

const valleySans = localFont({
  src: [
    {
      path: "../../public/fonts/ValleySans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ValleySans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/ValleySans-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-valley",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${APP_NAME} — Personal Finance Management`,
  description:
    "A modern, production-grade personal finance management web application built with Next.js, TypeScript, Tailwind CSS, TanStack Query, and Supabase.",
  keywords: [
    "personal finance",
    "budget tracker",
    "expense manager",
    "nextjs",
    "supabase",
    "fintech",
    "react",
    "portfolio",
  ],
  authors: [{ name: "Alex Pratama" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={valleySans.variable}>
      <body className="min-h-screen bg-background font-valley antialiased selection:bg-[#FBBF24]/30 selection:text-[#1E293B]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider>
              {children}
              <ToasterProvider />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
