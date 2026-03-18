"use client";
import { use, useEffect, useState } from "react";
import { Menu, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const currentScrollY = window.scrollY;

      // Update background on home page
      if (pathName === "/") {
        setScrolled(currentScrollY > heroHeight);
      }

      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathName, lastScrollY]);

  let bgClass = "bg-expery-blue";
  if (pathName === "/" && !scrolled) {
    bgClass = "bg-transparent";
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 flex justify-between items-center p-4 text-white transition-transform duration-300 ${bgClass} ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* LADO IZQUIERDO: Menú */}
      <Sheet>
        <SheetTrigger>
          <Menu className="w-8 h-8 ml-8 cursor-pointer" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-72 bg-expery-blue text-white border-none"
        >
          <SheetTitle></SheetTitle>
          <div className="flex flex-col gap-8 mt-16 text-xl text-center">
            <Link href="/">Inicio</Link>
            <Link href="/cruises">Cruceros</Link>
            <Link href="/experiences">Experiencias</Link>
          </div>
        </SheetContent>
      </Sheet>

      {/* CENTRO: Logo */}
        <Link href="/">
          <Image
            src="/logos/original_white.png"
            alt="Logo"
            width={180}
            height={90}
            loading="eager"
          />
        </Link>

      {/* DERECHA: Soporte */}
      <button onClick={() => toast("Línea móvil: +57 3122802986", { position: "top-center", duration: 5000 })}>
        <Phone className="w-6 h-6 mr-8" />
      </button>
    </nav>
  );
}
