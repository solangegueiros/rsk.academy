import { useRef } from 'react'

import { Box, Flex } from '@chakra-ui/react'

import { RouteType, SidebarContent } from '../SidebarContent'

interface SidebarProps {
  routes: RouteType[]
}

export const Sidebar = ({ routes }: SidebarProps): JSX.Element => {
  const ref = useRef(null)

  return (
    <Flex flexDir='column' display={{ base: 'none', md: 'block' }}>
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
        <SidebarContent routes={routes} contentRef={ref} />
      </Box>
    </Flex>
  )
}
