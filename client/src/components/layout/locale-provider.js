/* eslint-disable import/extensions */
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { I18nProvider } from 'next-localization'
import en from '@/translations/en.json'
import es from '@/translations/es-ES.json'
import pt from '@/translations/pt-BR.json'

const LocaleProvider = ({ children }) => {
  const { locale } = useRouter()
  const map = useMemo(() => {
    return { en, 'es-ES': es, 'pt-BR': pt }[locale]
  }, [locale])

  return (
    <I18nProvider lngDict={map} locale={locale}>
      {children}
    </I18nProvider>
  )
}

export default LocaleProvider
