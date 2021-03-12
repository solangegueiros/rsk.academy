import { useColorModeValue, Button, Box } from '@chakra-ui/react'
import { useRLogin } from '@/hooks/useRLogin'
import { useI18n } from 'next-localization'

export const Locked = () => {
  const { activate } = useRLogin()
  const colorScheme = useColorModeValue('primary', 'light')
  const { t } = useI18n()

  return (
    <Box>
      <Button onClick={activate} colorScheme={colorScheme}>
        {t('connect')}
      </Button>
    </Box>
  )
}
