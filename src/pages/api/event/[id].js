import { getEvents } from '../../../lib/api'

export default async function handler(req, res) {
  const response = await getEvents()
  const event = response.find(id => id === req.query.id)
  res.status(200).json(event)
}
