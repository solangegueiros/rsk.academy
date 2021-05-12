import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { SidebarLink } from '@components'
import { useEffect, useState } from 'react'

export type RouteType = {
  heading?: boolean
  title: { en: string; es: string; pt: string }
  path?: string
  new?: boolean
  open?: boolean
  routes?: RouteType[]
}

interface SidebarContentProps {
  routes: RouteType[]
  contentRef?: { current: any }
}

export const SidebarContent = (props: SidebarContentProps): JSX.Element => {
  const { routes } = props
  const { locale, defaultLocale } = useRouter()

  const color = useColorModeValue('primary.500', 'light.500')
  const newBadgeColor = useColorModeValue('white', 'dark.500')
  const newBadgeColorScheme = useColorModeValue('primary', 'light')
  const [index, setIndex] = useState(0)

  const { asPath } = useRouter()

  useEffect(() => {
    const idx = routes.findIndex(lvl1 => lvl1.routes.some(lvl2 => lvl2.path === asPath))
    setIndex(idx)
  }, [asPath])

  const changeIndex = (idx: number) => {
    if (index === idx) setIndex(null)
    else setIndex(idx)
  }

  return (
    <Accordion allowToggle defaultIndex={index} index={index}>
      {routes.map((lvl1, idx) => (
        <AccordionItem key={idx}>
          <chakra.h4>
            <AccordionButton
              variant='flat'
              _expanded={{ bg: color, color: newBadgeColor }}
              onClick={() => changeIndex(idx)}
            >
              <Box textAlign='left' flex={1} fontWeight='bold' textTransform='uppercase' my={1}>
                {lvl1.title[locale] || lvl1.title[defaultLocale]}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </chakra.h4>

          <AccordionPanel>
            {lvl1.routes.map(lvl2 => (
              <SidebarLink mt='2' key={lvl2.path} href={lvl2.path}>
                <chakra.span>{lvl2.title[locale] || lvl2.title[defaultLocale]}</chakra.span>
                {lvl2.new && (
                  <Badge
                    ml='2'
                    lineHeight='tall'
                    fontSize='10px'
                    variant='solid'
                    color={newBadgeColor}
                    colorScheme={newBadgeColorScheme}
                  >
                    New
                  </Badge>
                )}
              </SidebarLink>
            ))}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}