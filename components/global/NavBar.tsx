"use client";
import { use, useEffect, useState, useRef } from "react";
import { Menu, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface NavBarProps {
  scrollContainer?: HTMLElement | Window | null;
  isHomePage?: boolean;
  absolute?: boolean;
  scrollOffset?: number;
  scrollY?: number;
}

export function NavBar({ scrollContainer, isHomePage, absolute = false, scrollOffset, scrollY }: NavBarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const scrolledRef = useRef(false);
  const lastScrollYFromPropRef = useRef(0);
  const pathName = usePathname();

  // Determine if we should treat as home page
  const treatAsHomePage = isHomePage ?? pathName === "/";

  // Determine the scroll container: if prop provided, use it; else window
  const container = scrollContainer ?? (typeof window !== "undefined" ? window : null);

  // Effect for when scrollY is provided as prop (controlled scroll)
  useEffect(() => {
    if (scrollY === undefined) return;

    // Update background on home page
    if (treatAsHomePage) {
      const threshold = scrollOffset !== undefined ? scrollOffset : (container === window ? window.innerHeight : (container as HTMLElement)?.clientHeight ?? 0);
      const isScrolled = scrollY > threshold;
      scrolledRef.current = isScrolled;
      setScrolled(isScrolled);
    }

    // Show/hide navbar based on scroll direction
    if (scrollY > lastScrollYFromPropRef.current && scrollY > 10) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    lastScrollYFromPropRef.current = scrollY;
  }, [scrollY, treatAsHomePage, scrollOffset, container]);

  // Effect for when scrollY is not provided (uncontrolled scroll)
  useEffect(() => {
    if (scrollY !== undefined || !container) return;

    const handleScroll = () => {
      const heroHeight = container === window ? window.innerHeight : (container as HTMLElement).clientHeight;
      const currentScrollY = container === window ? window.scrollY : (container as HTMLElement).scrollTop;

      // Update background on home page
      if (treatAsHomePage) {
        const threshold = scrollOffset !== undefined ? scrollOffset : heroHeight;
        const isScrolled = currentScrollY > threshold;
        scrolledRef.current = isScrolled;
        setScrolled(isScrolled);
      }

      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 10) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollY, container, treatAsHomePage, scrollOffset]);

  let bgClass = "bg-expery-blue";
  if (treatAsHomePage && !scrolled) {
    bgClass = "bg-transparent";
  }
  const positionClass = absolute ? "absolute" : "fixed";

  return (
    <nav
      className={`${positionClass} top-0 w-full z-50 flex justify-between items-center px-4 py-6 text-white transition-transform duration-300 ${bgClass} ${
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
          <SheetTitle className="flex w-full justify-center mt-8">
            <Image
              src="/logos/original_white.png"
              alt="Logo"
              width={160}
              height={90}
              loading="eager"
            />
          </SheetTitle>
          <div className="flex flex-col gap-8 mt-4 text-xl text-center">
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
      <button
        onClick={() =>
          toast("Línea móvil: +57 3122802986", {
            position: "top-center",
            duration: 5000,
          })
        }
      >
        <Phone className="w-6 h-6 mr-8" />
      </button>
    </nav>
  );
}
