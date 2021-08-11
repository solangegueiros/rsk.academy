/* eslint-disable react/no-unescaped-entities */
import { useEffect, useContext, useMemo } from 'react'

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  AlertDescription,
} from '@chakra-ui/react'
import { Manager, Provider } from '@rsksmart/rif-storage'
import { useRouter } from 'next/router'
import { FaCertificate, FaFileDownload, FaFilePdf } from 'react-icons/fa'

import { Navigate } from '@components/Markdown/Navigate'
import { ContractContext } from '@context/ContractProvider'
import { useTransactionCallback } from '@hooks/transactions/useTransactionCallback'
import { useCertificatePdf } from '@hooks/useCertificatePdf'
import { useAppSelector } from '@store'

const manager = new Manager()
manager.addProvider(Provider.IPFS, { url: 'https://ipfs.infura.io:5001/api/v0/' })

const Certificate = (): JSX.Element => {
  const { AcademyCertification } = useContext(ContractContext)
  const { account } = useAppSelector(state => state.identity)
  const profile = useAppSelector(state => state.profile)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [instance, updateInstance] = useCertificatePdf({ account, ...profile })
  const router = useRouter()

  const { execute, isLoading } = useTransactionCallback('Register Contract')

  const { studentName, studentActiveClassName, certificatePdfHash, quizResults, portfolioList, quizMinimum } = profile

  const isValid = useMemo(
    () =>
      studentName &&
      studentActiveClassName &&
      portfolioList &&
      quizResults &&
      quizResults.every(result => result.passed),
    [studentName, studentActiveClassName, quizResults, portfolioList],
  )

  useEffect(() => {
    isValid && updateInstance()
  }, [isValid, updateInstance])

  const register = async () => {
    const fileHash = await manager.put(Buffer.from(await instance.blob.arrayBuffer()), {
      fileName: account,
    })

    execute(() =>
      AcademyCertification.contract.registerCertificate(account, studentName, studentActiveClassName, fileHash),
    )
  }

  return (
    <Box>
      <Modal isCentered size='lg' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Get Certificate</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack>
              <Alert status='warning' textAlign='center' p={8} flexDir='column'>
                <AlertIcon boxSize={12} mb={4} />
                <AlertDescription>
                  <Text fontWeight='bold'>Current Language: {router.locale.toUpperCase()}</Text>
                  <Text>
                    You can register only one certificate in the smart contract and cannot change it again. If you want
                    to register your certificate in any other language (en, es, pt) please switch app to target
                    language!
                  </Text>
                </AlertDescription>
              </Alert>
              <Alert status={studentActiveClassName ? 'success' : 'error'}>
                <AlertIcon /> Subscribe Developers Classs
              </Alert>

              <Alert status={portfolioList?.[0] ? 'success' : 'error'}>
                <AlertIcon /> Deploy Name Contract
              </Alert>

              <Alert status={quizResults?.every(result => result.passed) ? 'success' : 'error'}>
                <AlertIcon /> Get at least %{quizMinimum} from each quiz
              </Alert>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button isLoading={isLoading} onClick={register} rightIcon={<FaCertificate />} isDisabled={!isValid}>
              Get Certificate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {!certificatePdfHash ? (
        <Button onClick={onOpen} size='lg' isLoading={isLoading} rightIcon={<FaFilePdf />}>
          Get Certificate
        </Button>
      ) : (
        <>
          <Button
            _hover={{ color: 'white' }}
            mr={8}
            as='a'
            rightIcon={<FaFileDownload />}
            href={instance.url}
            download={`Rsk Academy ${studentName}`}
          >
            Download PDF
          </Button>
          <Navigate href={`https://ipfs.io/ipfs/${certificatePdfHash}/${account}`}>View on IPFS</Navigate>
        </>
      )}

      <VStack my={8}>
        {!isValid && <Text>You need to complete all steps to get your certificate</Text>}
        <Alert status={studentActiveClassName ? 'success' : 'error'}>
          <AlertIcon /> Subscribe Developers Classs
        </Alert>

        <Alert status={portfolioList?.[0] ? 'success' : 'error'}>
          <AlertIcon /> Deploy Name Contract
        </Alert>

        <Alert status={quizResults?.every(result => result.passed) ? 'success' : 'error'}>
          <AlertIcon /> Get at least %{quizMinimum} from each quiz
        </Alert>
      </VStack>

      {certificatePdfHash && (
        <Box pos='relative' w='full' pt='70%' my={8}>
          <embed
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            type='application/pdf'
            width='100%'
            height='100%'
            src={`${instance.url}#toolbar=0&navpanes=0&scrollbar=0`}
          />
        </Box>
      )}
    </Box>
  )
}

export default Certificate
