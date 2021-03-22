import { Button, useColorModeValue, ButtonGroup } from '@chakra-ui/react'
import { useRouter } from 'next/router'
export const LocaleSwitch = props => {
  const router = useRouter()
  const { locale, locales } = router
  const color = useColorModeValue('white', 'dark.500')
  const bg = useColorModeValue('primary.500', 'light.500')

  const handleChange = async lang => {
    await router.push(router.pathname, router.asPath, { locale: lang })
  }

  return (
    <ButtonGroup isAttached {...props}>
      {locales.map(code => (
        <Button
          key={code}
          color={code === locale && color}
          bg={code === locale && bg}
          _hover={{ bg: null }}
          _active={{ bg: null }}
          onClick={() => handleChange(code)}
          variant='ghost'
          size='xs'
        >
          {code.toUpperCase()}
        </Button>
      ))}
    </ButtonGroup>
  )
}

export default LocaleSwitch
