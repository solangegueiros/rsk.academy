import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import { Flex, useColorModeValue, useUpdateEffect } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { RemoveScroll } from 'react-remove-scroll'

import { getRoutes } from '@/layouts/mdx'
import { SidebarContent } from '@/components/all'
import { ScrollView } from '../ScrollView'
import { MobileNavHeader } from '../MobileNavHeader'

export const MobileNavContent = ({ isOpen, onClose }) => {
  const [shadow, setShadow] = useState()

  const closeBtnRef = useRef()
  const router = useRouter()

  const { pathname } = router

  const bg = useColorModeValue('white', 'dark.500')

  useUpdateEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus()
      })
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <RemoveScroll forwardProps>
          <motion.div
            transition={{ duration: 0.08 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Flex
              direction='column'
              w='100%'
              bg={bg}
              h='100vh'
              overflow='auto'
              pos='fixed'
              top='0'
              left='0'
              zIndex='modal'
              pb='8'
            >
              <MobileNavHeader shadow={shadow} onClose={onClose} />
              <ScrollView
                onScroll={scrolled => {
                  setShadow(scrolled ? 'md' : undefined)
                }}
              >
                <SidebarContent
                  pathname={pathname}
                  routes={getRoutes(pathname)}
                />
              </ScrollView>
            </Flex>
          </motion.div>
        </RemoveScroll>
      )}
    </AnimatePresence>
  )
}

MobileNavContent.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}
