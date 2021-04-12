import { getEvents } from '../../../lib/api'

export default async function handler(req, res) {
  try {
    const response = await getEvents()
    const event = response.find(e => e?.id === req.query.id)

    if (event) {
      res.status(200).json(event)
    } else {
      res.status(404).json(null)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
