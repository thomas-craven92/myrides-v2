import express from "express";
import * as db from '../db/db'

const router = express.Router()
export default router

// GET all api/v1/events/
router.get('/', async (req, res) => {
  try{
      const events = await db.getAllEvents()
      res.json(events)
  } catch (error){
    if(error instanceof Error){
      console.error(error.message)
    } else console.error('unknown error')
    res.sendStatus(500)
}
})

// GET one api/v1/events/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const event = await db.getEventById(Number(id)) // or +id
    res.json(event)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else console.error('unknown error')
    res.sendStatus(500)
  }
})

// POST api/v1/events
router.post('/', async (req, res) => {
  try {
    const newEvent = req.body
    const id = await db.addEvent(newEvent)
    res.json({...newEvent, id: id[0]})
  } catch (error){
    if(error instanceof Error){
      console.error(error.message)
    } else console.error('unknown error')
    res.sendStatus(500)
  }
})

// PATCH api/v1/events/:id
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updatedEvent = req.body 
    await db.updateEventById(Number(id), updatedEvent) // +id
    res.sendStatus(200)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else console.error('unknown error')
    res.sendStatus(500)
  }
})

// DELETE api/v1/events/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await db.deleteEventById(Number(id)) // +id
    res.sendStatus(200)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else console.error('unknown error')
    res.sendStatus(500)
  }
})