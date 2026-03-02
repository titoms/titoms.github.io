import React, { useState } from "react";
import { Tilt } from "react-tilt";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../config/constants";
import { fadeIn, textVariant } from "../config/motion";
import CaseStudyModal from "./CaseStudyModal";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  onClick,
}) => {
  return (
    <div className="flex-shrink-0">
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full cursor-pointer h-[520px] flex flex-col"
      >
        <div className="relative w-full h-[230px]" onClick={onClick}>
          {image ? (
            <img
              src={image}
              alt="project_image"
              className="w-full h-full object-cover rounded-2xl"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-[#090325] flex items-center justify-center rounded-2xl">
              <p className="text-secondary text-[14px] italic">No image available</p>
            </div>
          )}

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={(e) => {
                e.stopPropagation();
                window.open(source_code_link, "_blank");
              }}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex-1 flex flex-col overflow-hidden" onClick={onClick}>
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px] line-clamp-4">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 justify-between items-end" onClick={onClick}>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className={`text-[14px] ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
          </div>
          <span className="text-[#915eff] text-[13px] font-semibold whitespace-nowrap">
            Case Study →
          </span>
        </div>
      </Tilt>
    </div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const duplicatedProjects = [...projects, ...projects, ...projects];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcase my skills and experience through
          real-world examples. Click any project to read the full case study —
          including the problem, architecture, and results.
        </motion.p>
      </div>

      <div className="mt-20 overflow-hidden relative group">
        <div className="flex gap-7 animate-loop-scroll group-hover:paused items-stretch py-10">
          {duplicatedProjects.map((project, index) => (
            <ProjectCard
              key={`project-${index}`}
              index={index}
              {...project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-primary to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-primary to-transparent pointer-events-none z-10" />
      </div>

      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes loop-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-360px * ${projects.length} - 1.75rem * ${projects.length})); }
        }
        .animate-loop-scroll {
          animation: loop-scroll 40s linear infinite;
          width: max-content;
        }
        .paused {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
};

export default SectionWrapper(Projects, "projects");
