"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminSidebar() {
  const pathname = usePathname();

  const sections = [
    { name: "Inicio", href: "/admin/home" },
    { name: "Cruceros", href: "/admin/cruises" },
    { name: "Experiencias", href: "/admin/experiences" },
    { name: "Usuarios", href: "/admin/users" },
  ];

  return (
    <nav className="space-y-1">
      {sections.map((section) => {
        const isActive = pathname === section.href || pathname?.startsWith(section.href + "/");
        return (
          <Link
            key={section.name}
            href={section.href}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
              transition-all duration-200
              ${isActive
                ? "bg-white/15 text-classic-gold border-l-2 border-classic-gold"
                : "text-white/80 hover:bg-white/10 hover:text-white"
              }
            `}
          >
            {section.name}
          </Link>
        );
      })}
    </nav>
  );
}
