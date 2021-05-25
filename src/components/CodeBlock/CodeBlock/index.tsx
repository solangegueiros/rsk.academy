import React, { ReactNode } from 'react'

import { Box, useClipboard, useColorModeValue } from '@chakra-ui/react'
import { Language } from 'prism-react-renderer'

import { Highlight } from '@components'

import { CopyButton } from '../CopyButton'

interface CodeBlockProps {
  className: string
  children: ReactNode
  ln: string
  viewlines: boolean
}

export const CodeBlock = (props: CodeBlockProps): JSX.Element => {
  const { className, children, viewlines, ln } = props

  const language = className?.replace(/language-/, '') as Language
  const { hasCopied, onCopy } = useClipboard(children.toString())

  return (
    <Box position='relative' zIndex='0' w='full'>
      <Box pt='4' overflow='auto' rounded='8px' my='8' bg={useColorModeValue('white', 'dark.600')} boxShadow='md'>
        <Highlight codeString={children.toString()} language={language} metastring={ln} showLines={viewlines} />
      </Box>
      <CopyButton onClick={onCopy}>{hasCopied ? 'copied' : 'copy'}</CopyButton>
    </Box>
  )
}
