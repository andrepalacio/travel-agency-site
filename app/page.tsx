import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ContactSection } from "@/components/home/ContactSection";
import prisma from "@/lib/prisma";
import { HomeDataSchema } from "@/schemas/page-settings";

async function getHomeData() {
  const raw = await prisma.pageSettings.findFirst({ where: { id: "home" } });
  if (!raw) throw new Error("No se encontró la configuración del home.");
  return HomeDataSchema.parse(raw.data);
}

export default async function HomePage() {
  const { hero, services, contact } = await getHomeData();

  return (
    <div className="relative min-h-screen">
      <main>
        <HeroSection data={hero} />
        <ServicesSection data={services} />
        <ContactSection data={contact} />
      </main>
    </div>
  );
}