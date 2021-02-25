import PropTypes from 'prop-types'
import { useRef } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { SidebarContent } from '../SidebarContent'

export const Sidebar = ({ routes }) => {
  const { pathname } = useRouter()
  const ref = useRef(null)

  return (
    <Flex flexDir='column' display={{ base: 'none', md: 'block' }} w='320px'>
      <Box
        pos='sticky'
        top='9rem'
        ref={ref}
        as='nav'
        aria-label='Main Navigation'
        sx={{
          overscrollBehavior: 'contain',
        }}
        overflowY='auto'
        flexShrink={0}
        p='4'
        h='calc(100vh - 10rem);'
      >
        <SidebarContent routes={routes} pathname={pathname} contentRef={ref} />
      </Box>
    </Flex>
  )
}

Sidebar.propTypes = {
  routes: PropTypes.array.isRequired,
}

export default Sidebar
