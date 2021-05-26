import { useContext } from 'react'

import { COURSE_ADDRESSES } from '@constants'
import { ContractContext } from '@context/ContractProvider'
import { RLoginResponseContext } from '@context/RLoginProvider'
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
} from '@contracts'
import { useAppDispatch, useAppSelector } from '@store'
import { AdminNameListType, AdminStudentsType, loadAdmin } from '@store/admin/slice'
import { saveProfile, resetProfile } from '@store/profile/slice'
import { getContract, ContractAbiType } from '@utils/getContract'

export function useLoadSmartContracts(): { loadContracts: () => void } {
  const { rLoginResponse } = useContext(RLoginResponseContext)
  const dispatch = useAppDispatch()
  const { account, chainId, isAdmin } = useAppSelector(state => state.identity)
  const { loadContract, resetContracts } = useContext(ContractContext)
  const provider = rLoginResponse?.provider

  const loadContracts = async () => {
    if (provider && chainId) {
      // Load AcademyStudentsSC

      const AcademyStudents = getContract(<ContractAbiType>AcademyStudentsAbi, chainId, provider)
      loadContract(AcademyStudents)

      // Load AcademyWalletSC
      const AcademyWallet = getContract(<ContractAbiType>AcademyWalletAbi, chainId, provider)
      loadContract(AcademyWallet)

      // Load AcademyClassListSC
      const AcademyClassList = getContract(<ContractAbiType>AcademyClassListAbi, chainId, provider)
      loadContract(AcademyClassList)

      // Load AcademyProjectListSC
      const AcademyProjectList = getContract(<ContractAbiType>AcademyProjectListAbi, chainId, provider)
      loadContract(AcademyProjectList)

      // Load MasterNameSC
      const MasterName = getContract(<ContractAbiType>MasterNameAbi, chainId, provider)
      loadContract(MasterName)

      // Load MasterNameSC
      const MasterQuote = getContract(<ContractAbiType>MasterQuoteAbi, chainId, provider)
      loadContract(MasterQuote)

      // Load StudentQuizSC
      const StudentQuiz = getContract(<ContractAbiType>AcademyStudentQuizAbi, chainId, provider)
      loadContract(StudentQuiz)

      // Load Courses
      Object.entries(COURSE_ADDRESSES[chainId]).map(([contractName, courseAddress]) => {
        const Abi = { ...AcademyClassAbi, contractName } as ContractAbiType
        const contract = getContract(Abi, chainId, provider, courseAddress)
        return loadContract(contract)
      })

      let quizResults: Record<string, { total: number; grade: number; attempt: number; answer: string }> = null

      if (account && StudentQuiz.address) {
        const quizNames: string[] = await StudentQuiz.contract.methods.listQuizByStudent(account).call()
        if (quizNames.length > 0) {
          const results: {
            total: number
            grade: number
            attempt: number
            quiz: string
            answer: string
          }[] = await Promise.all(
            quizNames.map(name => StudentQuiz.contract.methods.getStudentQuiz(account, name).call()),
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
        const students: AdminStudentsType[] = await AcademyStudents.contract.methods?.listStudents().call()

        const studentInfos =
          students &&
          (await Promise.all(
            students.map(student => AcademyStudents.contract.methods.getStudentByAddress(student).call()),
          ))

        const nameList: AdminNameListType[] = await MasterName.contract.methods.listNameInfo().call()

        dispatch(loadAdmin({ students: studentInfos, nameList }))
      }

      if (!AcademyStudents.address) {
        console.warn('AcademyStudents contract is not deployed to detected network!')
        return
      }

      // Load StudentProfile
      const studentInfo = await AcademyStudents.contract.methods.getStudentByAddress(account).call()

      if (!studentInfo) {
        console.warn('Student account is not exist!')
        resetContracts()
        dispatch(resetProfile())
        return
      }

      const [index, ownerAddress, portfolioAddress, activeClassAddress, studentClasses] = studentInfo

      if (portfolioAddress === '0x0000000000000000000000000000000000000000') {
        dispatch(resetProfile())
      }

      if (portfolioAddress !== '0x0000000000000000000000000000000000000000') {
        // Load StudentPortfolio
        const StudentPortfolio = getContract(<ContractAbiType>StudentPortfolioAbi, chainId, provider, portfolioAddress)
        loadContract(StudentPortfolio)

        // Load StudentPortfolioList
        const portfolioList = await StudentPortfolio.contract?.methods.listPortfolio().call()

        let studentName = null
        // Load StudentName
        if (portfolioList?.length > 0) {
          const nameProject = portfolioList.find(({ name }) => name === 'Name')
          if (nameProject) {
            const nameProjectAddress = nameProject.projectAddress
            studentName = await MasterName.contract.methods.getName(nameProjectAddress).call()
          }
        }

        // Load AcademyClass
        const AcademyClass = getContract(<ContractAbiType>AcademyClassAbi, chainId, provider, activeClassAddress)
        loadContract(AcademyClass)

        const studentActiveClassName = await AcademyClass.contract?.methods.className().call()
        const classStudentInfo = await AcademyClass.contract?.methods.getStudentByAddress(account).call()

        setTimeout(() => {
          dispatch(
            saveProfile({
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
        }, 2000)
      }
    }
  }
  return { loadContracts }
}
