import { motion } from 'framer-motion'
import { InlineWidget } from 'react-calendly'
import { styles } from '../styles'
import { EarthCanvas } from '../canvas'
import { SectionWrapper } from '../hoc'
import { slideIn } from '../config/motion'
import { CALENDLY_URL } from '../config/constants'
import { colors } from '../config/tokens'

const Contact = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-0">
      {/* Calendly panel — left on desktop, full width on mobile */}
      <motion.div
        variants={slideIn('left', "tween", 0.2, 1)}
        className="relative z-10 w-full lg:w-[62%] lg:flex-shrink-0 bg-surface/90 backdrop-blur-sm p-8 rounded-2xl border border-white/5 shadow-2xl"
      >
        <p className={styles.sectionSubText}>Let's work together</p>
        <h3 className={styles.sectionHeadText}>Book a Call.</h3>
        <p className="mt-4 mb-2 text-secondary text-[15px] leading-[1.7]">
          Schedule a free 30-minute discovery call — no commitment, just a conversation about what you're building.
        </p>
        <InlineWidget
          url={CALENDLY_URL}
          styles={{ height: "600px", width: "100%" }}
          pageSettings={{
            backgroundColor: colors.bgSurface.slice(1),
            hideEventTypeDetails: true,
            hideLandingPageDetails: true,
            primaryColor: colors.brand.slice(1),
            textColor: colors.textPrimary.slice(1),
          }}
        />
      </motion.div>

      {/* Earth canvas — right on desktop (with overlap), below on mobile */}
      <motion.div
        variants={slideIn('right', "tween", 0.2, 1)}
        className="w-full h-[400px] lg:flex-1 lg:-ml-[8%] lg:h-[800px] opacity-80"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact")
