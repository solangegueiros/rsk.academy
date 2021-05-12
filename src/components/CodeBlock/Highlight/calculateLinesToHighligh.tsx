const REGEX = /{([\d,-]+)}/

export const calculateLinesToHighlight = (meta: string): ((index: number) => boolean) => {
  if (!REGEX.test(meta)) {
    return () => false
  }
  const lineNumbers = REGEX.exec(meta)[1]
    .split(`,`)
    .map(v => v.split(`-`).map(x => Number(x)))

  return index => {
    const lineNumber = index + 1
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start,
    )
    return inRange
  }
}
