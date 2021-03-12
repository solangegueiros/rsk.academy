import { forwardRef } from 'react'
import { isValidMotionProp, motion } from 'framer-motion'
import { Box } from '@chakra-ui/react'

const MotionBox = motion.custom(
  // eslint-disable-next-line react/display-name
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key)),
    )
    return <Box ref={ref} {...chakraProps} />
  }),
)

export const PageTransition = props => (
  <MotionBox
    flex='1'
    h='full'
    d='flex'
    flexDir='column'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    {...props}
  />
)

export default PageTransition
