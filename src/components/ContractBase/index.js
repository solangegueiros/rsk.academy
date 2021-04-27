import PropTypes from 'prop-types'
import { useContext } from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  chakra,
  Heading,
  HStack,
  Tooltip,
  useClipboard,
  useColorModeValue,
} from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'
import { IoMdWallet } from 'react-icons/io'
import { useI18n } from 'next-localization'

import { trimValue } from '@/utils/trimValue'
import { RLoginResponseContext } from '@/context/RLoginProvider'

const NotLoggedIn = () => {
  const { t } = useI18n()

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
        {t('contract.mustConnect')}
      </AlertDescription>
    </Alert>
  )
}

export const ContractBase = ({ contract, children, ...rest }) => {
  const { hasCopied, onCopy } = useClipboard(contract?.address)
  const { rLoginResponse } = useContext(RLoginResponseContext)
  const color = useColorModeValue('primary.500', 'light.500')
  const { t } = useI18n()
  const bg = useColorModeValue('white', 'dark.400')

  if (!contract) return <NotLoggedIn />

  const showDeployedContract =
    rLoginResponse && contract.isDeployedOnCurrentNetwork
  const showIsNotDeployed =
    rLoginResponse && !contract.isDeployedOnCurrentNetwork

  return (
    <Box bg={bg} p={8} boxShadow='md' borderRadius={10} w='full' {...rest}>
      {/* Contract Header */}
      <HStack mb={4} justify='center'>
        <Tooltip label='View on explorer'>
          <Heading as='h3' size='md'>
            <chakra.a
              rel='noopener'
              target='_blank'
              href={`https://explorer.testnet.rsk.co/address/${contract.address}`}
            >
              {contract.name}
            </chakra.a>
          </Heading>
        </Tooltip>
        {rLoginResponse && contract.address && (
          <Tooltip label={trimValue(contract.address, 8)} hasArrow>
            <Box
              color={color}
              cursor='pointer'
              as={!hasCopied && CopyIcon}
              onClick={onCopy}
            >
              {hasCopied ? 'Copied' : 'Copy'}
            </Box>
          </Tooltip>
        )}
      </HStack>

      {/* If it's not logged in */}
      {!rLoginResponse && <NotLoggedIn />}

      {/* if contract is not deployed on the network */}
      {showIsNotDeployed && (
        <Alert status='warning'>
          <AlertIcon />
          {t('contract.notDeployed')}
        </Alert>
      )}

      {showDeployedContract && children}
    </Box>
  )
}

ContractBase.propTypes = {
  contract: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    isDeployedOnCurrentNetwork: PropTypes.bool,
  }),
  children: PropTypes.node.isRequired,
}

export default ContractBase
