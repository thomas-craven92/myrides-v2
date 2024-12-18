import request from 'superagent'
import { Event, EventData } from '../../models/event-interface'

// GET ALL

export async function fetchAllEvents() {
  const result = await request.get('/api/v1/events/')
  console.log(result.body)
  return result.body as Event[]
}

// GET ONE

export async function fetchEventById(id: number) {
  const result = await request.get(`/api/v1/events/${id}`)
  console.log(result.body)
  return result.body as Event
}

// Create

export async function addEvent(event: EventData) {
  const result = await request.post('/api/v1/events/').send(event)
  console.log(result.body)
  return result.body as Event
}

// Update

export async function updateEvent(id: number, event: Event) {
  const result = await request.patch(`/api/v1/events/${id}`).send(event)
  console.log(result.statusCode)
  return
}

// Delete

export async function deleteEvent(id: number) {
  const result = await request.delete(`/api/v1/events/${id}`)
  console.log(result.statusCode)
  return
}
