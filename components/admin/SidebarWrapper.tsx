'use client';

import { useState, useEffect, useTransition } from 'react';
import { usePathname } from 'next/navigation';

export function SidebarWrapper({ children }: { readonly children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();
  const pathname = usePathname();

  // Cerrar sidebar al navegar en móvil
  useEffect(() => {
    startTransition(() => {
      setOpen(false);
    });
  }, [pathname]);

  return (
    <>
      {/* Botón hamburguesa móvil */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 bg-expery-blue rounded-lg text-white shadow-lg hover:bg-expery-blue/90 transition-colors"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

    {/* Overlay para móvil */}
        {open && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar fijo - siempre fixed, nunca se desplaza */}
        <aside
          className={`
            fixed top-0 left-0 z-40 w-72 h-screen bg-expery-blue shadow-xl p-6
            flex flex-col overflow-y-auto
            transition-transform duration-300 ease-in-out
            ${open ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 md:w-[20%] md:shadow-none
          `}
        >
          {children}
        </aside>
    </>
  );
}
