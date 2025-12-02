import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Music Video Generator",
  description: "Generate cinematic music videos from lyrics using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="cinematic-bg min-h-screen">
        {children}
      </body>
    </html>
  );
}
