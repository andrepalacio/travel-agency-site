"use client"
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-white/10 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: Logo Símbolo */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex justify-center md:justify-start"
        >
          {/* Placeholder del Logo Símbolo */}
          <div className="group cursor-pointer">
            <div className="w-12 h-12 bg-white flex items-center justify-center rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500">
              <span className="text-black -rotate-45 group-hover:-rotate-90 transition-transform font-bold text-xl">ET</span>
            </div>
          </div>
        </motion.div>

        {/* COLUMNA MEDIO: Impacto y Privacidad */}
        <div className="flex flex-col gap-4 text-center md:text-left">
          <p className="text-slate-400 uppercase tracking-[0.2em] text-xs font-semibold">
            Impactando el mundo
          </p>
          <Link 
            href="/docs/politicas-privacidad.pdf" 
            target="_blank"
            className="text-sm hover:text-slate-300 transition-colors underline underline-offset-4 decoration-slate-700"
          >
            Políticas de privacidad, cookies y tratamiento de datos
          </Link>
        </div>

        {/* COLUMNA DERECHA: Derechos y Reservas */}
        <div className="flex flex-col gap-4 text-center md:text-right">
          <p className="text-slate-400 uppercase tracking-[0.2em] text-xs font-semibold">
            @{currentYear} Todos los derechos reservados
          </p>
          <Link 
            href="/docs/politicas-reserva.pdf" 
            target="_blank"
            className="text-sm hover:text-slate-300 transition-colors underline underline-offset-4 decoration-slate-700"
          >
            Políticas de reserva y cancelación
          </Link>
        </div>

      </div>

      {/* Línea decorativa final */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex justify-center">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest">
          Expery Travel — Elevando tu experiencia al infinito
        </p>
      </div>
    </footer>
  );
}