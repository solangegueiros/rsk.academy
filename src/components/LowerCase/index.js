import {
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useClipboard,
  Text,
  Button,
  VStack,
  Collapse,
  Tooltip,
  Alert,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaCopy, FaPaste } from 'react-icons/fa'

export const LowerCase = () => {
  const [input, setInput] = useState('')
  const [value, setValue] = useState('')
  const bg = useColorModeValue('primary.500', 'light.500')

  const onPaste = async () => {
    const clipBoard = await navigator.clipboard.readText()
    setInput(clipBoard)
  }

  const { hasCopied, onCopy } = useClipboard(value?.toLowerCase())

  return (
    <VStack align='stretch' mt={4} maxW='600px'>
      <HStack>
        <InputGroup>
          <InputRightElement>
            <IconButton
              onClick={onPaste}
              variant='ghost'
              colorScheme='primary'
              icon={<FaPaste />}
            />
          </InputRightElement>
          <Input
            placeholder='Convert to lowercase'
            name='address'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </InputGroup>
        <Button
          variant='reversed'
          onClick={() => setValue(input?.toLowerCase())}
        >
          LowerCase
        </Button>
      </HStack>

      <Collapse in={value}>
        <Tooltip
          bg={bg}
          label={
            <HStack>
              <FaCopy /> <Text>Copy</Text>
            </HStack>
          }
          hasArrow
        >
          <Alert
            status='info'
            justifyContent='center'
            cursor='pointer'
            onClick={onCopy}
            as='pre'
          >
            <Text>{hasCopied ? 'Copied' : value}</Text>
          </Alert>
        </Tooltip>
      </Collapse>
    </VStack>
  )
}
