import PropTypes from 'prop-types'
import { useState, createContext } from 'react'

export const Web3ProviderContext = createContext({
  provider: null,
  reset: () => {},
})

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null)

  const initialContext = {
    provider,
    setProvider: value => setProvider(value),
    reset: () => {
      setProvider(null)
    },
  }

  return (
    <Web3ProviderContext.Provider value={initialContext}>
      {children}
    </Web3ProviderContext.Provider>
  )
}

Web3Provider.propTypes = {
  children: PropTypes.node.isRequired,
}
