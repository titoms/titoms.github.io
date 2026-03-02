import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { close, github } from "../assets";
import { CALENDLY_URL } from "../config/constants";

const SectionTitle = ({ label }) => (
  <h4 className="text-[#915eff] uppercase tracking-widest text-[11px] font-semibold mb-3">
    {label}
  </h4>
);

const CaseStudyModal = ({ project, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (selectedImage) setSelectedImage(null);
        else onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, selectedImage]);

  if (!project) return null;

  const { name, tags, image, source_code_link, live_link, caseStudy } = project;

  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed inset-0 z-[1000] flex flex-col bg-primary"
      >
        {/* Nav bar */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 bg-primary border-b border-white/5">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white text-[14px] font-semibold px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back
          </button>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all hover:rotate-90"
          >
            <img src={close} alt="close" className="w-4 h-4 object-contain" />
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* HERO */}
          <div className="relative w-full h-[50vh] min-h-[280px] overflow-hidden">
            {image ? (
              <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#090325]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-16 max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span
                    key={tag.name}
                    className={`text-[12px] font-medium px-2 py-1 bg-white/10 border border-white/10 rounded-md ${tag.color}`}
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
              <h1 className="text-white font-black text-[36px] sm:text-[56px] leading-tight">
                {name}
              </h1>
              {caseStudy?.tagline && (
                <p className="mt-2 text-[#dfd9ff] text-[16px] sm:text-[18px] font-light">
                  {caseStudy.tagline}
                </p>
              )}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 sm:px-16 py-16 space-y-16">
            {/* Standard sections */}
            {caseStudy?.problem && (
              <section>
                <SectionTitle label="The Problem" />
                <p className="text-secondary text-[17px] leading-[1.8]">{caseStudy.problem}</p>
              </section>
            )}

            {caseStudy?.context && (
              <section>
                <SectionTitle label="Context" />
                <p className="text-secondary text-[17px] leading-[1.8]">{caseStudy.context}</p>
              </section>
            )}

            {caseStudy?.technicalChallenges?.length > 0 && (
              <section>
                <SectionTitle label="Technical Challenges" />
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  {caseStudy.technicalChallenges.map((challenge, i) => (
                    <div key={i} className="bg-[#090325]/60 border border-white/5 rounded-xl p-5">
                      <div className="w-7 h-7 rounded-full bg-[#915eff]/20 flex items-center justify-center mb-3">
                        <span className="text-[#915eff] text-[12px] font-bold">{i + 1}</span>
                      </div>
                      <p className="text-secondary text-[14px] leading-[1.7]">{challenge}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {caseStudy?.architecture && (
              <section>
                <SectionTitle label="Architecture" />
                <p className="text-secondary text-[17px] leading-[1.8]">{caseStudy.architecture}</p>
              </section>
            )}

            {caseStudy?.implementation && (
              <section>
                <SectionTitle label="Implementation" />
                <p className="text-secondary text-[17px] leading-[1.8]">{caseStudy.implementation}</p>
              </section>
            )}

            {caseStudy?.results?.length > 0 && (
              <section>
                <SectionTitle label="Results" />
                <div className="grid sm:grid-cols-3 gap-4 mt-4">
                  {caseStudy.results.map((result, i) => (
                    <div key={i} className="bg-[#090325]/60 border border-[#915eff]/20 rounded-xl p-5 flex items-center justify-center">
                      <p className="text-white text-[14px] leading-[1.7] font-medium text-center">{result}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {caseStudy?.lessonsLearned?.length > 0 && (
              <section>
                <SectionTitle label="Lessons Learned" />
                <ul className="space-y-3 mt-4">
                  {caseStudy.lessonsLearned.map((lesson, i) => (
                    <li key={i} className="flex gap-3 text-secondary text-[15px] leading-[1.7]">
                      <span className="text-[#915eff] mt-1 flex-shrink-0">→</span>
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {tags?.length > 0 && (
              <section>
                <SectionTitle label="Tech Stack" />
                <div className="flex flex-wrap gap-3 mt-4">
                  {tags.map((tag) => (
                    <span key={tag.name} className={`text-[14px] font-semibold px-4 py-2 bg-white/5 border border-white/10 rounded-full ${tag.color}`}>
                      {tag.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Project Gallery */}
            {project.images?.length > 0 && (
              <section>
                <div className="border-t border-white/5 pt-16" />
                <SectionTitle label="Project Gallery" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                  {project.images.map((img, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedImage(img)}
                      className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#090325] aspect-video cursor-zoom-in"
                    >
                      <img
                        src={img}
                        alt={`${name} preview ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-[12px] border border-white/20">
                          Click to expand
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <section className="border-t border-white/10 pt-16 pb-8">
              <SectionTitle label="Interested in a similar project?" />
              <h2 className="text-white font-black text-[32px] sm:text-[48px] leading-tight mb-4">
                Let's build something<br />
                <span className="text-[#915eff]">together.</span>
              </h2>
              <p className="text-secondary text-[17px] mb-8 max-w-lg">
                Book a free 30-minute discovery call. No commitment — just a conversation about what you're building.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="bg-[#915eff] py-4 px-8 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#804dee] transition-all shadow-lg shadow-[#915eff]/20 active:scale-95">
                  Book a Call
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
                  </svg>
                </a>
                <button onClick={() => window.open(source_code_link, "_blank")} className="bg-white/5 border border-white/10 py-4 px-6 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all active:scale-95">
                  <img src={github} className="w-5 h-5 opacity-70" alt="github" />
                  View Code
                </button>
                {live_link && (
                  <button onClick={() => window.open(live_link, "_blank")} className="bg-white/5 border border-white/10 py-4 px-6 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all active:scale-95">
                    Try it now →
                  </button>
                )}
              </div>
            </section>
          </div>
        </div>
      </motion.div>

      {/* LIGHTBOX PORTAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/95 p-4 sm:p-10 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-full max-h-full overflow-auto custom-scrollbar rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="w-auto h-auto max-w-[95vw] max-h-[90vh] object-contain shadow-2xl rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white transition-all border border-white/10"
              >
                <img src={close} alt="close" className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
    , document.body
  );
};

export default CaseStudyModal;
