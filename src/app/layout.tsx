import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/components/cursor/CursorProvider";
import { Cursor } from "@/components/cursor/Cursor";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iPad Cursor Demo | Interactive Cursor Effect",
  description: "A standalone implementation of the iPad-style cursor effect with magnetic interactions, dynamic sizing, and smooth animations using Next.js and Framer Motion.",
  keywords: ["cursor", "ipad", "ipados", "magnetic cursor", "framer motion", "nextjs", "react", "interactive design"],
  authors: [{ name: "SpyC0der77" }],
  openGraph: {
    title: "iPad Cursor Demo",
    description: "Experience the iPad-style cursor effect with magnetic interactions and smooth animations",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <CursorProvider>
          <Cursor />
          {children}
        </CursorProvider>
      </body>
    </html>
  );
}
