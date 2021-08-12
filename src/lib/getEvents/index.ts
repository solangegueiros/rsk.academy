/* eslint-disable camelcase */
import { GoogleSpreadsheet } from 'google-spreadsheet'

export type EventType = {
  id: string
  datetime: string
  title: string
  language: string
  speaker: string
  role: string
  twitter: string
  city: string
  description: string
  webinar_link: string
  rsvp_embed: string
  image: string
  video_link: string
  resources: string
}

const parseRows = (rows: string[][]) => {
  return rows.map(
    // eslint-disable-next-line complexity
    ([
      id,
      datetime,
      title,
      language,
      speaker,
      role,
      twitter,
      city,
      description,
      webinar_link,
      rsvp_embed,
      img,
      video_link,
      resources,
    ]) => {
      let image = null

      if (typeof img === 'string') {
        const match = img.match('/d/(.+)/')
        if (match) {
          image = `https://drive.google.com/uc?id=${match[1]}`
        }
      }

      return {
        id: id || null,
        datetime: datetime || null,
        title: title || null,
        language: language || null,
        speaker: speaker || null,
        role: role || null,
        twitter: twitter || null,
        city: city || null,
        description: description || null,
        webinar_link: webinar_link || null,
        rsvp_embed: rsvp_embed || null,
        image,
        video_link: video_link || null,
        resources: resources || null,
      }
    },
  )
}

export async function getEvents(): Promise<EventType[]> {
  try {
    const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID)
    await doc.useServiceAccountAuth({
      client_email: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    })

    await doc.loadInfo()
    const rows = await doc.sheetsByIndex[0].getRows()
    const mappedRows = rows.map(row => row._rawData)
    const parsedRows = parseRows(mappedRows)
    return parsedRows
  } catch (err) {
    console.error(err)
  }

  return []
}

export async function getEvent(id: string, locale: string): Promise<EventType> {
  const _id = id.split('-')[0] + '-' + locale

  try {
    const events = await getEvents()
    return events.find(e => e.id === _id)
  } catch (err) {
    console.error(err)
  }

  return null
}

export async function getEventPaths(locales: string[]): Promise<{ params: { id: string } }[]> {
  try {
    const events = await getEvents()
    const array = []
    locales.forEach(locale => {
      events.forEach(event => array.push({ params: { id: event.id.split('-')[0] }, locale }))
    })
    return array
  } catch (err) {
    console.error(err)
  }

  return []
}
