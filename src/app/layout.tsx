"use client";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Common/Sidebar";

import "./globals.css";
import { ThemeProvider } from "@ui5/webcomponents-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 flex min-h-screen border-red`}
        >
          <Sidebar />
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
