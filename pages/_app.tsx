import { ChakraProvider } from '@chakra-ui/react'
import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider as ReduxProvider } from 'react-redux'

import siteConfig from '@configs/site-config'
import { ContractProvider } from '@context/ContractProvider'
import { RLoginProvider } from '@context/Web3Provider'
import store from '@store'
import { theme } from '@theme'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest/' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#000000' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <meta name='theme-color' content='#fff' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href='https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap' rel='stylesheet' />
      </Head>
      <DefaultSeo {...siteConfig.seo} />
      <ReduxProvider store={store}>
        <RLoginProvider>
          <ContractProvider>
            <ChakraProvider theme={theme}>
              <Component {...pageProps} />
            </ChakraProvider>
          </ContractProvider>
        </RLoginProvider>
      </ReduxProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
