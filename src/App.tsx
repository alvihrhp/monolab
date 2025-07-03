import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Gallery from './pages/Gallery'
import GalleryDetail from './pages/GalleryDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/gallery" replace />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:slug" element={<GalleryDetail />} />
        <Route path="*" element={<Navigate to="/gallery" replace />} />
      </Routes>
    </Router>
  )
}

export default App
