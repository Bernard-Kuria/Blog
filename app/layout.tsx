import type { Metadata } from "next";
import { Mulish, Lexend } from "next/font/google";
import "./globals.css";
import Header from "@c/Header";
import Socials from "@c/Socials";
import "@lib/icons";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Life Uncharted",
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
        className={`${mulish.variable} ${lexend.variable} antialiased w-full min-h-screen transition-colors duration-500 pb-[30px]`}
      >
        <Header />
        <Socials />
        {children}
      </body>
    </html>
  );
}
