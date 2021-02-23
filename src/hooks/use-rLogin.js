/* eslint-disable max-lines-per-function */
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  login,
  logout,
  changeAccount,
  changeChainId,
  setChainError,
} from '@/store/identity/actions'
import { Web3ProviderContext } from '@/context/Web3Provider'
import { ContractContext } from '@/context/ContractProvider'
import { loadProfile } from '@/store/profile/actions'
import { getContract } from '@/utils/get-contract'
import {
  AcademyClassAbi,
  AcademyStudentsAbi,
  MasterNameAbi,
  StudentPortfolioAbi,
} from '../contracts'
import { useWeb3 } from './use-web3'

export const useRLogin = () => {
  const {
    account,
    chainId,
    error,
    isUnsupportedChainError,
    supportedChains,
  } = useSelector(state => state.identity)
  const web3Context = useContext(Web3ProviderContext)
  const { loadContract } = useContext(ContractContext)
  const web3 = useWeb3()
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(!!web3Context?.provider)

  useEffect(() => {
    if (isLoggedIn && chainId) {
      const isSupportedChain = !supportedChains.includes(chainId)
      dispatch(setChainError(isSupportedChain))
    }
  }, [chainId, isLoggedIn])

  useEffect(() => {
    setIsLoggedIn(!!web3Context?.provider)
  }, [web3Context])

  useEffect(() => {
    if (account && chainId) {
      ;(async function loadSmartContracts() {
        // Load AcademyStudentsSC
        const AcademyStudents = getContract(AcademyStudentsAbi, chainId, web3)
        loadContract(AcademyStudents)

        if (!AcademyStudents.address) {
          console.log('AcademyStudent is not deployed to detected network!')
          return
        }

        // Load MasterNameSC
        const MasterName = getContract(MasterNameAbi, chainId, web3)
        loadContract(MasterName)

        // Load StudentProfile
        const studentInfo = await AcademyStudents.contract.methods
          .getStudentByAddress(account)
          .call()

        if (studentInfo) {
          const [
            index,
            ownerAddress,
            portfolioAddress,
            activeClassAddress,
            studentClasses,
          ] = studentInfo

          // Load StudentPortfolio
          const StudentPortfolio = getContract(
            StudentPortfolioAbi,
            chainId,
            web3,
            portfolioAddress,
          )
          loadContract(StudentPortfolio)

          // Load StudentPortfolioList
          let portfolioList = null
          if (StudentPortfolio.contract) {
            portfolioList = await StudentPortfolio.contract.methods
              .listPortfolio()
              .call()
          }

          // Load AcademyClass
          const AcademyClass = getContract(
            AcademyClassAbi,
            chainId,
            web3,
            activeClassAddress,
          )
          loadContract(AcademyClass)

          let studentActiveClassName = null
          let classStudentInfo = null
          if (AcademyClass.contract) {
            studentActiveClassName = await AcademyClass.contract.methods
              .className()
              .call()
            classStudentInfo = await AcademyClass.contract.methods
              .getStudentByAddress(account)
              .call()
          }

          // Load StudentName
          let studentName = null
          if (portfolioList?.length > 0) {
            const nameProject = portfolioList.find(
              ({ name }) => name === 'Name',
            )
            if (nameProject) {
              const nameProjectAddress = nameProject.projectAddress
              studentName = await MasterName.contract.methods
                .getName(nameProjectAddress)
                .call()
            }
          }

          dispatch(
            loadProfile({
              index,
              ownerAddress,
              portfolioAddress,
              activeClassAddress,
              studentClasses,
              portfolioList,
              studentActiveClassName,
              classStudentInfo,
              studentName,
            }),
          )
        }
      })()
    }
  }, [account, chainId])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false
      window.ethereum.on('accountsChanged', accounts => {
        if (isLoggedIn) {
          dispatch(changeAccount({ account: accounts[0] }))
        }
      })
      window.ethereum.on('chainChanged', networkId => {
        dispatch(changeChainId({ chainId: networkId }))
      })
    }
  }, [])

  const activate = () => dispatch(login(web3Context))
  const deactivate = () => dispatch(logout(web3Context))

  return {
    account,
    chainId,
    isUnsupportedChainError,
    activate,
    deactivate,
    isLoggedIn,
    error,
  }
}
