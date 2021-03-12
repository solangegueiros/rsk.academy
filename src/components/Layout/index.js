import PropTypes from 'prop-types'
import { Container, Flex } from '@chakra-ui/react'

import { Header, Footer } from '@/components/all'
import { Transactions } from '../Transactions'

export const Layout = ({ children, isStretched, ...rest }) => {
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
      <Transactions />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isStretched: PropTypes.bool,
}

export default Layout
