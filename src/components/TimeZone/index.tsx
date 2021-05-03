import { HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { utcToZonedTime, format } from 'date-fns-tz'
import { IoCalendarOutline, IoTimeOutline } from 'react-icons/io5'

interface TimeZoneProps {
  timeStr: string
  spacing?: number
  direction?: 'column' | 'row'
}

const TimeZone = ({ timeStr, spacing = 2, direction = 'column' }: TimeZoneProps): JSX.Element => {
  const timeZone = Intl?.DateTimeFormat().resolvedOptions().timeZone
  const date = new Date(timeStr).toISOString()

  const zonedTime = utcToZonedTime(date, timeZone)
  const day = format(zonedTime, 'dd-MM-yyyy')
  const time = format(zonedTime, 'HH:mm')

  return (
    <Stack direction={direction} spacing={spacing} align='start'>
      <HStack>
        <Icon as={IoCalendarOutline} />
        <Text>{day}</Text>
      </HStack>
      <HStack>
        <Icon as={IoTimeOutline} />
        <Text>
          {time}{' '}
          <Text as='span' fontSize='0.8em'>
            ({timeZone})
          </Text>
        </Text>
      </HStack>
    </Stack>
  )
}

export default TimeZone
