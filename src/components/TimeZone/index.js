import PropTypes from 'prop-types'
import { HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { utcToZonedTime, format } from 'date-fns-tz'
import { IoCalendarOutline, IoTimeOutline } from 'react-icons/io5'

const TimeZone = ({ timeStr, spacing = 2, direction = 'column' }) => {
  // eslint-disable-next-line babel/new-cap
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

TimeZone.propTypes = {
  timeStr: PropTypes.string.isRequired,
  spacing: PropTypes.number,
  direction: PropTypes.string,
}

export default TimeZone
