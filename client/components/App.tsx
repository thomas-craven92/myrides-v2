import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <div className="flex-col space-y-4 min-h-screen">
      <Header />
      <Outlet />
      <Footer />
      </div>
    </>
  )
}

export default App
