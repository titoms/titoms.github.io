import React from 'react'
import styled from 'styled-components'
import {Tilt} from 'react-tilt'
import {motion} from 'framer-motion'
import {styles} from '../styles'
import {services} from '../config/constants'
import {fadeIn, textVariant} from '../config/motion'
import {SectionWrapper} from '../hoc'

const Section = styled.div`
    height: 100vh;
    padding: 1em;
    color: white;
    scroll-snap-align: center;
`

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
    <Section>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Introduction</p>
          <h2 className={styles.sectionHeadText}>Overview.</h2>
        </motion.div>
        <motion.p 
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-8 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Hey! I'm a skilled Full Stack Web Developer specializing in ReactJS and NodeJS, 
          and a Programming Teacher for Bachelor's and Master's degrees.<br /> 
          I possess both the technical expertise and pedagogical experience 
          required to develop and teach complex web applications that deliver 
          outstanding user experiences. <br /> 
          My portfolio showcases my proficiency 
          in front-end and back-end development using these popular frameworks, 
          as well as other programming languages, frameworks, and platforms.<br />
          I am committed to delivering high-quality, scalable, and user-friendly 
          web solutions that meet the needs of my clients, while also sharing my 
          knowledge and passion for programming with the next generation of developers.
        </motion.p>

        <div className="mt-20 flex justify-center items-center flex-wrap gap-10">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
    </Section>
  )
}

export default SectionWrapper(Who, "about")