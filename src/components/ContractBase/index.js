import PropTypes from 'prop-types'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Heading,
  HStack,
  Tooltip,
  useClipboard,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRLogin } from '@/hooks/useRLogin'
import { CopyIcon } from '@chakra-ui/icons'
import { IoMdWallet } from 'react-icons/io'
import { useI18n } from 'next-localization'
import { trimValue } from '@/utils/trimValue'

export const ContractBase = ({ contract, children }) => {
  const { hasCopied, onCopy } = useClipboard(contract.address)
  const { activate, isLoggedIn } = useRLogin()
  const colorScheme = useColorModeValue('primary', 'light')
  const color = useColorModeValue('primary.500', 'light.500')
  const { t } = useI18n()

  const showDeployedContract = isLoggedIn && contract.isDeployedOnCurrentNetwork
  const showIsNotDeployed = isLoggedIn && !contract.isDeployedOnCurrentNetwork

  return (
    <Box
      bg={useColorModeValue('white', 'dark.400')}
      p={8}
      boxShadow='md'
      borderRadius={10}
    >
      {/* Contract Header */}
      <HStack mb={4} justify='center'>
        <Heading as='h3' size='md'>
          {contract.name}
        </Heading>
        {isLoggedIn && contract.address && (
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
      {!isLoggedIn && (
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
          <Button onClick={activate} colorScheme={colorScheme}>
            {t('connect')}
          </Button>
        </Alert>
      )}

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
  }).isRequired,
  children: PropTypes.node.isRequired,
}

export default ContractBase
