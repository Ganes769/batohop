import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Overlay from '../components/Overlay'
import Destinations from '../components/Destinations'
import CurrencyConverter from '../components/CurrencyConverter'
import TravelEssentials from '../components/TravelEssentials'
import Begin from '../components/Begin'
import Footer from '../components/Footer'
import { api } from '../api/client'
import { useCatalog } from '../api/useCatalog'

export default function HomePage() {
  const navigate = useNavigate()
  const { destinations, hops, loading, error } = useCatalog()
  const [from, setFrom] = useState('kathmandu')
  const [to, setTo] = useState('pokhara')

  const openHop = async (nextFrom = from, nextTo = to) => {
    setFrom(nextFrom)
    setTo(nextTo)
    try {
      const hop = await api.findHop(nextFrom, nextTo)
      navigate(`/hops/${hop.id}`)
    } catch {
      navigate(`/hops/ktm-pkr`)
    }
  }

  return (
    <div id="top" className="page">
      <Overlay
        destinations={destinations}
        hops={hops}
        from={from}
        to={to}
        onFrom={setFrom}
        onTo={setTo}
        onSearch={() => openHop()}
      />
      <main className="content">
        {error ? (
          <p className="status-copy">Could not load destinations from the API.</p>
        ) : null}
        <Destinations destinations={destinations} hops={hops} loading={loading} />
        <CurrencyConverter />
        <TravelEssentials />
        <Begin hops={hops} />
        <Footer />
      </main>
    </div>
  )
}
