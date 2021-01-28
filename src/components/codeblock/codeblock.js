import { Box, Button, useClipboard, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

import { Highlight } from '@/components/index'

export const CopyButton = props => (
  <Button
    size='sm'
    position='absolute'
    textTransform='uppercase'
    colorScheme={useColorModeValue('rsk.green', 'rsk.light')}
    fontSize='xs'
    height='24px'
    top={0}
    zIndex='1'
    right='1.25em'
    {...props}
  />
)

export const CodeContainer = props => (
  <Box
    padding='5'
    rounded='8px'
    my='8'
    zIndex='0'
    bg={useColorModeValue('white', 'rsk.dark.700')}
    boxShadow='sm'
    {...props}
  />
)

export const CodeBlock = props => {
  const { className, children, viewlines, ln } = props

  const language = className?.replace(/language-/, '')
  const { hasCopied, onCopy } = useClipboard(children)

  return (
    <Box position='relative' zIndex='-1'>
      <CodeContainer px='0' overflow='hidden'>
        <Highlight
          codeString={children}
          language={language}
          metastring={ln}
          showLines={viewlines}
        />
      </CodeContainer>
      <CopyButton top='4' onClick={onCopy}>
        {hasCopied ? 'copied' : 'copy'}
      </CopyButton>
    </Box>
  )
}

CodeBlock.defaultProps = {
  mountStylesheet: false,
}

export default CodeBlock
