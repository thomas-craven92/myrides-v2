import { ChangeEvent, FormEvent, useState } from "react"
import { addEvent } from "../apis/event-api-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { EventData } from "../../models/event-interface"


function AddEventForm() {

  const [formState, setFormState] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
    poster: '',
  })

  const queryClient = useQueryClient()
  
  const addEventMutation = useMutation({
    mutationFn: (event: EventData) => addEvent(event),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    console.log('adding', formState.name)
    addEventMutation.mutate({
      name: formState.name,
      date: formState.date,
      location: formState.location,
      description: formState.description,
      poster: formState.poster
    })
  }

  const handleChange = (
    evt: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = evt.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

return (
<form onSubmit={handleSubmit} className="space-y-4 bg-violet-100 p-6 rounded-lg shadow-md max-w-lg mx-auto">
  {/* Event Name */}<h2 className="flex justify-center">Add event</h2>
  <div className="flex flex-col">
    <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
      Event Name
    </label>
    <input
      id="name"
      name="name"
      value={formState.name}
      onChange={handleChange}
      required
      placeholder="Enter the event name"
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
    />
  </div>

  {/* Event Date */}
  <div className="flex flex-col">
    <label htmlFor="date" className="mb-1 text-sm font-medium text-gray-700">
      Event Date
    </label>
    <input
      id="date"
      name="date"
      type="date"
      value={formState.date}
      onChange={handleChange}
      required
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
    />
  </div>

  {/* Event Location */}
  <div className="flex flex-col">
    <label htmlFor="location" className="mb-1 text-sm font-medium text-gray-700">
      Event Location
    </label>
    <input
      id="location"
      name="location"
      value={formState.location}
      onChange={handleChange}
      required
      placeholder="Enter the event location"
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
    />
  </div>

    {/* Event Description */}
    <div className="flex flex-col">
    <label htmlFor="description" className="mb-1 text-sm font-medium text-gray-700">
      Event Description
    </label>
    <input
      id="description"
      name="description"
      value={formState.description}
      onChange={handleChange}
      required
      placeholder="Enter the event description"
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
    />
  </div>

    {/* Event Poster */}
    <div className="flex flex-col">
    <label htmlFor="poster" className="mb-1 text-sm font-medium text-gray-700">
      Event Poster
    </label>
    <input
      id="poster"
      name="poster"
      value={formState.poster}
      onChange={handleChange}
      required
      placeholder="Enter the event poster"
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-slate-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    Add Event
  </button>
</form>
)}

export default AddEventForm