import { Center, Spinner } from '@chakra-ui/react'

import { useAppSelector } from '@store'

export const Loader = (): JSX.Element => {
  const { isProfileLoading } = useAppSelector(state => state.profile)

  return isProfileLoading ? (
    <Center zIndex='popover' position='fixed' top={0} left={0} h='100vh' w='100vw' bg='dark.500'>
      <Spinner thickness='6px' speed='2s' emptyColor='whiteAlpha.400' color='white' w={24} h={24} />
    </Center>
  ) : null
}
