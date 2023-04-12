import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { CustomButton } from '../components';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion'

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation('left')}>
          <motion.header {...slideAnimation('down')}>
            <img 
              src='./threejs.png'
              alt='Logo'
              className='logo w-8 h-8 object-contain'
            />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET'S <br className="x1:block hidden"/> DO IT.
              </h1>
            </motion.div>

            <motion.div 
            {...headContentAnimation}
            className="flex flex-col gap-5"
            >
              <p className="max-w-d font-normal text-gray-600 text-base">
                Hi there 👋, I'm Christophe Crognier. <br className=""/>
                <strong>Full Stack Developper</strong> & <strong>Web Development Teacher</strong>
              </p>

              <CustomButton 
                type="filled"
                title="Learn More"
                handleClick={() => state.intro = false}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home