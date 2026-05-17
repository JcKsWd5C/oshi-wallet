import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oshi Wallet",
  description: "A focused wallet for fan spending and event budgets."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
