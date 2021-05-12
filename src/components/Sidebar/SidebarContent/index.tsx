import { Badge, Box, chakra, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { SidebarLink } from '@components'

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

  return (
    <Box>
      {routes.map((lvl1, idx) => (
        <Fragment key={idx}>
          <chakra.h4
            fontSize='md'
            fontWeight='bold'
            my='1.25rem'
            textTransform='uppercase'
            letterSpacing='wider'
            color={color}
          >
            {lvl1.title[locale] || lvl1.title[defaultLocale]}
          </chakra.h4>

          {lvl1.routes.map(lvl2 => {
            if (!lvl2.routes) {
              return (
                <SidebarLink ml='-3' mt='2' key={lvl2.path} href={lvl2.path}>
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
              )
            }
          })}
        </Fragment>
      ))}
    </Box>
  )
}
