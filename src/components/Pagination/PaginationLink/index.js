import PropTypes from 'prop-types'
import { Link, Text, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'

export const PaginationLink = props => {
  const { label, href, children, ...rest } = props

  return (
    <NextLink href={href} passHref>
      <Link
        _hover={{
          textDecor: 'none',
        }}
        flex='1'
        borderRadius='md'
        {...rest}
      >
        <Text fontSize='sm' px='2'>
          {label}
        </Text>
        <Text
          mt='1'
          fontSize='lg'
          fontWeight='bold'
          color={useColorModeValue('primary.500', 'light.500')}
        >
          {children}
        </Text>
      </Link>
    </NextLink>
  )
}

PaginationLink.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node,
}
