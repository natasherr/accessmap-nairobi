import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Directory from './pages/Directory'
import VenueDetail from './pages/VenueDetail'
import ReportForm from './pages/ReportForm'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Footer from './components/Footer' 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/directory"  element={<Directory />} />
        <Route path="/venue/:id"  element={<VenueDetail />} />
        <Route path="/report"     element={<ReportForm />} />
        <Route path="/about"      element={<About />} />
        <Route path="*"           element={<NotFound />} />
      </Routes>
      <Footer /> 
    </BrowserRouter>
  )
}