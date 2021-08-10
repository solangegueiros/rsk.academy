import { forwardRef } from 'react'

import { IconButton, IconButtonProps, useColorModeValue } from '@chakra-ui/react'
import { AiOutlineMenu } from 'react-icons/ai'

type Props = IconButtonProps
type Ref = HTMLButtonElement

const MobileNavButton = (props, ref) => (
  <IconButton
    ref={ref}
    display={{ base: 'flex', md: 'none' }}
    aria-label='Open menu'
    fontSize='20px'
    color={useColorModeValue('gray.800', 'inherit')}
    variant='ghost'
    icon={<AiOutlineMenu />}
    {...props}
  />
)

export const MobileNavButtonWithRef = forwardRef<Ref, Props>(MobileNavButton)
