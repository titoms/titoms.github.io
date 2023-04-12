import React, {useState, useEffect} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store';
import {fadeAnimation, slideAnimation} from '../config/motion'
import {CustomButton} from '../components'

const Portfolio = () => {
  const snap = useSnapshot(state);
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            Portfolio
          </motion.div>

          <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
            <CustomButton 
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Portfolio