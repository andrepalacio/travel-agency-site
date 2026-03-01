"use client"
import { Menu, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

export function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-6 bg-transparent text-white">
      {/* LADO IZQUIERDO: Menú */}
      <Sheet>
        <SheetTrigger>
          <Menu className="w-8 h-8 cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left" className="w-72 bg-expery-blue text-white border-none">
          <div className="flex flex-col gap-8 mt-16 text-xl text-center">
            <Link href="/">Inicio</Link>
            <Link href="/cruises">Cruceros</Link>
            <Link href="/experiences">Experiencias</Link>
          </div>
        </SheetContent>
      </Sheet>

      {/* CENTRO: Logo */}
      <div className="font-bold text-2xl tracking-tighter italic">
        EXPERY <span className="font-light text-slate-400">TRAVEL</span>
      </div>

      {/* DERECHA: Soporte */}
      <button onClick={() => alert("Soporte: +57 300...")}>
        <Phone className="w-6 h-6" />
      </button>
    </nav>
  );
}