/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from 'react'

import { Alert, AlertIcon, Box, Button, Link, Text, VStack } from '@chakra-ui/react'
import { Manager, Provider } from '@rsksmart/rif-storage'

import { ContractContext } from '@context/ContractProvider'
import { useTransactionCallback } from '@hooks/transactions/useTransactionCallback'
import { useCertificatePdf } from '@hooks/useCertificatePdf'
import { useAppDispatch, useAppSelector } from '@store'
import { loadCertificateHash } from '@store/profile/slice'

const manager = new Manager()
manager.addProvider(Provider.IPFS, { url: 'https://ipfs.infura.io:5001/api/v0/' })

const Certificate = (): JSX.Element => {
  const instance = useCertificatePdf()
  const { AcademyCertification } = useContext(ContractContext)
  const { account } = useAppSelector(state => state.identity)
  const { studentName, studentActiveClassName, certificatePdfHash, quizResults, portfolioList } = useAppSelector(
    state => state.profile,
  )
  const [isValid, setIsValid] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const { execute, isLoading } = useTransactionCallback('Register Contract')

  useEffect(() => {
    if (studentName && studentActiveClassName && certificatePdfHash && quizResults) {
      const hasPassedQuizzes = Object.values(quizResults).every(result => result.grade > 5)
      if (hasPassedQuizzes) setIsValid(true)
    } else setIsValid(false)
  }, [studentName, studentActiveClassName, certificatePdfHash, quizResults, portfolioList])

  const register = async () => {
    const fileHash = await manager.put(Buffer.from(await instance.blob.arrayBuffer()), {
      fileName: account,
    })
    dispatch(loadCertificateHash(fileHash))

    execute(() =>
      AcademyCertification.contract.registerCertificate(account, studentName, studentActiveClassName, fileHash),
    )
  }

  return (
    <Box>
      {isValid && (
        <Box pos='relative' w='full' pt='70%'>
          <embed
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            type='application/pdf'
            width='100%'
            height='100%'
            src={`${instance.url}#toolbar=0&navpanes=0&scrollbar=0`}
          />
        </Box>
      )}

      <VStack my={8}>
        {<Text>You need to complete all steps to get your certificate</Text>}
        {studentActiveClassName ? (
          <Alert status='success'>
            <AlertIcon /> Subscribe Developers Classs
          </Alert>
        ) : (
          <Alert status='error'>
            <AlertIcon /> Subscribe Developers Classs
          </Alert>
        )}
        {portfolioList?.[0] ? (
          <Alert status='success'>
            <AlertIcon /> Deploy Name Contract
          </Alert>
        ) : (
          <Alert status='error'>
            <AlertIcon /> Deploy Name Contract
          </Alert>
        )}
        {quizResults && Object.values(quizResults).every(result => result.grade > 5) ? (
          <Alert status='success'>
            <AlertIcon /> Get at least %60 from each quiz
          </Alert>
        ) : (
          <Alert status='error'>
            <AlertIcon /> Get at least %60 from each quiz
          </Alert>
        )}
      </VStack>

      {!certificatePdfHash ? (
        <Button onClick={register} isLoading={isLoading} isDisabled={!isValid}>
          Get Certificate
        </Button>
      ) : (
        <Link href={`https://ipfs.io/ipfs/${certificatePdfHash}/${account}`}>View on IPFS</Link>
      )}
    </Box>
  )
}

export default Certificate
