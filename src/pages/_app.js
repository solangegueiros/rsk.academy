import PropTypes from 'prop-types'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider as ReduxProvider } from 'react-redux'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import store from '@/store/store'
import theme from '@/theme/index'
import siteConfig from '@/configs/site-config'
import { Web3Provider } from '@/context/Web3Provider'
import { ContractProvider } from '@/context/ContractProvider'

const LocaleProvider = dynamic(() => import('../components/LocaleProvider'))

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest/' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#000000' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='theme-color' content='#fff' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap'
          rel='stylesheet'
        />
      </Head>
      <DefaultSeo {...siteConfig.seo} />
      <LocaleProvider>
        <ReduxProvider store={store}>
          <Web3Provider>
            <ContractProvider>
              <ChakraProvider theme={theme}>
                <Component {...pageProps} />
              </ChakraProvider>
            </ContractProvider>
          </Web3Provider>
        </ReduxProvider>
      </LocaleProvider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pageProps: PropTypes.object,
}

export default MyApp
