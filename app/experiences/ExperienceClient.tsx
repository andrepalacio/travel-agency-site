"use client";

import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { Experience } from "@/types/experience";
import { motion } from "framer-motion";

interface Props {
  readonly experiences: readonly Experience[];
}

export function ExperiencesClient({ experiences }: Props) {
  const numColSpan = (experiences.length === 5 || experiences.length === 3) ? 3 : 2;

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-16">
          <div>
            <h1 className="text-6xl font-bold tracking-tighter">Experiencias</h1>
            <motion.div 
              className="w-20 h-1 bg-black mt-4"
              animate={{ width: [80, 310, 80] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </header>

        {/* Grilla Dinámica */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {experiences.map((exp, index) => (
            <ExperienceCard 
              key={exp.id} 
              exp={exp} 
              index={index}
              span={numColSpan}
            />
          ))}
        </div>
      </div>
    </div>
  );
}