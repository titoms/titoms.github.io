import { motion } from 'framer-motion'
import { InlineWidget } from 'react-calendly'
import { styles } from '../styles'
import { EarthCanvas } from '../canvas'
import { SectionWrapper } from '../hoc'
import { slideIn } from '../config/motion'
import { CALENDLY_URL } from '../config/constants'

const Contact = () => {
  return (
    <div className="relative min-h-[900px] flex flex-col items-center overflow-hidden">
      {/* Earth as full background */}
      <motion.div
        variants={slideIn('right', "tween", 0.2, 1)}
        className="absolute inset-0 opacity-70"
      >
        <EarthCanvas />
      </motion.div>

      {/* Calendly panel — centered on top of the Earth */}
      <motion.div
        variants={slideIn('left', "tween", 0.2, 1)}
        className="relative z-10 w-full max-w-3xl mx-auto mt-8 bg-[#100d25]/90 backdrop-blur-sm p-8 rounded-2xl border border-white/5 shadow-2xl"
      >
        <p className={styles.sectionSubText}>Let's work together</p>
        <h3 className={styles.sectionHeadText}>Book a Call.</h3>
        <p className="mt-4 mb-2 text-secondary text-[15px] leading-[1.7]">
          Schedule a free 30-minute discovery call — no commitment, just a conversation about what you're building.
        </p>
        <InlineWidget
          url={CALENDLY_URL}
          styles={{ height: "660px", width: "100%" }}
          pageSettings={{
            backgroundColor: "100d25",
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: "915eff",
            textColor: "ffffff",
          }}
        />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact")
