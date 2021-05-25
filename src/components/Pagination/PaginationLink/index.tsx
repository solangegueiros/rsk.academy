import { HStack, Link, LinkProps, ResponsiveValue, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import { ReactNode } from 'react'

interface PaginationLinkProps {
  href: string
  children: ReactNode
  textAlign?: ResponsiveValue<CanvasTextAlign>
  rel: 'prev' | 'next'
}

export const PaginationLink = (props: PaginationLinkProps & LinkProps): JSX.Element => {
  const { href, children, rel, ...rest } = props
  const color = useColorModeValue('primary.500', 'light.500')

  return (
    <NextLink href={href} passHref>
      <Link
        as={HStack}
        role='group'
        p={4}
        w='full'
        borderWidth={2}
        borderColor='transparent'
        rel={rel}
        borderRadius='md'
        fontWeight='bold'
        color={color}
        _hover={{
          textDecor: 'none',
          borderColor: color,
        }}
        {...rest}
      >
        {children}
      </Link>
    </NextLink>
  )
}
