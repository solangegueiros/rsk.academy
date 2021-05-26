import { useRef } from 'react'

import { Flex, useColorModeValue, useUpdateEffect } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { RemoveScroll } from 'react-remove-scroll'

import { SidebarContent } from '@components'
import { getRoutes } from '@utils/getRoutes'

import { MobileNavHeader } from '../MobileNavHeader'
import { ScrollView } from '../ScrollView'

interface MobileNavContentProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileNavContent = ({ isOpen, onClose }: MobileNavContentProps): JSX.Element => {
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()

  const { asPath } = router
  const course = asPath.split('/')[2]
  const routes = getRoutes(course || 'dev')

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
              <MobileNavHeader onClose={onClose} />
              <ScrollView>
                <SidebarContent routes={routes} />
              </ScrollView>
            </Flex>
          </motion.div>
        </RemoveScroll>
      )}
    </AnimatePresence>
  )
}
