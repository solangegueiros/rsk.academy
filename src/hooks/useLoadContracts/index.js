/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import { useCallback, useContext } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { useWeb3 } from '../useWeb3'

export function useLoadSmartContracts() {
  const web3 = useWeb3()
  const dispatch = useDispatch()
  const { account, chainId, isAdmin } = useSelector(state => state.identity)
  const { loadContract, resetContracts } = useContext(ContractContext)

  const loadContracts = useCallback(async () => {
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
    const AcademyProjectList = getContract(AcademyProjectListAbi, chainId, web3)
    loadContract(AcademyProjectList)

    // Load MasterNameSC
    const MasterName = getContract(MasterNameAbi, chainId, web3)
    loadContract(MasterName)

    // Load MasterNameSC
    const MasterQuote = getContract(MasterQuoteAbi, chainId, web3)
    loadContract(MasterQuote)

    // Load StudentQuizSC
    const StudentQuiz = getContract(AcademyStudentQuizAbi, chainId, web3)
    loadContract(StudentQuiz)

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
    const portfolioList = await StudentPortfolio.contract?.methods
      .listPortfolio()
      .call()

    // Load AcademyClass
    const AcademyClass = getContract(
      AcademyClassAbi,
      chainId,
      web3,
      activeClassAddress,
    )
    loadContract(AcademyClass)

    const studentActiveClassName = await AcademyClass.contract?.methods
      .className()
      .call()
    const classStudentInfo = await AcademyClass.contract?.methods
      .getStudentByAddress(account)
      .call()

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
        quizResults,
      }),
    )
  }, [chainId, account, isAdmin])

  return { loadContracts }
}
