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
              loading="lazy"
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
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-tertiary w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl flex flex-col md:flex-row shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center transition-all hover:rotate-90 z-30 border border-white/10"
        >
          <img src={close} alt="close" className="w-5 h-5 object-contain" />
        </button>

        <div className="md:w-3/5 w-full flex flex-col bg-black-200/50">
          <div className="w-full h-[250px] sm:h-[350px] md:h-full min-h-[250px] overflow-hidden relative border-b md:border-b-0 md:border-r border-white/5">
            {activeImg ? (
                <img 
                    src={activeImg} 
                    alt={project.name} 
                    className="w-full h-full object-cover" 
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-secondary italic text-lg">No preview available</div>
            )}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent pointer-events-none md:block hidden" />
        </div>

        <div className="md:w-2/5 w-full flex flex-col p-6 md:p-10 overflow-y-auto custom-scrollbar">
          <div className="flex-1">
            <h2 className="text-white font-bold text-[28px] md:text-[40px] leading-tight mb-4">{project.name}</h2>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag.name} className={`text-[13px] font-medium px-2 py-1 bg-white/5 border border-white/10 rounded-md ${tag.color}`}>#{tag.name}</span>
              ))}
            </div>

            <div className="mt-2">
              <h4 className="text-white/50 uppercase tracking-wider text-[12px] font-semibold mb-2">Overview</h4>
              <p className="text-secondary text-[15px] md:text-[16px] leading-[1.6] font-light">
                {project.longDescription || project.description}
              </p>
            </div>

            {project.images?.length > 1 && (
              <div className="mt-8">
                <h4 className="text-white/50 uppercase tracking-wider text-[12px] font-semibold mb-3">Gallery</h4>
                <div className="flex flex-wrap gap-2">
                    {project.images?.map((img, idx) => (
                    <div 
                        key={idx} 
                        className={`w-20 h-14 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${activeImg === img ? 'border-[#915eff]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                        onClick={() => setActiveImg(img)}
                    >
                        <img src={img} alt={`${project.name}-${idx}`} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/10">
            <button
              onClick={() => window.open(project.source_code_link, "_blank")}
              className="flex-1 bg-white/5 border border-white/10 py-3 px-6 outline-none text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all active:scale-95"
            >
              <img src={github} className="w-5 h-5 object-contain opacity-70" />
              Code
            </button>

            {project.live_link && (
                <button
                    onClick={() => window.open(project.live_link, "_blank")}
                    className="flex-[1.5] bg-[#915eff] py-3 px-6 outline-none text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#804dee] transition-all shadow-lg shadow-[#915eff]/20 active:scale-95 text-center"
                >
                    Live Demo
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
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
