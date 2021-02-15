import { Box, useClipboard, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

import { Highlight } from '@/components/all'
import { CopyButton } from '../CopyButton'

export const CodeBlock = props => {
  const { className, children, viewlines, ln } = props

  const language = className?.replace(/language-/, '')
  const { hasCopied, onCopy } = useClipboard(children)

  return (
    <Box position='relative' zIndex='0' w='full'>
      <Box
        pt='4'
        overflow='auto'
        rounded='8px'
        my='8'
        bg={useColorModeValue('white', 'dark.600')}
        boxShadow='md'
      >
        <Highlight
          codeString={children}
          language={language}
          metastring={ln}
          showLines={viewlines}
        />
      </Box>
      <CopyButton onClick={onCopy}>{hasCopied ? 'copied' : 'copy'}</CopyButton>
    </Box>
  )
}

CodeBlock.defaultProps = {
  mountStylesheet: false,
}

export default CodeBlock
