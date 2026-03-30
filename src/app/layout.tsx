import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مدونتي",
  description: "مدونة شخصية للكتابات والتجارب والآراء",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-tajawal bg-background min-h-screen">
        {children}
      </body>
    </html>
  );
}
