import PropTypes from 'prop-types'
import { chakra, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export const NavLink = props => {
  const { href, ...rest } = props
  const { pathname } = useRouter()

  const [, group] = href.split('/')
  const isActive = pathname.includes(group)

  return (
    <NextLink href={href} passHref>
      <chakra.a
        aria-current={isActive ? 'page' : undefined}
        display='block'
        py='2'
        px='4'
        borderRadius='full'
        transition='all 0.3s'
        color={useColorModeValue('dark.500', 'dark.50')}
        fontWeight='600'
        _hover={{ bg: useColorModeValue('primary.50', 'whiteAlpha.100') }}
        _activeLink={{
          color: useColorModeValue('white', 'dark.500'),
          bg: useColorModeValue('primary.500', 'light.500'),
        }}
        {...rest}
      />
    </NextLink>
  )
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
}

export default NavLink
