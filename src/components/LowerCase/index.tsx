import React, { forwardRef, useState } from 'react'

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
  Alert,
  BoxProps,
} from '@chakra-ui/react'
import { FaCopy, FaPaste } from 'react-icons/fa'

import { Popup } from '@components/Popup'

const PopupLabel = (props, ref) => (
  <HStack ref={ref}>
    <FaCopy /> <Text>Copy</Text>
  </HStack>
)

export const PopupLabelWithRef = forwardRef<HTMLDivElement, BoxProps>(PopupLabel)

export const LowerCase = (): JSX.Element => {
  const [input, setInput] = useState<string>('')
  const [value, setValue] = useState<string>('')

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
            <IconButton aria-label='Paste' onClick={onPaste} variant='ghost' colorScheme='primary' icon={<FaPaste />} />
          </InputRightElement>
          <Input
            placeholder='Convert to lowercase'
            name='address'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </InputGroup>
        <Button variant='outlined' onClick={() => setValue(input?.toLowerCase())}>
          LowerCase
        </Button>
      </HStack>

      <Collapse in={!!value}>
        <Popup label={<PopupLabel />} hasArrow>
          <Alert status='info' justifyContent='center' cursor='pointer' onClick={onCopy} as='pre'>
            <Text>{hasCopied ? 'Copied' : value}</Text>
          </Alert>
        </Popup>
      </Collapse>
    </VStack>
  )
}
