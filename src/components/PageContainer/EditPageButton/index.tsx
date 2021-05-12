import { chakra, Icon, Stack, Link } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { MdEdit } from 'react-icons/md'

export const EditPageButton = ({ href }: { href: string }): JSX.Element => {
  const { t } = useTranslation('common')
  return (
    <Link href={href} rel='noreferrer' isExternal>
      <Stack display='inline-flex' direction='row' spacing={1} align='center' opacity={0.7}>
        <Icon as={MdEdit} mr='1' />
        <chakra.span>{t`editPage`}</chakra.span>
      </Stack>
    </Link>
  )
}
