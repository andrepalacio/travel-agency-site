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
  description:
    "Explora el lujo de viajar con Expery Travel: cruceros exclusivos, destinos de ensueño y experiencias personalizadas.",
  openGraph: {
    title: "Expery Travel - El arte de viajar",
    description:
      "Descubre cruceros exclusivos y experiencias personalizadas con Expery Travel.",
    url: "https://experytravel.com",
    siteName: "Expery Travel",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expery Travel - El arte de viajar",
    description: "Descubre cruceros exclusivos y experiencias personalizadas.",
    site: "@experytravel",
    images: ["https://experytravel.com/twitter-image.jpg"],
  },
  keywords: [
    "cruceros de lujo",
    "viajes exclusivos",
    "Expery Travel",
    "destinos de ensueño",
    "servicio premium",
    "viajes premium",
    "experiencias personalizadas",
  ],
  robots: "index, follow",
  authors: [{ name: "Expery Travel", url: "https://experytravel.com" }],
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
