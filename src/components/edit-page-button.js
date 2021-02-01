import { chakra, Icon, Stack, Link } from '@chakra-ui/react'
import { useI18n } from 'next-localization'
import { MdEdit } from 'react-icons/md'

export const EditPageButton = ({ href }) => {
  const { t } = useI18n()
  return (
    <Link href={href} isExternal>
      <Stack
        display='inline-flex'
        direction='row'
        spacing={1}
        align='center'
        opacity={0.7}
      >
        <Icon as={MdEdit} mr='1' />
        <chakra.span>{t('editPage')}</chakra.span>
      </Stack>
    </Link>
  )
}

export default EditPageButton
