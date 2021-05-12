import { ReactNode } from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'

import { Header, Footer, Container } from '@components'

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
          py={8}
          px={isStretched ? 0 : { base: '2', md: '6' }}
          maxW={isStretched ? 'full' : 1440}
        >
          {children}
        </Container>
      </Flex>
      <Footer />
    </>
  )
}

export default Layout