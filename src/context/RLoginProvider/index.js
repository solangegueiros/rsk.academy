import PropTypes from 'prop-types'
import { useState, createContext } from 'react'

export const RLoginResponseContext = createContext({
  rLoginResponse: null,
  setRLoginResponse: () => {},
  resetResponse: () => {},
})

export const RLoginProvider = ({ children }) => {
  const [rLoginResponse, setRLoginResponse] = useState(null)

  const initialContext = {
    rLoginResponse,
    setRLoginResponse,
    resetResponse: () => {
      if (rLoginResponse) {
        rLoginResponse.provider?.removeAllListeners()
        rLoginResponse.disconnect()
        setRLoginResponse(null)
      }
    },
  }

  return (
    <RLoginResponseContext.Provider value={initialContext}>
      {children}
    </RLoginResponseContext.Provider>
  )
}

RLoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
