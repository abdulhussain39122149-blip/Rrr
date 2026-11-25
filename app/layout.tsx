import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "গোপন বার্তা",
  description: "এনক্রিপ্ট করা, মেয়াদ-নির্ধারিত বার্তা শেয়ার করুন।",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
