import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fox Audit | 2-Hour Financial Deep Dive",
  description:
    "A flat-fee, one-time financial audit. Review your income, expenses, debt, investments, and walk away with a 12-month game plan — no ongoing advisor dependency.",
  openGraph: {
    title: "Fox Audit | 2-Hour Financial Deep Dive",
    description:
      "Stop guessing with your money. One session, one plan. No commissions, no upsells.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
