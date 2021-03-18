/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import { useCallback, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  AcademyClassAbi,
  AcademyStudentQuizAbi,
  AcademyStudentsAbi,
  MasterNameAbi,
  StudentPortfolioAbi,
  AcademyClassListAbi,
  AcademyProjectListAbi,
  AcademyWalletAbi,
  MasterQuoteAbi,
} from '@/contracts/index'
import { loadProfile, resetProfile } from '@/store/profile/actions'
import { loadAdmin } from '@/store/admin/actions'
import { getContract } from '@/utils/getContract'
import { ContractContext } from '@/context/ContractProvider'
import { COURSES } from '@/constants/constants'
import { Web3ProviderContext } from '@/context/Web3Provider'

export function useLoadSmartContracts() {
  const { provider } = useContext(Web3ProviderContext)
  const dispatch = useDispatch()
  const { account, chainId, isAdmin } = useSelector(state => state.identity)
  const { loadContract, resetContracts } = useContext(ContractContext)

  const loadContracts = useCallback(async () => {
    // Load AcademyStudentsSC
    const AcademyStudents = getContract(AcademyStudentsAbi, chainId, provider)
    loadContract(AcademyStudents)

    // Load AcademyWalletSC
    const AcademyWallet = getContract(AcademyWalletAbi, chainId, provider)
    loadContract(AcademyWallet)

    // Load AcademyClassListSC
    const AcademyClassList = getContract(AcademyClassListAbi, chainId, provider)
    loadContract(AcademyClassList)

    // Load AcademyProjectListSC
    const AcademyProjectList = getContract(
      AcademyProjectListAbi,
      chainId,
      provider,
    )
    loadContract(AcademyProjectList)

    // Load MasterNameSC
    const MasterName = getContract(MasterNameAbi, chainId, provider)
    loadContract(MasterName)

    // Load MasterNameSC
    const MasterQuote = getContract(MasterQuoteAbi, chainId, provider)
    loadContract(MasterQuote)

    // Load StudentQuizSC
    const StudentQuiz = getContract(AcademyStudentQuizAbi, chainId, provider)
    loadContract(StudentQuiz)

    // Load Courses
    Object.entries(COURSES).map(([contractName, courseAddress]) => {
      const Abi = { ...AcademyClassAbi, contractName }
      const contract = getContract(Abi, chainId, provider, courseAddress)
      console.log(`contract`, contract)
      return loadContract(contract)
    })

    let quizResults = null
    if (account && StudentQuiz.address) {
      const quizNames = await StudentQuiz.contract.methods
        .listQuizByStudent(account)
        .call()
      if (quizNames.length > 0) {
        const results = await Promise.all(
          quizNames.map(name =>
            StudentQuiz.contract.methods.getStudentQuiz(account, name).call(),
          ),
        )

        if (results) {
          quizResults = results.reduce((obj, result) => {
            const { total, grade, attempt, quiz, answer } = result
            obj[quiz] = {
              total,
              grade,
              attempt,
              answer,
            }
            return obj
          }, {})
        }
      }
    }

    // Load Admin
    if (isAdmin && AcademyStudents.abi.networks[chainId]) {
      const students = await AcademyStudents.contract.methods
        ?.listStudents()
        .call()

      const studentInfos = await Promise.all(
        students?.map(student =>
          AcademyStudents.contract.methods.getStudentByAddress(student).call(),
        ),
      )

      const nameList = await MasterName.contract.methods.listNameInfo().call()

      dispatch(loadAdmin({ students: studentInfos, nameList }))
    }

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

    if (portfolioAddress !== '0x0000000000000000000000000000000000000000') {
      // Load StudentPortfolio
      const StudentPortfolio = getContract(
        StudentPortfolioAbi,
        chainId,
        provider,
        portfolioAddress,
      )
      loadContract(StudentPortfolio)

      // Load StudentPortfolioList
      const portfolioList = await StudentPortfolio.contract?.methods
        .listPortfolio()
        .call()

      let studentName = null
      // Load StudentName
      if (portfolioList?.length > 0) {
        const nameProject = portfolioList.find(({ name }) => name === 'Name')
        if (nameProject) {
          const nameProjectAddress = nameProject.projectAddress
          studentName = await MasterName.contract.methods
            .getName(nameProjectAddress)
            .call()
        }
      }

      // Load AcademyClass
      const AcademyClass = getContract(
        AcademyClassAbi,
        chainId,
        provider,
        activeClassAddress,
      )
      loadContract(AcademyClass)

      const studentActiveClassName = await AcademyClass.contract?.methods
        .className()
        .call()
      const classStudentInfo = await AcademyClass.contract?.methods
        .getStudentByAddress(account)
        .call()

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
          quizResults,
        }),
      )
    }
  }, [chainId, account, isAdmin])

  return { loadContracts }
}
