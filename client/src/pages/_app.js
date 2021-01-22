import { ChakraProvider } from '@chakra-ui/react'
import { Provider as ReduxProvider } from 'react-redux'
import { DefaultSeo } from 'next-seo'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import store from '@/store/store'
import theme from '@/theme/index'
import siteConfig from '@/configs/site-config'
import dynamic from 'next/dynamic'

const LocaleProvider = dynamic(() =>
  import('../components/layout/locale-provider'),
)
// Will be called once for every metric that has to be reported.
export function reportWebVitals(metric) {
  // eslint-disable-next-line no-console
  console.log('__METRIC__', metric)
}

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

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <>
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
