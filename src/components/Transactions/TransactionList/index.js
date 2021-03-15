import PropTypes from 'prop-types'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Text,
  Box,
  Link,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { MdCheckCircle, MdRemoveCircle } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { formatDistanceToNow } from 'date-fns'
import { ClockLoader } from 'react-spinners'
import { trimValue } from '@/utils/trimValue'

export const TransactionList = ({ isOpen, onClose }) => {
  const { transactions } = useSelector(state => state.transaction)
  const bg = useColorModeValue('white', 'dark.500')
  const colors = {
    confirmed: 'green.400',
    pending: 'yellow.400',
    failed: 'red.400',
  }

  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg={bg}>
          <DrawerHeader>Transaction History</DrawerHeader>

          <DrawerBody>
            {transactions.length > 0 && (
              <Box mx={-6}>
                {transactions.map(tsx => (
                  <HStack
                    px={6}
                    py={2}
                    _hover={{ bg: 'blackAlpha.200', textDecor: 'none' }}
                    _even={{ bg: 'blackAlpha.100' }}
                    key={tsx.hash}
                    w='full'
                    as={Link}
                    target='_blank'
                    href={`https://explorer.testnet.rsk.co/tx/${tsx.hash}`}
                  >
                    <Box>
                      {tsx.type === 'confirmed' ? (
                        <Icon
                          boxSize={8}
                          color={colors.confirmed}
                          as={MdCheckCircle}
                        />
                      ) : tsx.type === 'pending' ? (
                        <Box
                          boxSize={8}
                          bg={colors.pending}
                          borderRadius='full'
                        >
                          <ClockLoader size={32} color='white' />
                        </Box>
                      ) : (
                        tsx.type === 'failed' && (
                          <Icon
                            boxSize={8}
                            color={colors.failed}
                            as={MdRemoveCircle}
                          />
                        )
                      )}
                    </Box>
                    <Box my={2}>
                      <Text>{tsx.name}</Text>
                      <Text>{trimValue(tsx.hash, 10)}</Text>
                      <Text>{formatDistanceToNow(tsx.time)}</Text>
                    </Box>
                  </HStack>
                ))}
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

TransactionList.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
