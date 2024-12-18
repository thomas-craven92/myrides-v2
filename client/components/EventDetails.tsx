import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteEvent, fetchEventById } from '../apis/event-api-client';
import { useMutation, useQuery } from '@tanstack/react-query';


const EventDetails = () => {
  // Get the event ID from the URL using the useParams hook
  const { id } = useParams()
  // const eventData = fetchEventById(id)
  const navigate = useNavigate()

  const { data: eventInfo, isError, isPending, error } = useQuery({
    queryKey: ['EventInfo', id],
    queryFn: () => fetchEventById(Number(id)),
  })


  const deleteEventById = useMutation({
    mutationFn: (id: number) => deleteEvent(Number(id)),
    onSuccess: () => {
      navigate('/')
    },
    onError: (error) => {
      console.error('Failed to delete event:', error)
    }
  })

  const handleDelete = (eventId: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEventById.mutate(eventId);
    }
  }

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <section className="bg-gray-100 p-6 rounded-lg shadow-md max-w-xl mx-auto mt-8">

    <div>
    <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
      {eventInfo.name}
    </h1>
    <div>
    <img
      src={eventInfo.poster}
      alt={`${eventInfo.name} poster`}
      className="w-full h-auto rounded-lg mb-4 shadow-md"
    />
    </div>
    <p className="text-gray-700 mb-2 font-medium">{eventInfo.description}</p>
    <p className="text-gray-700 mb-2 font-medium">Location: {eventInfo.location}</p>
    <p className="text-gray-700 mb-4 font-medium">Date: {eventInfo.date}</p>
    <div className="flex justify-between items-center">
      <button
        className="bg-red-500 hover:bg-red-300 text-black py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 mr-4"
        onClick={() => handleDelete(Number(id))}
      >
        Delete Event
      </button>
      <Link to={`/events/${id}/edit`} className="bg-teal-500 hover:bg-red-700 text-black py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 mr-4">Update event</Link>
      <Link to="/" className="text-indigo-800 hover:underline font-medium">
        Back
      </Link>
    </div>
    </div>
  </section>
  
  );
};

export default EventDetails;
