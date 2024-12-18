import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

import App from './components/App'
import EventDetails from './components/EventDetails'
import EventList from './components/EventList'
import EditEvent from './components/EditEvent'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<EventList />} />
      <Route path="events/:id" element={<EventDetails />} />
      <Route path="events/:id/edit" element={<EditEvent />} />
    </Route>,
    
  ),
)

export default routes
