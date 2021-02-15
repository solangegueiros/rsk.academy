import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { I18nProvider } from 'next-localization'

import { translations } from '@/translations/index'

export const LocaleProvider = ({ children }) => {
  const { locale, defaultLocale } = useRouter()
  const map = useMemo(() => {
    return translations[locale] || translations[defaultLocale]
  }, [locale, defaultLocale])

  return (
    <I18nProvider lngDict={map} locale={locale}>
      {children}
    </I18nProvider>
  )
}

LocaleProvider.propTypes = {
  children: PropTypes.number.isRequired,
}

export default LocaleProvider
