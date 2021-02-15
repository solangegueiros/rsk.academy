import { Container, Flex } from '@chakra-ui/react'

import { Header } from '@/components/index'

export const Layout = ({ children, fluid, ...rest }) => {
  return (
    <Flex minH='100vh' direction='column' {...rest}>
      <Header />
      <Container
        as={Flex}
        flexDirection='column'
        flex='1'
        px={fluid && 0}
        maxW={fluid ? 'full' : 1200}
      >
        {children}
      </Container>
    </Flex>
  )
}

export default Layout
