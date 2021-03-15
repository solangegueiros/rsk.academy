import PropTypes from 'prop-types'
import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

export const SidebarCategory = props => {
  const {
    isMobile,
    title,
    selected,
    opened,
    children,
    contentRef,
    ...rest
  } = props

  const ref = useRef(null)

  const [{ toggle, shouldScroll = false }, setToggle] = useState({
    toggle: selected || opened,
  })

  // If a category is selected indirectly, open it. This can happen when using the search input
  useEffect(() => {
    if (selected) {
      setToggle({ toggle: true, shouldScroll: true })
    }
  }, [selected])

  // Navigate to the start of the category when manually opened
  useEffect(() => {
    if (!ref.current || !contentRef?.current) return
    if (toggle && shouldScroll) {
      const contentEl = contentRef.current

      if (toggle == true && contentEl) {
        // 10 is added for better margin
        const height =
          ref.current.offsetTop - (isMobile ? 10 : contentEl.offsetTop)
        contentEl.scrollTop = height
        setToggle({ toggle })
      }
    }
  }, [toggle, shouldScroll, isMobile, contentRef])

  return (
    <Box mt='8' ref={ref} {...rest}>
      <Text
        width='full'
        textTransform='uppercase'
        letterSpacing='wider'
        fontSize='xs'
        fontWeight='bold'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        userSelect='none'
        color={useColorModeValue('dark.100', 'dark.200')}
      >
        {title}
      </Text>
      <Box role='group' hidden={!toggle} mt={2} mx='-3'>
        {children}
      </Box>
    </Box>
  )
}

SidebarCategory.propTypes = {
  isMobile: PropTypes.bool,
  title: PropTypes.string,
  selected: PropTypes.bool,
  opened: PropTypes.bool,
  children: PropTypes.node.isRequired,
  contentRef: PropTypes.shape({
    current: PropTypes.any,
  }),
}

export default SidebarCategory
