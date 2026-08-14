import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EditableText } from "./EditableText";
import { EditableImage } from "./EditableImage";
import { EditableTags } from "./EditableTags";
import { Trash2, X, ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
}

interface ProjectCarouselProps {
  projects: Project[];
  isAdminMode: boolean;
  onUpdateProject: (id: string, key: string, value: any) => void;
  onDeleteProject: (id: string) => void;
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  projects,
  isAdminMode,
  onUpdateProject,
  onDeleteProject,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const selectedProject = projects.find((p) => p.id === selectedId);

  return (
    <div className="w-full relative py-12" style={{ perspective: '1000px' }}>
      {/* Navigation Controls */}
      {!selectedId && projects.length > 0 && (
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 z-20 pointer-events-none">
          <button 
            onClick={prevProject}
            className="w-12 h-12 rounded-full border border-surface-border bg-surface flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors pointer-events-auto shadow-2xl"
          >
            <ChevronLeft />
          </button>
          <button 
            onClick={nextProject}
            className="w-12 h-12 rounded-full border border-surface-border bg-surface flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors pointer-events-auto shadow-2xl"
          >
            <ChevronRight />
          </button>
        </div>
      )}

      {/* Carousel Container */}
      <div className="relative h-[400px] md:h-[500px] flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        {projects.map((project, idx) => {
          // Calculate offset from active index
          let offset = idx - activeIndex;
          if (offset > Math.floor(projects.length / 2)) offset -= projects.length;
          if (offset < -Math.floor(projects.length / 2)) offset += projects.length;

          // Only render visible cards for performance
          const isVisible = Math.abs(offset) <= 2;
          if (!isVisible && projects.length > 5) return null;

          const isCenter = offset === 0;
          const zIndex = 10 - Math.abs(offset);
          const xPos = offset * 60; // Spread out horizontally
          const zPos = -Math.abs(offset) * 100; // Push back
          const rotateY = offset * -15; // Angle slightly

          return (
            <motion.div
              key={project.id}
              layoutId={`card-${project.id}`}
              initial={false}
              animate={{
                x: `${xPos}%`,
                z: zPos,
                rotateY: rotateY,
                scale: isCenter ? 1 : 0.9,
                opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.3,
                zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              onClick={() => {
                if (isCenter) {
                  setSelectedId(project.id);
                } else {
                  setActiveIndex(idx);
                }
              }}
              className={`absolute w-full max-w-[320px] md:max-w-[450px] h-[350px] md:h-[450px] bg-surface border border-surface-border rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl ${
                isCenter ? "hover:border-primary/50" : "grayscale opacity-50"
              } transition-colors duration-500`}
            >
              <div className="absolute inset-0 bg-[#000]">
                <EditableImage 
                  value={project.image || ""} 
                  onChange={(v) => isCenter && onUpdateProject(project.id, "image", v)}
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  fallbackInitials={project.title.substring(0, 2).toUpperCase()}
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end text-left pointer-events-none">
                <motion.h3 layoutId={`title-${project.id}`} className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {project.title}
                </motion.h3>
                <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest font-bold">
                  {isCenter ? "Click to expand →" : ""}
                </p>
              </div>

              {isAdminMode && isCenter && (
                <button 
                  onClick={(e) => { e.stopPropagation(); onDeleteProject(project.id); }} 
                  className="absolute top-4 right-4 p-2 bg-[#111] text-red-500 rounded-full border border-red-500/20 hover:bg-red-500 hover:text-black transition-colors z-50 pointer-events-auto"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Modal View */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-background/90 backdrop-blur-xl pointer-events-auto cursor-pointer"
              onClick={() => setSelectedId(null)}
            />
            
            <motion.div
              layoutId={`card-${selectedProject.id}`}
              className="w-full max-w-4xl max-h-[90vh] bg-surface border border-surface-border rounded-[2rem] overflow-hidden flex flex-col pointer-events-auto relative z-10 shadow-[0_0_100px_rgba(229,168,139,0.1)] custom-scrollbar"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-white hover:text-primary transition-colors z-50"
              >
                <X size={20} />
              </button>

              <div className="w-full h-64 md:h-96 relative bg-black flex-shrink-0">
                <EditableImage 
                  value={selectedProject.image || ""} 
                  onChange={(v) => onUpdateProject(selectedProject.id, "image", v)}
                  className="w-full h-full object-cover"
                  fallbackInitials={selectedProject.title.substring(0, 2).toUpperCase()}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
              </div>

              <div className="p-8 md:p-12 -mt-20 relative z-20 flex-1 overflow-y-auto">
                <motion.div layoutId={`title-${selectedProject.id}`}>
                  <EditableText 
                    as="h2" 
                    value={selectedProject.title} 
                    onChange={(v) => onUpdateProject(selectedProject.id, "title", v)}
                    className="text-4xl md:text-6xl font-black text-white tracking-tighter"
                  />
                </motion.div>

                <div className="mt-8">
                  <EditableTags 
                    tags={selectedProject.tags || []} 
                    onChange={(newTags) => onUpdateProject(selectedProject.id, "tags", newTags)} 
                    className="gap-3"
                  />
                </div>

                <div className="mt-8 border-t border-surface-border pt-8">
                  <EditableText 
                    as="p" 
                    multiline
                    value={selectedProject.description} 
                    onChange={(v) => onUpdateProject(selectedProject.id, "description", v)}
                    className="text-gray-300 text-lg leading-relaxed font-serif"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
