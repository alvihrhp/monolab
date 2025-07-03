import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Gallery from './pages/Gallery'
import GalleryDetail from './pages/GalleryDetail'
import ColorTest from './components/ui/ColorTest'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/gallery" replace />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:slug" element={<GalleryDetail />} />
        <Route path="/colors" element={<ColorTest />} />
        <Route path="*" element={<Navigate to="/gallery" replace />} />
      </Routes>
    </Router>
  )
}

export default App
