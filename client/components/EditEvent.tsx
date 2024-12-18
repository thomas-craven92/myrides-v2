import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { EventData } from '../../models/event-interface'
import { fetchEventById, updateEvent } from '../apis/event-api-client'

function EditEvent() {
  const { id } = useParams()

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const [formState, setFormState] = useState<EventData>({
    name: '',
    date: '',
    location: '',
    description: '',
    poster: '',
  })

  const { data, isError, isPending } = useQuery({
    queryKey: ['event', id],
    queryFn: () => fetchEventById(Number(id)),
  })

  const editEventMutation = useMutation({
    mutationFn: (updatedEvent: EventData) =>
      updateEvent(Number(id), updatedEvent),
    onSuccess: () => {
      queryClient.invalidateQueries(['events'])
      navigate(`/events/${id}`)
    },
    onError: (error) => {
      console.error('Failed to edit event:', error)
    },
  })

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState, 
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (formState) {
      editEventMutation.mutate(formState)
    }
  }

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Error loading event data.</p>

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Edit Event</h2>

      {/* Event Name */}
      <div className="flex flex-col">
        <label
          htmlFor="name"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          Event Name
        </label>
        <input
          id="name"
          name="name"
          value={formState?.name}
          onChange={handleChange}
          placeholder={data.name}
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />
      </div>

      {/* Event Date */}
      <div className="flex flex-col">
        <label
          htmlFor="date"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          Event Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={formState?.date || ''}
          placeholder={data.date}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />
      </div>

      {/* Event Location */}
      <div className="flex flex-col">
        <label
          htmlFor="location"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          Event Location
        </label>
        <input
          id="location"
          name="location"
          value={formState?.location || ''}
          placeholder={data.location}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />
      </div>

      {/* Event Description */}
      <div className="flex flex-col">
        <label
          htmlFor="description"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          Event Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formState?.description || ''}
          placeholder={data.description}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />
      </div>

      {/* Event Poster */}
      <div className="flex flex-col">
        <label
          htmlFor="poster"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          Event Poster
        </label>
        <textarea
          id="poster"
          name="poster"
          value={formState?.poster}
          placeholder={data.poster}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-pink-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Save Changes
      </button>
    </form>
  )
}

export default EditEvent
