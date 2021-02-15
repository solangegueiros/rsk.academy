import { motion } from 'framer-motion'

export const PageTransition = props => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} {...props} />
)

export default PageTransition
