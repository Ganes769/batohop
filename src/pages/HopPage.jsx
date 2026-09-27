import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Nav from '../components/Nav'
import HopResults from '../components/HopResults'
import Footer from '../components/Footer'
import PrayerFlags from '../components/PrayerFlags'
import { api } from '../api/client'
import { useCatalog } from '../api/useCatalog'

export default function HopPage() {
  const { hopId } = useParams()
  const { destinations, hops } = useCatalog()
  const [hop, setHop] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true
    setStatus('loading')
    api
      .hop(hopId)
      .then((data) => {
        if (!active) return
        setHop(data)
        setStatus('ready')
      })
      .catch(() => {
        if (!active) return
        setHop(null)
        setStatus('missing')
      })
    return () => {
      active = false
    }
  }, [hopId])

  return (
    <div className="page hop-page">
      <header className="hop-top">
        <Nav />
        <PrayerFlags variant="ribbon" className="hop-top-prayer-flags" />
      </header>
      <main className="content">
        {status === 'loading' ? (
          <p className="status-copy">Loading this hop…</p>
        ) : null}
        {status === 'ready' ? (
          <HopResults hop={hop} destinations={destinations} />
        ) : null}
        {status === 'missing' ? (
          <section className="results">
            <div className="section-head">
              <p className="section-label">Hop not found</p>
              <h2>That route is not in the catalog yet</h2>
              <p className="section-copy">
                Pick another hop from the list, or search from the home page.
              </p>
              <Link className="btn btn-solid" to="/">
                Back home
              </Link>
            </div>
          </section>
        ) : null}
        <section className="places" id="more-hops">
          <div className="section-head">
            <p className="section-label">Other hops</p>
            <h2>More Nepal routes</h2>
          </div>
          <div className="hop-links">
            {hops.map((item) => (
              <Link
                key={item.id}
                className={`hop-link${item.id === hopId ? ' is-active' : ''}`}
                to={`/hops/${item.id}`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
        <Footer />
      </main>
    </div>
  )
}
