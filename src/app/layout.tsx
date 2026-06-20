import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Trial Reminder — Never Get Charged Again",
  description:
    "Generate calendar reminders for your free trial subscriptions. Get alerted 24 hours before your trial expires so you can cancel in time and avoid unexpected charges.",
  keywords: [
    "free trial reminder",
    "subscription reminder",
    "trial expiration",
    "cancel free trial",
    "calendar reminder",
    "ics file generator",
  ],
  authors: [{ name: "Free Trial Reminder" }],
  openGraph: {
    title: "Free Trial Reminder — Never Get Charged Again",
    description:
      "Generate calendar reminders for your free trial subscriptions. Get alerted 24 hours before your trial expires.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
