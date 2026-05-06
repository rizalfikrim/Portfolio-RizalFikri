import type { Metadata } from "next";
import { Orbitron, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "../components/ui/CustomCursor";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

import { LanguageProvider } from "../context/LanguageContext";

export const metadata: Metadata = {
  title: "Rizal Fikri Mulyana | Backend Developer",
  description:
    "Portfolio of Rizal Fikri Mulyana, a passionate Backend Developer specializing in scalable systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${syne.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-bg text-text-primary font-body">
        <LanguageProvider>
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-1 pt-16">{children}</main>

          {/* Footer */}
          <Footer />

          {/* Cursor */}
          <CustomCursor />
        </LanguageProvider>
      </body>
    </html>
  );
}
