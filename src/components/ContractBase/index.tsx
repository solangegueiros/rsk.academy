import { ReactNode, useContext } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  BoxProps,
  Center,
  chakra,
  Heading,
  HStack,
  IconButton,
  Spinner,
  useClipboard,
  useColorModeValue,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FaCheckCircle, FaCopy } from 'react-icons/fa'
import { IoMdWallet } from 'react-icons/io'

import { Popup } from '@components/Popup'
import { DEPLOYED_CHAINS } from '@constants'
import { ContractFactoryType, ContractNameType } from '@context/ContractProvider'
import { Web3Context } from '@context/Web3Provider'
import { useAppSelector } from '@store'
import { trimValue } from '@utils/trimValue'

interface ContractBaseProps {
  contract: ContractFactoryType
  name: ContractNameType
  children: ReactNode
}

const NotLoggedIn = (): JSX.Element => {
  const { t } = useTranslation('common')

  return (
    <Alert
      variant='subtle'
      status='warning'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      py={6}
      mt={4}
    >
      <AlertIcon mb={4} as={IoMdWallet} boxSize='50px' mr={0} />
      <AlertDescription maxWidth='sm'>{t`contract.mustConnect`}</AlertDescription>
    </Alert>
  )
}

const NotDeployed = (): JSX.Element => {
  const { t } = useTranslation('common')

  return (
    <Alert
      variant='subtle'
      status='warning'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      py={6}
      mt={4}
    >
      <AlertIcon mb={4} boxSize='50px' mr={0} />
      <AlertDescription maxWidth='sm'>{t`contract.notDeployed`}</AlertDescription>
    </Alert>
  )
}

export const ContractBase = ({ contract, name, children, ...rest }: ContractBaseProps & BoxProps): JSX.Element => {
  const { hasCopied, onCopy } = useClipboard(contract?.address)
  const { isLoggedIn } = useContext(Web3Context)
  const { chainId, isLoading } = useAppSelector(state => state.identity)

  const color = useColorModeValue('primary.500', 'light.500')
  const bg = useColorModeValue('white', 'dark.400')

  const showIsNotDeployed = isLoggedIn && !DEPLOYED_CHAINS.includes(chainId)

  if (showIsNotDeployed) return <NotDeployed />
  if (!contract) return <NotLoggedIn />

  return (
    <Box bg={bg} p={8} boxShadow='md' borderRadius={10} w='full' mt={4} {...rest}>
      {/* Contract Header */}
      <HStack mb={4} justify='center'>
        <Popup label='View on explorer'>
          <Heading as='h3' size='md'>
            <chakra.a
              rel='noopener'
              target='_blank'
              href={`https://explorer.testnet.rsk.co/address/${contract.address}`}
            >
              {name}
            </chakra.a>
          </Heading>
        </Popup>
        {isLoggedIn && contract.address && (
          <Popup label={trimValue(contract.address, 8)} hasArrow>
            <IconButton
              aria-label='Copy Address'
              variant='ghost'
              color={color}
              icon={hasCopied ? <FaCheckCircle /> : <FaCopy />}
              onClick={onCopy}
            />
          </Popup>
        )}
      </HStack>

      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        children
      )}
    </Box>
  )
}
