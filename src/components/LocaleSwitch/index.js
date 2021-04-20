import { Button, useColorModeValue, ButtonGroup } from '@chakra-ui/react'
import { useRouter } from 'next/router'
export const LocaleSwitch = props => {
  const router = useRouter()
  const { locale, locales } = router
  const colorScheme = useColorModeValue('primary', 'light')

  const handleChange = async lang => {
    await router.push(router.pathname, router.asPath, { locale: lang })
  }

  return (
    <ButtonGroup spacing={0} {...props}>
      {locales.map(code => (
        <Button
          key={code}
          variant={code === locale ? 'flat' : 'ghost'}
          colorScheme={colorScheme}
          onClick={() => handleChange(code)}
          size='xs'
        >
          {code.toUpperCase()}
        </Button>
      ))}
    </ButtonGroup>
  )
}

export default LocaleSwitch
