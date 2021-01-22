import { Box } from '@chakra-ui/react'
import React from 'react'
import Header from './header'

const Layout = ({ children }) => {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  )
}

export default Layout
