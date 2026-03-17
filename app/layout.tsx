import type { Metadata } from "next";
import { Gelasio, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/global/NavBar";
import { Footer } from "@/components/global/Footer";
import { Toaster } from "@/components/ui/sonner";

const gelasio = Gelasio({
  variable: "--font-gelasio-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expery Travel",
  description: "Agencia de viajes de lujo. Explora destinos mágicos con experiencias personalizadas y servicios exclusivos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${gelasio.variable} ${geistMono.variable} antialiased bg-white/80`}
      >
        {/* Navegación Global */}
        <NavBar />
        {children}
        <Toaster />
        {/* Pie de página con enlaces legales */}
        <Footer />
      </body>
    </html>
  );
}
