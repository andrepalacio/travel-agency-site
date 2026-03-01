import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { Experience } from "@/types/experience";

// Mock de datos (esto vendría de tu Context/DB)
const experiencesData: Experience[] = [
  { id: '1', slug: 'lujo-estelar', title: 'Experiencia Galáctica Premium', imageUrl: '/exp1.jpg', isFeatured: true },
  { id: '2', slug: 'orbita-relax', title: 'Relajación en Órbita', imageUrl: '/exp2.jpg', isFeatured: false },
  { id: '3', slug: 'cena-nebulosa', title: 'Cenas en la Nebulosa', imageUrl: '/exp3.jpg', isFeatured: false },
  { id: '4', slug: 'tour-anillos', title: 'Tour por los Anillos', imageUrl: '/exp4.jpg', isFeatured: false },
];

export default function ExperienciasPage() {
  return (
    <div className="min-h-screen bg-white pt-40 pb-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado de la página */}
        <header className="mb-16">
          <h1 className="text-5xl font-bold tracking-tighter uppercase italic">Experiencias</h1>
          <div className="w-20 h-1 bg-black mt-4" />
        </header>

        {/* Grilla Dinámica */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {experiencesData.map((exp, index) => (
            <ExperienceCard 
              key={exp.id} 
              exp={exp} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}