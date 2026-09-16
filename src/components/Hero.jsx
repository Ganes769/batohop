import { Link } from 'react-router-dom'
import Nav from './Nav'
import NepalFlag from './NepalFlag'

export default function Hero({ destinations = [], hops = [] }) {
  return (
    <header className="hero" id="home">
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-glow hero-glow-crimson" />
        <div className="hero-glow hero-glow-blue" />
        <div className="hero-prayer-flags">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <svg className="hero-mountains" viewBox="0 0 1440 220" preserveAspectRatio="none">
          <path
            d="M0 220V140l120-70 90 48 110-88 130 62 100-54 160 96 120-58 140 72 170-110 150 82 120-44 230 112V220z"
            fill="currentColor"
          />
          <path
            d="M0 220V168l200-52 180 36 220-64 260 48 180-28 400 72V220z"
            fill="currentColor"
            opacity="0.45"
          />
        </svg>
      </div>

      <Nav />

      <div className="hero-body">
        <div className="hero-copy">
          <p className="hero-kicker">
            <NepalFlag className="hero-flag" />
            <span>Nepal · road by road</span>
          </p>
          <h1>
            Hop Nepal
            <span className="hero-title-accent">from valley to sanctuary</span>
          </h1>
          <p className="lede">
            Baatohop is a travel guide for real Nepal routes — Kathmandu,
            Pokhara, ABC, and Lumbini. Pick a hop, compare bus, jeep, flight, or
            trek, convert USD or GBP to NPR, and read every stop with cool facts
            and sample prices.
          </p>
          <div className="hero-actions">
            <a className="btn btn-nepal" href="#plan">
              Search a hop
            </a>
            <Link className="btn btn-outline" to="/hops/ktm-lumbini">
              Kathmandu → Lumbini
            </Link>
          </div>
          <dl className="hero-stats">
            <div>
              <dt>Places</dt>
              <dd>{destinations.length}</dd>
            </div>
            <div>
              <dt>Live hops</dt>
              <dd>{hops.length}</dd>
            </div>
            <div>
              <dt>Best season</dt>
              <dd>Oct – Nov</dd>
            </div>
          </dl>
        </div>

        <div className="hero-routes">
          <p className="hero-routes-label">Start with a popular hop</p>
          <div className="hero-route-grid">
            {destinations.map((place) => {
              const hop =
                hops.find((item) => item.to === place.id) ??
                hops.find((item) => item.from === place.id)
              const body = (
                <>
                  <img
                    src={place.portrait || place.image}
                    alt={`${place.name}, Nepal`}
                  />
                  <div className="hero-route-body">
                    <span className="hero-route-index">{place.index}</span>
                    <h2>{place.shortName || place.name}</h2>
                    <p>{place.region}</p>
                    {hop ? <span className="hero-route-cta">Open hop →</span> : null}
                  </div>
                </>
              )

              if (hop) {
                return (
                  <Link key={place.id} className="hero-route-card" to={`/hops/${hop.id}`}>
                    {body}
                  </Link>
                )
              }

              return (
                <article key={place.id} className="hero-route-card">
                  {body}
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}
