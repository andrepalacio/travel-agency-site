import { NavBar } from "@/components/global/NavBar";
import { Footer } from "@/components/global/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ContactSection } from "@/components/home/ContactSection";
import { useEditor } from "@/context/EditorContext";

export function HomePreview() {
  const { data } = useEditor();
  return (
    <div className="w-full h-full overflow-y-auto bg-white">
      <NavBar />
      <main>
        <HeroSection data={data.hero} />
        <ServicesSection data={data.services} />
        <ContactSection data={data.contact} />
      </main>
      <Footer />
    </div>
  );
}