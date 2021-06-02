import { ReactNode } from 'react'

import { Container, Flex, FlexProps } from '@chakra-ui/react'

import { Header, Footer } from '@components'

interface LayoutProps {
  children: ReactNode
  isStretched?: boolean
}

export const Layout = ({ children, isStretched, ...rest }: LayoutProps & FlexProps): JSX.Element => {
  return (
    <>
      <Flex minH='100vh' direction='column' {...rest}>
        <Header />
        <Container
          as={Flex}
          flexDirection='column'
          flex='1'
          px={isStretched ? 0 : 4}
          py={8}
          maxW={isStretched ? 'full' : 1200}
        >
          {children}
        </Container>
      </Flex>
      <Footer />
    </>
  )
}

export default Layout
