import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ContactSection } from "@/components/home/ContactSection";
import prisma from "@/lib/prisma";
import { HomeDataSchema } from "@/schemas/page-settings";

async function getHomeData() {
  const raw = await prisma.pageSettings.findFirst({ where: { id: "home" } });
  if (!raw) return null;
  return HomeDataSchema.parse(raw.data);
}

export default async function HomePage() {
  const data = await getHomeData();
  if (!data) {
    return (
      <main>
        <p className="text-center py-12">No fue posibles cargar la información de la página principal. Por favor, intente nuevamente más tarde.</p>
      </main>
    );
  }
  const { hero, services, contact } = data;

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