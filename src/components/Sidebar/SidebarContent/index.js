import PropTypes from 'prop-types'
import { Badge, Box, chakra, Stack, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import * as React from 'react'
import _ from 'lodash'

import { SidebarCategory, SidebarLink } from '@/components/all'

export const SidebarContent = props => {
  const { routes, pathname, contentRef } = props
  const { locale, defaultLocale } = useRouter()

  const color = useColorModeValue('primary.500', 'light.500')
  const newBadgeColor = useColorModeValue('white', 'dark.500')
  const newBadgeColorScheme = useColorModeValue('primary', 'light')

  return (
    <Box>
      {routes.map((lvl1, idx) => (
        <React.Fragment key={idx}>
          {lvl1.heading && (
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
          )}

          {lvl1.routes.map((lvl2, index) => {
            if (!lvl2.routes) {
              return (
                <SidebarLink
                  ml='-3'
                  mt='2'
                  key={lvl2.path}
                  href={`${lvl2.path}/${locale}`}
                >
                  {lvl2.title[locale] || lvl2.title[defaultLocale]}
                </SidebarLink>
              )
            }

            const selected = pathname.startsWith(`${lvl2.path}/${locale}`)
            const opened = selected || lvl2.open

            // eslint-disable-next-line no-negated-condition
            const sortedRoutes = !!lvl2.sort
              ? _.sortBy(
                  lvl2.routes,
                  i => i.title[locale] || i.title[defaultLocale],
                )
              : lvl2.routes

            return (
              <SidebarCategory
                contentRef={contentRef}
                key={`${lvl2.path}/${locale}${index}`}
                title={lvl2.title[locale]}
                selected={selected}
                opened={opened}
              >
                <Stack as='ul' spacing={0}>
                  {sortedRoutes.map(lvl3 => (
                    <SidebarLink
                      as='li'
                      key={lvl3.path}
                      href={`${lvl3.path}/${locale}`}
                    >
                      <chakra.span>
                        {lvl3.title[locale] || lvl3.title[defaultLocale]}
                      </chakra.span>
                      {lvl3.new && (
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
                </Stack>
              </SidebarCategory>
            )
          })}
        </React.Fragment>
      ))}
    </Box>
  )
}

SidebarContent.propTypes = {
  routes: PropTypes.array.isRequired,
  pathname: PropTypes.string,
  contentRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
}
