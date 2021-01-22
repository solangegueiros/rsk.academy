import { Image, Box, useDisclosure, Collapse } from '@chakra-ui/react'
import { useI18n } from 'next-localization'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const LanguageSwitcher = props => {
  const router = useRouter()
  const { locale, locales } = router
  const { isOpen, onToggle } = useDisclosure()
  const i18n = useI18n()

  const handleChange = async lang => {
    await router.push(router.pathname, router.asPath, { locale: lang })
    onToggle()
  }

  useEffect(() => {
    const changeLang = async () => {
      if (locale === 'en') {
        i18n.set('en', await import('../../translations/en.json'))
      } else if (locale === 'es-ES') {
        i18n.set('es-ES', await import('../../translations/es-ES.json'))
      } else if (locale === 'pt-BR') {
        i18n.set('pt-BR', await import('../../translations/pt-BR.json'))
      }
      i18n.locale(locale)
    }
    changeLang()
  }, [locale])

  return (
    <Box {...props} pos='relative'>
      <Image
        cursor='pointer'
        onClick={onToggle}
        boxSize='40px'
        src={`/img/${locale}.svg`}
        alt={locale}
      />
      <Collapse in={isOpen}>
        <Box pos='absolute' zIndex='modal'>
          {locales
            .filter(lang => lang !== locale)
            .map(code => (
              <Image
                key={code}
                onClick={() => handleChange(code)}
                cursor='pointer'
                my={2}
                boxSize='40px'
                src={`/img/${code}.svg`}
                alt={code}
              />
            ))}
        </Box>
      </Collapse>
    </Box>
  )
}

export default LanguageSwitcher
