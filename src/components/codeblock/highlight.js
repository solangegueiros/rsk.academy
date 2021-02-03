import { chakra, useColorModeValue } from '@chakra-ui/react'
import BaseHighlight, { defaultProps } from 'prism-react-renderer'
import nightOwl from 'prism-react-renderer/themes/nightOwl'
import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight'
import React from 'react'

const REGEX = /{([\d,-]+)}/

const calculateLinesToHighlight = meta => {
  if (!REGEX.test(meta)) {
    return () => false
  }
  const lineNumbers = REGEX.exec(meta)[1]
    .split(`,`)
    .map(v => v.split(`-`).map(x => parseInt(x, 10)))

  return index => {
    const lineNumber = index + 1
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start,
    )
    return inRange
  }
}

export const Highlight = ({
  codeString,
  language = 'js',
  metastring,
  showLines,
  ...props
}) => {
  const shouldHighlightLine = calculateLinesToHighlight(metastring)
  const theme = useColorModeValue(nightOwlLight, nightOwl)
  const lineHighlightColor = useColorModeValue('rsk.green.50', 'rsk.dark.400')

  return (
    <BaseHighlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={theme}
      {...props}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <chakra.div fontFamily='code' bg='transparent' data-language={language}>
          <pre
            className={className}
            style={{ ...style, backgroundColor: 'transparent' }}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i })
              return (
                <chakra.div
                  key={i}
                  px='5'
                  bg={shouldHighlightLine(i) ? lineHighlightColor : undefined}
                  {...lineProps}
                >
                  {showLines && (
                    <chakra.span opacity={0.3} mr='6' fontSize='xs'>
                      {i + 1}
                    </chakra.span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </chakra.div>
              )
            })}
          </pre>
        </chakra.div>
      )}
    </BaseHighlight>
  )
}

export default Highlight
