import {
  Box,
  useDisclosure,
  Collapse,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const LocaleSwitch = props => {
  const router = useRouter()
  const { locale, locales } = router
  const { isOpen, onToggle } = useDisclosure()

  const bg = useColorModeValue('white', 'dark.500')

  const handleChange = async lang => {
    await router.push(router.pathname, router.asPath, { locale: lang })
    onToggle()
  }

  return (
    <Box {...props} pos='relative'>
      <Button variant='normal' onClick={onToggle} boxSize='40px' rounded='full'>
        {locale.toUpperCase()}
      </Button>
      <Collapse in={isOpen}>
        <Box pos='absolute' zIndex='modal'>
          {locales
            .filter(lang => lang !== locale)
            .map(code => (
              <Button
                key={code}
                onClick={() => handleChange(code)}
                bg={bg}
                my={2}
                boxSize='40px'
                rounded='full'
                variant='inversed'
              >
                {code.toUpperCase()}
              </Button>
            ))}
        </Box>
      </Collapse>
    </Box>
  )
}

export default LocaleSwitch
