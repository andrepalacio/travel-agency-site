import { NavBar } from "@/components/global/NavBar";
import { Footer } from "@/components/global/Footer";

export default function CruisesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
