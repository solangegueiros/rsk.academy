import { HTMLMotionProps, motion } from 'framer-motion'

export const PageTransition = (props: HTMLMotionProps<'div'>): JSX.Element => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} {...props} />
)

export default PageTransition
