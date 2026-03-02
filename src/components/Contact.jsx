import { motion } from 'framer-motion'
import { InlineWidget } from 'react-calendly'
import { styles } from '../styles'
import { EarthCanvas } from '../canvas'
import { SectionWrapper } from '../hoc'
import { slideIn } from '../config/motion'

const CALENDLY_URL = "https://calendly.com/christophe-crognier/30min";

const Contact = () => {
  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn('left', "tween", 0.2, 1)}
        className="flex-[0.5] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Let's work together</p>
        <h3 className={styles.sectionHeadText}>Book a Call.</h3>
        <p className="mt-4 mb-2 text-secondary text-[15px] leading-[1.7]">
          Schedule a free 30-minute discovery call — no commitment, just a conversation about what you're building.
        </p>
        <InlineWidget
          url={CALENDLY_URL}
          styles={{ height: "660px", minWidth: "320px" }}
          pageSettings={{
            backgroundColor: "050816",
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: "915eff",
            textColor: "ffffff",
          }}
        />
      </motion.div>
      <motion.div
        variants={slideIn('right', "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact")
