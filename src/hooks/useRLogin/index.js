/* eslint-disable max-statements */
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
import { loadProfile, resetProfile } from '@/store/profile/actions'
import { getContract } from '@/utils/getContract'
import {
  AcademyClassAbi,
  AcademyStudentsAbi,
  MasterNameAbi,
  StudentPortfolioAbi,
  AcademyClassListAbi,
  AcademyProjectListAbi,
  AcademyWalletAbi,
  MasterQuoteAbi,
} from '@/contracts/index'
import { useWeb3 } from '@/hooks/useWeb3'

export const useRLogin = () => {
  const {
    account,
    chainId,
    isAdmin,
    error,
    isUnsupportedChainError,
    supportedChains,
  } = useSelector(state => state.identity)
  const web3Context = useContext(Web3ProviderContext)
  const { loadContract, resetContracts } = useContext(ContractContext)
  const web3 = useWeb3()
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(!!web3Context?.provider)

  useEffect(() => {
    setIsLoggedIn(!!web3Context?.provider)
  }, [web3Context])

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

    if (account && chainId) {
      const isSupportedChain = !supportedChains.includes(chainId)
      dispatch(setChainError(isSupportedChain))
      ;(async function loadSmartContracts() {
        // Load AcademyStudentsSC
        const AcademyStudents = getContract(AcademyStudentsAbi, chainId, web3)
        loadContract(AcademyStudents)

        // Load AcademyWalletSC
        const AcademyWallet = getContract(AcademyWalletAbi, chainId, web3)
        loadContract(AcademyWallet)

        // Load AcademyClassListSC
        const AcademyClassList = getContract(AcademyClassListAbi, chainId, web3)
        loadContract(AcademyClassList)

        // Load AcademyProjectListSC
        const AcademyProjectList = getContract(
          AcademyProjectListAbi,
          chainId,
          web3,
        )
        loadContract(AcademyProjectList)

        // Load MasterNameSC
        const MasterName = getContract(MasterNameAbi, chainId, web3)
        loadContract(MasterName)

        // Load MasterNameSC
        const MasterQuote = getContract(MasterQuoteAbi, chainId, web3)
        loadContract(MasterQuote)

        if (!AcademyStudents.address) {
          console.warn(
            'AcademyStudents contract is not deployed to detected network!',
          )
          return
        }

        // Load StudentProfile
        const studentInfo = await AcademyStudents.contract.methods
          .getStudentByAddress(account)
          .call()

        if (!studentInfo) {
          console.warn('Student account is not exist!')
          resetContracts()
          dispatch(resetProfile())
          return
        }

        const [
          index,
          ownerAddress,
          portfolioAddress,
          activeClassAddress,
          studentClasses,
        ] = studentInfo

        if (ownerAddress === '0x0000000000000000000000000000000000000000') {
          dispatch(resetProfile())
          return
        }

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
          const nameProject = portfolioList.find(({ name }) => name === 'Name')
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
      })()
    }
  }, [account, chainId, isLoggedIn])

  const activate = () => dispatch(login(web3Context))
  const deactivate = () => dispatch(logout(web3Context))

  return {
    account,
    chainId,
    isAdmin,
    isUnsupportedChainError,
    activate,
    deactivate,
    isLoggedIn,
    error,
  }
}
