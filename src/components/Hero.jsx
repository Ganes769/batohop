import { Link } from 'react-router-dom'
import Nav from './Nav'
import NepalFlag from './NepalFlag'
import PrayerFlags from './PrayerFlags'
import NepaliSlogans from './NepaliSlogans'

export default function Hero({ destinations = [], hops = [] }) {
  return (
    <header className="hero" id="home">
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-glow hero-glow-crimson" />
        <div className="hero-glow hero-glow-blue" />
        <PrayerFlags variant="banner" className="hero-prayer-banner" />
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
            <PrayerFlags variant="kicker" className="hero-kicker-flags" />
            <span>Nepal · road by road</span>
          </p>
          <h1>
            Hop Nepal
            <span className="hero-title-accent">from valley to sanctuary</span>
          </h1>
          <p className="lede">
            Baatohop is a travel guide for real Nepal routes — Kathmandu,
            Pokhara, Chitwan, ABC, and Lumbini. Pick a hop, compare bus, jeep,
            flight, or trek, convert USD or GBP to NPR, and read every stop with
            cool facts and sample prices.
          </p>
          <NepaliSlogans />
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
      </div>
    </header>
  )
}
