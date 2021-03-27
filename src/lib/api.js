import { google } from 'googleapis'

const parseRows = rows => {
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

export async function getEvents() {
  try {
    const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly']
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes,
    )

    const sheets = google.sheets({ version: 'v4', auth: jwt })
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'events',
    })

    const rows = response.data.values

    if (rows.length) {
      return parseRows(rows.slice(1))
    }
  } catch (err) {
    console.error(err)
  }

  return []
}
