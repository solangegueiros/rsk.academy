import { ReactNode, useContext } from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  BoxProps,
  chakra,
  Heading,
  HStack,
  IconButton,
  useClipboard,
  useColorModeValue,
} from '@chakra-ui/react'
import { IoMdWallet } from 'react-icons/io'
import { useTranslation } from 'next-i18next'

import { trimValue } from '@utils/trimValue'
import { RLoginResponseContext } from '@context/RLoginProvider'
import { FaCheckCircle, FaCopy } from 'react-icons/fa'
import { Popup } from '@components/Popup'

interface ContractBaseProps {
  contract: {
    name: string
    address: string
    isDeployedOnCurrentNetwork: boolean
  }
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
    >
      <AlertIcon as={IoMdWallet} boxSize='50px' mr={0} />
      <AlertDescription my={4} maxWidth='sm'>
        {t`contract.mustConnect`}
      </AlertDescription>
    </Alert>
  )
}

export const ContractBase = ({ contract, children, ...rest }: ContractBaseProps & BoxProps): JSX.Element => {
  const { hasCopied, onCopy } = useClipboard(contract?.address)
  const context = useContext(RLoginResponseContext)
  const { rLoginResponse } = context

  const color = useColorModeValue('primary.500', 'light.500')
  const { t } = useTranslation('common')
  const bg = useColorModeValue('white', 'dark.400')

  if (!contract) return <NotLoggedIn />

  const showDeployedContract = rLoginResponse && contract.isDeployedOnCurrentNetwork
  const showIsNotDeployed = rLoginResponse && !contract.isDeployedOnCurrentNetwork

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
              {contract.name}
            </chakra.a>
          </Heading>
        </Popup>
        {rLoginResponse && contract.address && (
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

      {/* If it's not logged in */}
      {!rLoginResponse && <NotLoggedIn />}

      {/* if contract is not deployed on the network */}
      {showIsNotDeployed && (
        <Alert status='warning'>
          <AlertIcon />
          {t`contract.notDeployed`}
        </Alert>
      )}

      {showDeployedContract && children}
    </Box>
  )
}
