import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import HopPage from './pages/HopPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hops/:hopId" element={<HopPage />} />
    </Routes>
  )
}
