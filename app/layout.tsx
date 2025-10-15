import type { Metadata } from "next";
import { Mulish, Lexend } from "next/font/google";
import "./globals.css";
import Header from "@c/Header";
import "@l/icons";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bernard's Blog",
  description: "A creative space for me to showcase a glimpse of myself",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mulish.variable} ${lexend.variable} antialiased min-h-screen transition-colors duration-500`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
