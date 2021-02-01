import {
  Box,
  Button,
  useBreakpointValue,
  useClipboard,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'

import { Highlight } from '@/components/index'

export const CopyButton = props => (
  <Button
    size={useBreakpointValue({ base: 'sm', sm: 'xs' })}
    position='absolute'
    textTransform='uppercase'
    colorScheme={useColorModeValue('rsk.green', 'rsk.light')}
    top={useBreakpointValue({ base: '-1rem', sm: 4 })}
    zIndex='1'
    right={useBreakpointValue({ base: 0, sm: 4 })}
    {...props}
  />
)

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
        bg={useColorModeValue('white', 'rsk.dark.700')}
        boxShadow='sm'
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
