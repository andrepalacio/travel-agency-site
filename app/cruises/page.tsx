import { CruiseCard } from "@/components/cruises/CruiseCard";

const cruises = [
  {
    id: "1",
    name: "Nebulosa Prime",
    description: "Nuestro buque insignia diseñado para travesías de larga distancia con suites de 360 grados y gastronomía molecular estelar.",
    imageUrl: "/ships/nebula.jpg",
    ctaText: "Consultar disponibilidad",
    externalLink: "/contacto"
  },
  {
    id: "2",
    name: "Odisea de Plata",
    description: "Especializado en expediciones científicas de lujo. Cuenta con el observatorio más avanzado de la flota civil.",
    imageUrl: "/ships/silver.jpg",
    ctaText: "Solicitar itinerario 2026",
    externalLink: "/contacto"
  },
  {
    id: "3",
    name: "Eclipse Zen",
    description: "Enfoque total en el bienestar. Spas de gravedad cero y meditación guiada bajo las auroras de Júpiter.",
    imageUrl: "/ships/zen.jpg",
    ctaText: "Hablar con un especialista",
    externalLink: "/contacto"
  }
];

export default function CruisesPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="pt-40 pb-20 text-center">
        <h1 className="text-6xl font-bold tracking-tighter uppercase italic">Nuestra Flota</h1>
        <p className="text-slate-400 mt-4 tracking-widest uppercase text-sm">Ingeniería de vanguardia para exploradores modernos</p>
      </header>

      <main className="pb-20">
        {cruises.map((cruise, index) => (
          <CruiseCard key={cruise.id} data={cruise} index={index} />
        ))}
      </main>
    </div>
  );
}