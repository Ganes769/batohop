import { Link } from 'react-router-dom'
import Hero from './Hero'
import HopSearch from './HopSearch'

export default function Overlay({
  destinations = [],
  hops = [],
  from,
  to,
  onFrom,
  onTo,
  onSearch,
}) {
  return (
    <>
      <Hero destinations={destinations} hops={hops} />

      <section className="planner" id="plan">
        <p className="section-label">Plan a hop</p>
        <h2>From one place to the next in Nepal</h2>
        <p className="section-copy">
          Each search opens its own hop page, loaded from the catalog API — so
          a backend can replace this data later without changing the pages.
        </p>
        <HopSearch
          places={destinations}
          from={from}
          to={to}
          onFrom={onFrom}
          onTo={onTo}
          onSearch={onSearch}
        />
        <div className="quick-hops">
          {hops.map((hop) => (
            <Link key={hop.id} to={`/hops/${hop.id}`}>
              {hop.title}
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
