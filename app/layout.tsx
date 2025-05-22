import React from "react";

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "FaceScan",
  description: "감정분석기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="mx-auto bg-black text-white antialiased md:max-w-xl">
        {children}
      </body>
    </html>
  );
}
