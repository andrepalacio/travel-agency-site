import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ContactSection } from "@/components/home/ContactSection";

// En producción, esto sería: const data = await db.home.findFirst();
const homeData = {
  hero: {
    shipImageUrl: "/images/crucer-stelar.webp",
    exploreLink: "/experiencias",
    infoLink: "#contacto"
  },
  services: {
    title: "Servicios",
    description: "Conoce los diferentes servicios que tenemos para ofrecerte",
    cards: [
      { id: "1", image: "/images/ser1.jpg", title: "Cenas Estelares" },
      { id: "2", image: "/images/ser2.jpg", title: "Órbita Privada" },
      { id: "3", image: "/images/ser3.jpg", title: "Guías Expertos" },
      { id: "4", image: "/images/ser4.jpg", title: "Eventos VIP" },
    ]
  },
  contact: {
    leftTitle: "Inicia tu viaje",
    leftDescription: "En Expery Travel, no solo vendemos destinos, creamos memorias que trascienden el tiempo y el espacio. Nuestro equipo está listo para asesorarte en cada paso.",
    circleTitle: "Estamos a tu servicio en todo momento",
    socials: [
      { platform: "instagram" as const, label: "Instagram", url: "https://instagram.com/experytravel" },
      { platform: "whatsapp" as const, label: "WhatsApp", url: "https://wa.me/..." },
      { platform: "facebook" as const, label: "Facebook", url: "https://facebook.com/..." }
    ]
  }
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white">
      <main>
        {/* 1. Impacto visual inmediato */}
        <HeroSection data={homeData.hero} />

        {/* 2. Información detallada y funcional */}
        <ServicesSection data={homeData.services} />

        {/* 3. Cierre y conversión (Call to Action) */}
        <ContactSection data={homeData.contact} />
      </main>
    </div>
  );
}