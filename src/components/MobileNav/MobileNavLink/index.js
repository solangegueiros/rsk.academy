import PropTypes from 'prop-types'
import { Center, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

export const MobileNavLink = ({ href, children }) => {
  const { pathname } = useRouter()

  const [, group] = href.split('/')
  const isActive = pathname.includes(group)

  const bg = useColorModeValue('primary.500', 'light.500')
  const color = useColorModeValue('white', 'dark.500')
  const activeHoverBg = useColorModeValue('primary.500', 'dark.500')
  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.100')

  return (
    <NextLink href={href}>
      <Center
        flex='1'
        minH='40px'
        as='button'
        rounded='md'
        transition='0.2s all'
        fontWeight={isActive ? '600' : '400'}
        bg={isActive ? bg : undefined}
        borderWidth={isActive ? undefined : '1px'}
        color={isActive ? color : undefined}
        _hover={{
          bg: isActive ? activeHoverBg : hoverBg,
        }}
      >
        {children}
      </Center>
    </NextLink>
  )
}

MobileNavLink.propTypes = {
  children: PropTypes.number.isRequired,
  href: PropTypes.string.isRequired,
}
