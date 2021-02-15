import PropTypes from 'prop-types'
import { chakra, Icon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FiExternalLink } from 'react-icons/fi'
import NextLink from 'next/link'

export const Navigate = props => {
  const { locale } = useRouter()
  const MDX_PATHS = ['/courses/', '/blog/']

  const isExternalLink = props.href?.[0] !== '/'
  const isMarkdownPage = MDX_PATHS.some(path => props.href?.includes(path))
  const to = isMarkdownPage ? `${props.href}/${locale}` : props.href

  if (isExternalLink) {
    return (
      <chakra.a apply='mdx.a' target='_blank' {...props}>
        {props.children}{' '}
        <Icon transform='translateY(-2px)' as={FiExternalLink} />
      </chakra.a>
    )
  }

  return (
    <NextLink href={to}>
      <chakra.a apply='mdx.a' {...props} />
    </NextLink>
  )
}

Navigate.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.number.isRequired,
}
