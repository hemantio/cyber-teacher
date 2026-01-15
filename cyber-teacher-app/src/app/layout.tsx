import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "Cyber Teacher - 2D Network Security Simulator",
  description: "Learn cybersecurity through interactive 2D network diagrams and animated lessons",
  keywords: ["cybersecurity", "education", "network", "simulator", "security"],
  authors: [{ name: "Hemant", url: "https://github.com/hemantpy" }],
  creator: "Hemant",
  openGraph: {
    title: "Cyber Teacher - 2D Network Security Simulator",
    description: "Learn how networks actually work through interactive protocol visualization",
    url: "https://cyber-teacher-app.vercel.app",
    siteName: "Cyber Teacher",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
