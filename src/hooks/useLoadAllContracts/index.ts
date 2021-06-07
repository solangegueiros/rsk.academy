/* eslint-disable camelcase */
import { useContext } from 'react'

import { CONTRACT_ADDRESSES, DEFAULT_ADMIN_ROLE, DEPLOYED_CHAINS } from '@constants'
import { ContractContext } from '@context/ContractProvider'
import { Web3Context } from '@context/Web3Provider'
import { useAppDispatch, useAppSelector } from '@store'
import { loadAdmin } from '@store/admin/slice'
import { setAdmin, setError, setLoading } from '@store/identity/slice'
import { saveProfile, resetProfile } from '@store/profile/slice'
import {
  AcademyClassListFactory,
  AcademyClassFactory,
  AcademyProjectListFactory,
  AcademyStudentQuizFactory,
  AcademyStudentsFactory,
  AcademyWalletFactory,
  MasterNameFactory,
  StudentPortfolioFactory,
  AcademyClassDevFactory,
  AcademyClassBusinessFactory,
} from '@type_chain'

export function useLoadAllContracts(): { loadAllContracts: () => void } {
  const { signer } = useContext(Web3Context)
  const dispatch = useAppDispatch()
  const { account, chainId } = useAppSelector(state => state.identity)
  const { loadContract, resetContracts } = useContext(ContractContext)

  const loadAllContracts = async () => {
    dispatch(setLoading(true))
    try {
      if (account && signer && chainId && DEPLOYED_CHAINS.includes(chainId)) {
        const {
          AcademyClassList,
          AcademyProjectList,
          AcademyStudentQuiz,
          AcademyStudents,
          AcademyWallet,
          Business,
          Developer,
          MasterName,
        } = CONTRACT_ADDRESSES[chainId]

        // Load AcademyStudentsSC
        const AcademyStudentsSC = AcademyStudentsFactory.connect(AcademyStudents, signer)
        loadContract('AcademyStudents', AcademyStudentsSC)

        // Load AcademyWalletSC
        const AcademyWalletSC = AcademyWalletFactory.connect(AcademyWallet, signer)
        loadContract('AcademyWallet', AcademyWalletSC)

        // Load AcademyClassListSC
        const AcademyClassListSC = AcademyClassListFactory.connect(AcademyClassList, signer)
        loadContract('AcademyClassList', AcademyClassListSC)

        // Load AcademyProjectListSC
        const AcademyProjectListSC = AcademyProjectListFactory.connect(AcademyProjectList, signer)
        loadContract('AcademyProjectList', AcademyProjectListSC)

        // Load MasterNameSC
        const MasterNameSC = MasterNameFactory.connect(MasterName, signer)
        loadContract('MasterName', MasterNameSC)

        // Load StudentQuizSC
        const AcademyStudentQuizSC = AcademyStudentQuizFactory.connect(AcademyStudentQuiz, signer)
        loadContract('AcademyStudentQuiz', AcademyStudentQuizSC)

        // Load Courses
        const DeveloperSC = AcademyClassDevFactory.connect(Developer, signer)
        loadContract('Developer', DeveloperSC)
        const BusinessSC = AcademyClassBusinessFactory.connect(Business, signer)
        loadContract('Business', BusinessSC)

        const isAccountAdmin = await AcademyClassListSC.hasRole(DEFAULT_ADMIN_ROLE, account)
        dispatch(setAdmin(isAccountAdmin))
        console.log(`isAccountAdmin`, isAccountAdmin)

        // Load Admin
        if (isAccountAdmin) {
          const students = await DeveloperSC.listStudentsByAddress()
          const nameList = await MasterNameSC.listNameInfo()

          dispatch(loadAdmin({ students, nameList, studentCount: students.length, nameCount: nameList.length }))
        }

        let quizResults: Record<string, { total: number; grade: number; attempt: number; answer: string }> = null

        const quizNames: string[] = await AcademyStudentQuizSC.listQuizByStudent(account)
        if (quizNames.length > 0) {
          const results: {
            total: number
            grade: number
            attempt: number
            quiz: string
            answer: string
          }[] = await Promise.all(
            quizNames.map(name => AcademyStudentQuizSC['getStudentQuiz(address,string)'](account, name)),
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

        // Load StudentProfile
        const studentInfo = await AcademyStudentsSC.getStudentByAddress(account)

        if (!studentInfo) {
          console.warn('Student account is not exist!')
          resetContracts()
          dispatch(resetProfile())
          return
        }

        const { index, ownerAddress, portfolioAddress, activeClass, studentClasses } = studentInfo

        // Load AcademyClassSC
        const AcademyClassSC = AcademyClassFactory.connect(activeClass, signer)
        loadContract('AcademyClass', AcademyClassSC)

        if (portfolioAddress === '0x0000000000000000000000000000000000000000') {
          dispatch(resetProfile())
          return
        }

        const studentActiveClassName = await AcademyClassSC.className()
        const classStudentInfo = await AcademyClassSC.getStudentByAddress(account)

        // Load StudentPortfolioSC
        const StudentPortfolioSC = StudentPortfolioFactory.connect(portfolioAddress, signer)
        loadContract('StudentPortfolio', StudentPortfolioSC)

        // Load StudentPortfolioList
        const portfolioList = await StudentPortfolioSC.listPortfolio()

        let studentName = null
        // Load StudentName
        if (portfolioList?.length > 0) {
          const nameProject = portfolioList.find(({ name }) => name === 'Name')
          if (nameProject) {
            const nameProjectAddress = nameProject.projectAddress
            studentName = await MasterNameSC.getName(nameProjectAddress)
          }
        }

        setTimeout(() => {
          dispatch(
            saveProfile({
              index,
              ownerAddress,
              portfolioAddress,
              activeClass,
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
    } catch (error) {
      console.log(error)
      console.log(error.data)
      console.log(error.response)

      if (error.event !== 'changed') {
        dispatch(setError({ error }))
      }
    } finally {
      dispatch(setLoading(false))
    }
  }
  return { loadAllContracts }
}
