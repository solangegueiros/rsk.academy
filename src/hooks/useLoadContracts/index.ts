/* eslint-disable camelcase */
import { useContext } from 'react'
import { saveProfile, resetProfile } from '@store/profile/slice'
import { AdminNameListType, AdminStudentsType, loadAdmin } from '@store/admin/slice'
import { ContractContext } from '@context/ContractProvider'
import { CONTRACT_ADDRESSES } from '@constants/constants'
import { RLoginResponseContext } from '@context/RLoginProvider'
import { useAppDispatch, useAppSelector } from '@store/store'
import {
  AcademyClassListFactory,
  AcademyClassFactory,
  AcademyProjectListFactory,
  AcademyStudentQuizFactory,
  AcademyStudentsFactory,
  AcademyStudentsType,
  AcademyWalletFactory,
  MasterNameFactory,
  StudentPortfolioFactory,
  AcademyClassDevFactory,
  AcademyClassBusinessFactory,
} from '@type_chain'
import { ethers } from 'ethers'

export function useLoadSmartContracts(): { loadContracts: () => void } {
  const { rLoginResponse } = useContext(RLoginResponseContext)
  const dispatch = useAppDispatch()
  const { account, chainId, isAdmin } = useAppSelector(state => state.identity)
  const { loadContract, resetContracts } = useContext(ContractContext)
  const prv = rLoginResponse?.provider
  const provider = prv && new ethers.providers.Web3Provider(prv)

  const loadContracts = async () => {
    if (provider && chainId) {
      // Load AcademyStudentsSC

      const AcademyStudents: AcademyStudentsType = AcademyStudentsFactory.connect(CONTRACT_ADDRESSES[chainId].AcademyStudents, provider)
      loadContract("AcademyStudents", AcademyStudents)

      // Load AcademyWalletSC
      const AcademyWallet = AcademyWalletFactory.connect(CONTRACT_ADDRESSES[chainId].AcademyWallet, provider)
      loadContract("AcademyWallet", AcademyWallet)

      // Load AcademyClassListSC
      const AcademyClassList = AcademyClassListFactory.connect(CONTRACT_ADDRESSES[chainId].AcademyClassList, provider)
      loadContract("AcademyClassList", AcademyClassList)

      // Load AcademyProjectListSC
      const AcademyProjectList = AcademyProjectListFactory.connect(
        CONTRACT_ADDRESSES[chainId].AcademyProjectList,
        provider,
      )
      loadContract("AcademyProjectList", AcademyProjectList)

      // Load MasterNameSC
      const MasterName = MasterNameFactory.connect(CONTRACT_ADDRESSES[chainId].MasterName, provider)
      loadContract("MasterName", MasterName)

      // Load StudentQuizSC
      const StudentQuiz = AcademyStudentQuizFactory.connect(CONTRACT_ADDRESSES[chainId].AcademyStudentQuiz, provider)
      loadContract("StudentQuiz", StudentQuiz)

      // Load Courses
      const Developer = AcademyClassDevFactory.connect(CONTRACT_ADDRESSES[chainId].Developer, provider)
      loadContract('Developer', Developer)
      const Business = AcademyClassBusinessFactory.connect(CONTRACT_ADDRESSES[chainId].Business, provider)
      loadContract('Business', Business)

      let quizResults: Record<string, { total: number; grade: number; attempt: number; answer: string }> = null

      if (account && StudentQuiz.address) {
        const quizNames: string[] = await StudentQuiz.listQuizByStudent(account)
        if (quizNames.length > 0) {
          const results: {
            total: number
            grade: number
            attempt: number
            quiz: string
            answer: string
          }[] = await Promise.all(quizNames.map(name => StudentQuiz['getStudentQuiz(address,string)'](account, name)))

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
      if (isAdmin && CONTRACT_ADDRESSES[chainId].AcademyStudents) {
        const students: string[] = await AcademyStudents.listStudents()

        const studentInfos: AdminStudentsType[] =
          students && (await Promise.all(students.map(student => AcademyStudents.getStudentByAddress(student))))

        const nameList: AdminNameListType[] = await MasterName.listNameInfo()

        dispatch(loadAdmin({ students: studentInfos, nameList }))
      }

      if (!AcademyStudents.address) {
        console.warn('AcademyStudents contract is not deployed to detected network!')
        return
      }

      // Load StudentProfile
      const studentInfo = await AcademyStudents.getStudentByAddress(account)

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
        const StudentPortfolio = StudentPortfolioFactory.connect(portfolioAddress, provider)
        loadContract("StudentPortfolio", StudentPortfolio)

        // Load StudentPortfolioList
        const portfolioList = await StudentPortfolio.listPortfolio()

        let studentName = null
        // Load StudentName
        if (portfolioList?.length > 0) {
          const nameProject = portfolioList.find(({ name }) => name === 'Name')
          if (nameProject) {
            const nameProjectAddress = nameProject.projectAddress
            studentName = await MasterName.getName(nameProjectAddress)
          }
        }

        // Load AcademyClass
        const AcademyClass = AcademyClassFactory.connect(activeClassAddress, provider)
        loadContract("AcademyClass", AcademyClass)

        const studentActiveClassName = await AcademyClass.className()
        const classStudentInfo = await AcademyClass.getStudentByAddress(account)

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
