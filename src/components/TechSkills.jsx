import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { technologies } from "../config/constants";
import { fadeIn, textVariant } from "../config/motion";

const SkillBadge = ({ icon, name, index }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center p-4 bg-tertiary rounded-full shadow-card cursor-pointer group relative"
    >
      <motion.div
        animate={{
          y: [0, -10, 0, 10, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 4 + (index % 3),
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2,
        }}
        whileHover={{ scale: 1.3, zIndex: 10 }}
        className="w-full h-full flex items-center justify-center"
      >
        <img
          src={icon}
          alt={name}
          className="w-full h-full object-contain"
        />
      </motion.div>
      
      {/* Tooltip on hover */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black-100 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
        <p className="text-white text-[12px] font-medium">{name}</p>
      </div>
    </motion.div>
  );
};

const TechSkills = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My technical stack</p>
        <h2 className={styles.sectionHeadText}>Technical Skills.</h2>
      </motion.div>

      <div className="mt-20 flex flex-wrap justify-center gap-10 sm:gap-14">
        {technologies.map((tech, index) => (
          <SkillBadge 
            key={tech.name} 
            index={index} 
            {...tech} 
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(TechSkills, "skills");
