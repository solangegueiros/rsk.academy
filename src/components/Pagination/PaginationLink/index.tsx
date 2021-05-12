import { Link, LinkProps, ResponsiveValue, Text, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import { ReactNode } from 'react'

interface PaginationLinkProps {
  label: string
  href: string
  children: ReactNode
  textAlign?: ResponsiveValue<CanvasTextAlign>
  rel: 'prev' | 'next'
}

export const PaginationLink = (props: PaginationLinkProps & LinkProps): JSX.Element => {
  const { label, href, children, textAlign, rel, ...rest } = props

  return (
    <NextLink href={href} passHref>
      <Link
        textAlign={textAlign}
        rel={rel}
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
        <Text mt='1' fontSize='lg' fontWeight='bold' color={useColorModeValue('primary.500', 'light.500')}>
          {children}
        </Text>
      </Link>
    </NextLink>
  )
}
