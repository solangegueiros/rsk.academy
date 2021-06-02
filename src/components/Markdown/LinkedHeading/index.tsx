import { ReactNode } from 'react'

import { chakra, useColorModeValue } from '@chakra-ui/react'

interface LinkedHeadingProps {
  children: ReactNode
  id: string
}

export const LinkedHeading = (props: LinkedHeadingProps): JSX.Element => {
  const color = useColorModeValue('primary.500', 'rsk.text.500')
  return (
    <chakra.h2 data-group='' css={{ scrollMarginBlock: '6.875rem' }} {...props}>
      <span>{props.children}</span>
      {props.id && (
        <chakra.a
          aria-label='anchor'
          color={color}
          fontWeight='normal'
          outline='none'
          _focus={{ opacity: 1, boxShadow: 'outline' }}
          opacity={0}
          _groupHover={{ opacity: 1 }}
          ml='0.375rem'
          href={`#${props.id}`}
        >
          #
        </chakra.a>
      )}
    </chakra.h2>
  )
}
