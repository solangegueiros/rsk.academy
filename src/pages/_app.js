import { ChakraProvider } from '@chakra-ui/react'
import { Provider as ReduxProvider } from 'react-redux'
import { DefaultSeo } from 'next-seo'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import store from '@/store/store'
import theme from '@/theme/index'
import siteConfig from '@/configs/site-config'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const LocaleProvider = dynamic(() => import('../components/locale-provider'))

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 15000
  // Fix transaction format  error from etherjs getTransactionReceipt as transactionReceipt format
  // checks root to be a 32 bytes hash when on RSK its 0x01
  const format = library?.formatter.formats
  if (format) format.receipt.root = format.receipt.logsBloom
  Object.assign(library?.formatter, { format })

  return library
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link rel='icon' type='image/png' sizes='96x96' href='/favicon.png' />
        <meta name='theme-color' content='#fff' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap'
          rel='stylesheet'
        />
      </Head>
      <DefaultSeo {...siteConfig.seo} />
      <LocaleProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <ReduxProvider store={store}>
            <ChakraProvider theme={theme}>
              <Component {...pageProps} />
            </ChakraProvider>
          </ReduxProvider>
        </Web3ReactProvider>
      </LocaleProvider>
    </>
  )
}

export default MyApp
