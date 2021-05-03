import { Box, BoxProps, useUpdateEffect } from '@chakra-ui/react'
import { useElementScroll } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

type ScrollViewProps = {
  onScroll?: (arg0: boolean) => void
} & BoxProps

export const ScrollView = (props: ScrollViewProps): JSX.Element => {
  const { onScroll, ...rest } = props
  const [y, setY] = useState<number>(0)
  const elRef = useRef<HTMLDivElement>()
  const { scrollY } = useElementScroll(elRef)

  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  useUpdateEffect(() => {
    onScroll?.(y > 5)
  }, [y])

  return <Box ref={elRef} flex='1' id='routes' overflow='auto' px='6' pb='6' {...rest} />
}
