import { useState } from 'react'
import { chakra } from '@chakra-ui/react'

export const MdxImage = props => {
  const INITIAL_WIDTH = 400
  const [w, setW] = useState(INITIAL_WIDTH)

  const toggleWidth = () => setW(w === INITIAL_WIDTH ? 'full' : INITIAL_WIDTH)

  return (
    <chakra.img
      apply='mdx.img'
      w={w}
      maxW='full'
      my={2}
      onClick={toggleWidth}
      cursor={w === INITIAL_WIDTH ? 'zoom-in' : 'zoom-out'}
      {...props}
    />
  )
}
