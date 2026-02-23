import React, { useState, useEffect } from "react";
import { Tilt } from "react-tilt";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { github, close } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../config/constants";
import { fadeIn, textVariant } from "../config/motion";

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
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full cursor-pointer h-[520px] flex flex-col'
      >
        <div className='relative w-full h-[230px]' onClick={onClick}>
          {image ? (
            <img
              src={image}
              alt='project_image'
              className='w-full h-full object-cover rounded-2xl'
            />
          ) : (
            <div className='w-full h-full bg-black-200 flex items-center justify-center rounded-2xl'>
               <p className='text-secondary text-[14px] italic'>No image available</p>
            </div>
          )}

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div
              onClick={(e) => {
                e.stopPropagation();
                window.open(source_code_link, "_blank");
              }}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-5 flex-1 flex flex-col overflow-hidden' onClick={onClick}>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px] line-clamp-4'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2' onClick={onClick}>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  const [activeImg, setActiveImg] = useState(project?.image);

  useEffect(() => {
    setActiveImg(project?.image);
    
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [project]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-tertiary w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-3xl flex flex-col md:flex-row gap-8 p-6 md:p-10 shadow-2xl custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 bg-black-200 rounded-full flex items-center justify-center hover:bg-black-100 transition-all hover:rotate-90 z-20"
        >
          <img src={close} alt="close" className="w-6 h-6 object-contain" />
        </button>

        <div className="flex-[2] flex flex-col gap-6">
          <div 
            className="w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden bg-black-200 border border-white/5 relative"
          >
            {activeImg ? (
                <img 
                    src={activeImg} 
                    alt={project.name} 
                    className="w-full h-full object-cover bg-black-100" 
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-secondary italic text-lg">No preview available</div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3 pb-2 custom-scrollbar overflow-x-auto">
              {project.images?.map((img, idx) => (
              <div 
                  key={idx} 
                  className={`w-28 h-20 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${activeImg === img ? 'border-[#915eff] scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  onClick={() => setActiveImg(img)}
              >
                  <img src={img} alt={`${project.name}-${idx}`} className="w-full h-full object-cover" />
              </div>
              ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <h2 className="text-white font-bold text-[32px] md:text-[45px] leading-tight">{project.name}</h2>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag.name} className={`text-[15px] font-medium px-3 py-1 bg-black-200 rounded-lg ${tag.color}`}>#{tag.name}</span>
            ))}
          </div>

          <div className="mt-8 flex-1">
            <h4 className="text-white font-bold text-[22px] border-b border-white/10 pb-2">Overview</h4>
            <p className="mt-4 text-secondary text-[17px] leading-[1.8] font-light">
              {project.longDescription || project.description}
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
            <button
              onClick={() => window.open(project.source_code_link, "_blank")}
              className="bg-black-200 py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-2xl flex items-center gap-3 hover:bg-black-100 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              <img src={github} className="w-6 h-6 object-contain" />
              Source Code
            </button>

            {project.live_link && (
                <button
                    onClick={() => window.open(project.live_link, "_blank")}
                    className="bg-[#915eff] py-3 px-10 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-2xl flex items-center gap-3 hover:bg-[#804dee] transition-all transform hover:-translate-y-1 active:scale-95"
                >
                    Try it !
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
                </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const duplicatedProjects = [...projects, ...projects, ...projects];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 overflow-hidden relative group'>
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
          <ProjectModal 
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
