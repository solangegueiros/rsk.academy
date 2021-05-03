import { useState, createContext, ReactNode, Dispatch } from 'react'

type RLoginContextType = {
  rLoginResponse: any | null
  setRLoginResponse: Dispatch<any>
  resetResponse: () => void
}

export const RLoginResponseContext = createContext<RLoginContextType>({
  rLoginResponse: null,
  setRLoginResponse: () => null,
  resetResponse: () => null,
})

export const RLoginProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [rLoginResponse, setRLoginResponse] = useState<any | null>(null)

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

  return <RLoginResponseContext.Provider value={initialContext}>{children}</RLoginResponseContext.Provider>
}
