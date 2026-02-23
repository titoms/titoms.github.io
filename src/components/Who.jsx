import React from 'react'
import {Tilt} from 'react-tilt'
import {motion} from 'framer-motion'
import {styles} from '../styles'
import {services} from '../config/constants'
import {fadeIn, textVariant} from '../config/motion'
import {SectionWrapper} from '../hoc'

const ServiceCard = ({index, title, icon}) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div 
        variants={fadeIn('right', "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div 
          options={{
            max: 45,
            scale: 1,
            speed: 450
          }}
          className="bg-tertiary rounded-[20px] py-5, px-12 min-h-[280px] 
          flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt={title} className="w-16 h-16 object-contain"/>
          <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const Who = () => {
  return (
    <section>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Introduction</p>
          <h2 className={styles.sectionHeadText}>Overview.</h2>
        </motion.div>
        <motion.p 
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-8 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          I'm a Full-Stack Web Developer with experience building scalable web applications using React, Node.js and modern DevOps practices.
          With a background both in professional software development and higher-education teaching (+7000 hours of training), I bring a strong ability to structure complex ideas, design clear architectures, and communicate efficiently with technical and non-technical stakeholders.
          I specialize in developing production-ready platforms, interactive applications, and AI-assisted systems, combining robust engineering principles with modern development workflows to deliver reliable and maintainable products.
        </motion.p>

        <div className="mt-20 flex justify-center items-center flex-wrap gap-10">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
    </section>
  )
}

export default SectionWrapper(Who, "about")