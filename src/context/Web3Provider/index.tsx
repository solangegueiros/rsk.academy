import { createContext, ReactNode, Dispatch, useReducer } from 'react'

import { Web3Provider } from '@ethersproject/providers'
import { Signer } from 'ethers'

export enum Types {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type InitialStateType = {
  isLoggedIn: boolean
  rLoginResponse: any | null
  web3Provider: Web3Provider
  signer: Signer
  setRLoginResponse: Dispatch<any>
  setWeb3Provider: Dispatch<any>
  setSigner: Dispatch<any>
  resetRloginResponse: () => void
  resetWeb3Provider: () => void
}

type LoginPayload = {
  rLoginResponse: any
  web3Provider: Web3Provider
  signer: Signer
}

type Web3ContextType = InitialStateType & {
  logout?: () => void
  login?: (payload: LoginPayload) => void
}

const initialState = {
  isLoggedIn: false,
  rLoginResponse: null,
  web3Provider: null,
  signer: null,
  setRLoginResponse: () => null,
  setWeb3Provider: () => null,
  setSigner: () => null,
  resetRloginResponse: () => null,
  resetWeb3Provider: () => null,
}

export type Actions = { type: Types.LOGIN; payload: LoginPayload } | { type: Types.LOGOUT }

export const reducer = (state: InitialStateType, action: Actions): InitialStateType => {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        rLoginResponse: action.payload.rLoginResponse,
        web3Provider: action.payload.web3Provider,
        signer: action.payload.signer,
      }
    case Types.LOGOUT:
      state.rLoginResponse?.provider?.removeAllListeners()
      state.rLoginResponse?.disconnect()
      state.web3Provider?.removeAllListeners()
      return initialState
    default:
      return state
  }
}

export const Web3Context = createContext<Web3ContextType>({
  ...initialState,
  login: () => null,
  logout: () => null,
})

export const RLoginProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = (payload: LoginPayload) => dispatch({ type: Types.LOGIN, payload })
  const logout = () => dispatch({ type: Types.LOGOUT })

  return <Web3Context.Provider value={{ ...state, login, logout }}>{children}</Web3Context.Provider>
}
