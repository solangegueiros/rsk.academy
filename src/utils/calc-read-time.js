export const calcReadTime = content => {
  const wordsPerMinute = 275
  const words = content.split(' ')
  const textLength = words.length || 1
  return Math.ceil(textLength / wordsPerMinute)
}
