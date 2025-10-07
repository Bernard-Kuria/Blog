import type { Metadata } from "next";
import { Inter, Fira_Code, Merriweather_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriweatherSans = Merriweather_Sans({
  variable: "--font-merriweather",
  subsets: ["latin"],
});

const fira = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bernard's Blog",
  description: "A creative space for web devs and tech explorers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${merriweatherSans.variable} ${fira.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
