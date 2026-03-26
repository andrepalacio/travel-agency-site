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
    <div className="section-container-tight">
      <div className="section-content-wrapper">
        
        <header className="mb-16">
          <div>
            <h1 className="title-h1">Experiencias</h1>
            <motion.div 
              className="divider-bar"
              animate={{ width: [80, 310, 80] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </header>

        {/* Grilla Dinámica */}
        <div className="grid-responsive">
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