import PropTypes from 'prop-types'
import { Text } from '@chakra-ui/react'
import { utcToZonedTime, format } from 'date-fns-tz'

const TimeZone = ({ timeStr, formatStr = 'yyyy-MM-dd HH:mm:ss', ...rest }) => {
  // eslint-disable-next-line babel/new-cap
  const timeZone = Intl?.DateTimeFormat().resolvedOptions().timeZone
  const date = new Date(timeStr).toISOString()

  const zonedTime = utcToZonedTime(date, timeZone)
  const time = format(zonedTime, formatStr)

  return (
    <>
      {time}{' '}
      <Text as='span' fontSize='0.8em' {...rest}>
        ({timeZone})
      </Text>
    </>
  )
}

TimeZone.propTypes = {
  timeStr: PropTypes.string.isRequired,
  formatStr: PropTypes.string,
}

export default TimeZone
