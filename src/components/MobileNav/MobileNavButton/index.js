import { forwardRef } from 'react'
import { IconButton, useColorModeValue } from '@chakra-ui/react'
import { AiOutlineMenu } from 'react-icons/ai'

export const MobileNavButton = forwardRef(function MobileNavButton(props, ref) {
  return (
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
})
