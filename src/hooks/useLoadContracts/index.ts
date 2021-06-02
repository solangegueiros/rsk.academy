/* eslint-disable camelcase */
import { useContext } from 'react'

import { CONTRACT_ADDRESSES, DEPLOYED_CHAINS } from '@constants'
import { ContractContext } from '@context/ContractProvider'
import { Web3Context } from '@context/Web3Provider'
import { useAppDispatch, useAppSelector } from '@store'
import { AdminNameListType, AdminStudentsType, loadAdmin } from '@store/admin/slice'
import { setError, setLoading } from '@store/identity/slice'
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

export function useLoadSmartContracts(): { loadContracts: () => void } {
  const { signer } = useContext(Web3Context)
  const dispatch = useAppDispatch()
  const { account, chainId, isAdmin } = useAppSelector(state => state.identity)
  const { loadContract, resetContracts } = useContext(ContractContext)

  const loadContracts = async () => {
    dispatch(setLoading(true))
    try {
      if (signer && chainId && DEPLOYED_CHAINS.includes(chainId)) {
        // Load AcademyStudentsSC
        const AcademyStudents = AcademyStudentsFactory.connect(CONTRACT_ADDRESSES[chainId].AcademyStudents, signer)
        loadContract('AcademyStudents', AcademyStudents)

        // Load AcademyWalletSC
        const AcademyWallet = AcademyWalletFactory.connect(CONTRACT_ADDRESSES[chainId].AcademyWallet, signer)
        loadContract('AcademyWallet', AcademyWallet)

        // Load AcademyClassListSC
        const AcademyClassList = AcademyClassListFactory.connect(CONTRACT_ADDRESSES[chainId].AcademyClassList, signer)
        loadContract('AcademyClassList', AcademyClassList)

        // Load AcademyProjectListSC
        const AcademyProjectList = AcademyProjectListFactory.connect(
          CONTRACT_ADDRESSES[chainId].AcademyProjectList,
          signer,
        )
        loadContract('AcademyProjectList', AcademyProjectList)

        // Load MasterNameSC
        const MasterName = MasterNameFactory.connect(CONTRACT_ADDRESSES[chainId].MasterName, signer)
        loadContract('MasterName', MasterName)

        // Load StudentQuizSC
        const AcademyStudentQuiz = AcademyStudentQuizFactory.connect(
          CONTRACT_ADDRESSES[chainId].AcademyStudentQuiz,
          signer,
        )
        loadContract('AcademyStudentQuiz', AcademyStudentQuiz)

        // Load Courses
        const Developer = AcademyClassDevFactory.connect(CONTRACT_ADDRESSES[chainId].Developer, signer)
        loadContract('Developer', Developer)
        const Business = AcademyClassBusinessFactory.connect(CONTRACT_ADDRESSES[chainId].Business, signer)
        loadContract('Business', Business)

        let quizResults: Record<string, { total: number; grade: number; attempt: number; answer: string }> = null

        if (account) {
          const quizNames: string[] = await AcademyStudentQuiz.listQuizByStudent(account)
          if (quizNames.length > 0) {
            const results: {
              total: number
              grade: number
              attempt: number
              quiz: string
              answer: string
            }[] = await Promise.all(
              quizNames.map(name => AcademyStudentQuiz['getStudentQuiz(address,string)'](account, name)),
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
          const StudentPortfolio = StudentPortfolioFactory.connect(portfolioAddress, signer)
          loadContract('StudentPortfolio', StudentPortfolio)

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
          const AcademyClass = AcademyClassFactory.connect(activeClassAddress, signer)
          loadContract('AcademyClass', AcademyClass)

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
    } catch (error) {
      console.error(error)
      if (error.event !== 'changed') {
        dispatch(setError({ error }))
      }
    } finally {
      dispatch(setLoading(false))
    }
  }
  return { loadContracts }
}
