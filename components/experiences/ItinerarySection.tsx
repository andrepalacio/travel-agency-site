import Image from "next/image";
import { DetailedExperience } from "@/types/experience";

export function ItinerarySection({ data }: Readonly<{ data: DetailedExperience['itinerary'] }>) {
  return (
    <section className="bg-slate-50 py-24 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-[#D4AF37] uppercase tracking-[0.3em] font-bold mb-8">{data.goldMessage}</p>
        <div className="relative h-[500px] w-full rounded-3xl overflow-hidden mb-12">
          <Image src={data.mainImage} alt="Travel" fill className="object-cover" />
        </div>
        
        {/* Ruta */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20 border-y border-slate-200 py-10">
          <div className="text-center">
            <p className="text-xs uppercase text-slate-400">Salida</p>
            <p className="font-bold text-lg">{data.departure}</p>
          </div>
          <div className="h-[1px] w-20 bg-[#D4AF37] hidden md:block" />
          <div className="text-center">
            <p className="text-xs uppercase text-slate-400">Llegada</p>
            <p className="font-bold text-lg">{data.arrival}</p>
          </div>
        </div>

        <div className="w-full h-[400px] relative rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
          <Image src={data.mapImage} alt="Mapa" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}