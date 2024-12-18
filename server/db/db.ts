import { Event, EventData } from '../../models/event-interface'
import db from './connection'

// CREATE

export async function addEvent(event: EventData) {
  const result = await db('events').insert({
    name: event.name,
    date: event.date,
    location: event.location,
    description: event.description,
  })
  // console.log(event)
  return result as number[]
}

// READ - ONE

export async function getAllEvents() {
  const events = await db('events').select(
    'id',
    'name',
    'date',
    'location',
    'description',
    'poster',
  )
  // console.log(events)
  return events as Event[]
}

// READ - ALL

export async function getEventById(id: number) {
  const event = await db('events')
    .where('id', id)
    .select('id', 'name', 'date', 'location', 'description', 'poster')
    .first()
  // console.log(event)
  return event as Event
}

// UPDATE

export async function updateEventById(id: number, event: Event) {
  const result = await db('events').where('id', id).update({
    name: event.name,
    date: event.date,
    location: event.location,
    description: event.description,
    poster: event.poster
  })

  // console.log(event)
  return result as number
}

// DELETE

export async function deleteEventById(id: number) {
  const result = await db('events').where('id', id).delete()
  // console.log(event)
  return result as number
}
