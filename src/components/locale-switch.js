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

  const colorScheme = useColorModeValue('rsk.green', 'rsk.dark')
  const bg = useColorModeValue('white', 'rsk.dark.500')

  const handleChange = async lang => {
    await router.push(router.pathname, router.asPath, { locale: lang })
    onToggle()
  }

  return (
    <Box {...props} pos='relative'>
      <Button
        colorScheme={colorScheme}
        onClick={onToggle}
        boxSize='40px'
        rounded='full'
      >
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
                colorScheme={colorScheme}
                bg={bg}
                my={2}
                boxSize='40px'
                rounded='full'
                variant='outline'
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
