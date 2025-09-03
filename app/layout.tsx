import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // better font loading
});

export const metadata: Metadata = {
  title: "SafeReport - Anonymous Crime Reporting",
  description: "Securely and anonymously report crimes to law enforcement",
  keywords: [
    "crime report",
    "anonymous reporting",
    "safe community",
    "law enforcement",
  ],
  openGraph: {
    title: "SafeReport - Anonymous Crime Reporting",
    description: "Securely and anonymously report crimes to law enforcement",
    url: "https://safereport.app",
    siteName: "SafeReport",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SafeReport Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafeReport - Anonymous Crime Reporting",
    description: "Report crimes securely and anonymously.",
    images: ["/og-image.png"],
  },
  themeColor: "#0ea5e9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-black text-white antialiased selection:bg-sky-500/20`}
      >
        <div className="relative min-h-screen flex flex-col">
          {/* Background Effects */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Soft gradient layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.07),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.06),transparent_70%)]" />

            {/* Animated gradient blob */}
            <div className="absolute top-1/3 left-1/4 h-[600px] w-[600px] rounded-full bg-sky-500/20 blur-[150px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[180px] animate-pulse delay-700" />
          </div>

          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-1 pt-16">
            <Providers>{children}</Providers>
          </main>

          {/* Footer Placeholder (future-ready) */}
          <footer className="mt-auto border-t border-white/10 py-6 text-center text-xs text-zinc-500">
            © {new Date().getFullYear()} SafeReport. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}