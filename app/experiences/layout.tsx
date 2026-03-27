import { NavBar } from "@/components/global/NavBar";
import { Footer } from "@/components/global/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        {/* Navegación Global */}
        <NavBar />
        {children}
        <Toaster />
        {/* Pie de página con enlaces legales */}
        <Footer />
    </>
  );
}
