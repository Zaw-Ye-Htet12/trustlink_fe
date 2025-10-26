// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { NavBar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrustLink - Connect with Verified Service Providers",
  description:
    "A trusted platform connecting Myanmar migrants in Thailand with verified service providers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1">{children}</main>
            <Toaster />
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
