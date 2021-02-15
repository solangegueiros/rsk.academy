import PropTypes from 'prop-types'
import { Box, useUpdateEffect } from '@chakra-ui/react'
import { useElementScroll } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export const ScrollView = props => {
  const { onScroll, ...rest } = props
  const [y, setY] = useState(0)
  const elRef = useRef()
  const { scrollY } = useElementScroll(elRef)

  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  useUpdateEffect(() => {
    onScroll?.(y > 5)
  }, [y])

  return (
    <Box
      ref={elRef}
      flex='1'
      id='routes'
      overflow='auto'
      px='6'
      pb='6'
      {...rest}
    />
  )
}

ScrollView.propTypes = {
  onScroll: PropTypes.func,
}
