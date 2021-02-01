import { Box, Container } from '@chakra-ui/react'

import { Header } from '@/components/index'

export const Layout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Container maxW={1200}>{children}</Container>
    </Box>
  )
}

export default Layout
