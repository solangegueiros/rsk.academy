import PropTypes from 'prop-types'
import { HStack, Icon, Text, VStack } from '@chakra-ui/react'
import { utcToZonedTime, format } from 'date-fns-tz'
import { IoCalendarOutline, IoTimeOutline } from 'react-icons/io5'

const TimeZone = ({ timeStr, spacing = 2 }) => {
  // eslint-disable-next-line babel/new-cap
  const timeZone = Intl?.DateTimeFormat().resolvedOptions().timeZone
  const date = new Date(timeStr).toISOString()

  const zonedTime = utcToZonedTime(date, timeZone)
  const day = format(zonedTime, 'dd-MM-yyyy')
  const time = format(zonedTime, 'HH:mm')

  return (
    <VStack spacing={spacing} align='start'>
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
    </VStack>
  )
}

TimeZone.propTypes = {
  timeStr: PropTypes.string.isRequired,
  spacing: PropTypes.number,
}

export default TimeZone
