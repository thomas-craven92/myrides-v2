import { fetchAllEvents } from "../apis/event-api-client"
import { useQuery } from "@tanstack/react-query"
import {useNavigate} from 'react-router-dom'
import AddEventForm from "./AddEventForm"

function EventList() {

 
  const { data, isPending, isError } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchAllEvents(),
  })

  const navigate = useNavigate()

  const handleEventClick = (id: number) => {
    navigate(`/events/${id}`)}

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>No moto!</p>
  }


return (
  <div>
  <section className="grow p-4 rounded-lg">
    <ul className="mb-4 space-y-3">
      {data.map((event) => (
        <li key={event.id} className="p-2 bg-amber-100 rounded-lg shadow-sm hover:bg-gray-50">
            <button onClick={() => handleEventClick(event.id)}>{event.name} - {event.date} - {event.location}</button>
        </li>
      ))}
    </ul>
</section>
<AddEventForm />
</div>
)}

export default EventList