import { useEffect, useState } from 'react'

export default function HopResults({ hop, destinations = [] }) {
  const [openMode, setOpenMode] = useState(0)

  useEffect(() => {
    setOpenMode(0)
  }, [hop?.id])

  if (!hop) {
    return (
      <section className="results" id="results">
        <div className="section-head">
          <p className="section-label">Search a hop</p>
          <h2>Pick two different places in Nepal</h2>
          <p>
            Kathmandu → Pokhara, Pokhara → ABC, Kathmandu → Lumbini, and more
            are live — stops, cool facts, and every fare in one guide.
          </p>
        </div>
      </section>
    )
  }

  const fromPlace = destinations.find((item) => item.id === hop.from)
  const toPlace = destinations.find((item) => item.id === hop.to)
  if (!fromPlace || !toPlace) return null

  return (
    <section className="results" id="results">
      <div className="hop-banner">
        <figure>
          <img src={fromPlace.image} alt={fromPlace.name} />
          <figcaption>{fromPlace.name}</figcaption>
        </figure>
        <span className="hop-banner-arrow" aria-hidden="true">
          →
        </span>
        <figure>
          <img src={toPlace.image} alt={toPlace.name} />
          <figcaption>{toPlace.shortName}</figcaption>
        </figure>
      </div>

      <header className="hop-intro">
        <p className="section-label">Your hop, in full</p>
        <h2>{hop.title}</h2>
        <p className="hop-summary">{hop.summary}</p>
        <dl className="hop-stats">
          <div>
            <dt>Distance / shape</dt>
            <dd>{hop.distance}</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>{hop.duration}</dd>
          </div>
          <div>
            <dt>Best season</dt>
            <dd>{hop.bestSeason}</dd>
          </div>
          <div>
            <dt>Modes</dt>
            <dd>{hop.modes.length} ways to go</dd>
          </div>
        </dl>
      </header>

      <nav className="hop-toc" aria-label="Hop sections">
        <a href="#hop-between">Between</a>
        <a href="#hop-arrive">When you arrive</a>
        <a href="#hop-modes">Travel &amp; prices</a>
      </nav>

      <section className="hop-block" id="hop-between">
        <h3>What you can do between</h3>
        <p className="hop-block-lede">
          The hop is the road or the trail — not just the two pins. Walk it in
          order.
        </p>
        <ol className="timeline">
          {hop.alongTheWay.map((stop, index) => (
            <li key={stop.name}>
              <span className="timeline-num">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p className="timeline-when">{stop.when}</p>
                <h4>{stop.name}</h4>
                <p>{stop.detail}</p>
                {stop.fact ? (
                  <p className="stop-fact">
                    <strong>Did you know?</strong> {stop.fact}
                  </p>
                ) : null}
                <div className="timeline-meta">
                  {stop.duration ? <span>{stop.duration}</span> : null}
                  {stop.cost ? <span>{stop.cost}</span> : null}
                  {stop.do ? <span>{stop.do}</span> : null}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="hop-block" id="hop-arrive">
        <h3>When you arrive</h3>
        <p className="hop-block-lede">
          Things worth doing at the far end, with a sample price attached.
        </p>
        <div className="activity-grid">
          {hop.atDestination.map((item) => {
            const activity = typeof item === 'string' ? { name: item } : item
            return (
              <article key={activity.name} className="activity-card">
                <h4>{activity.name}</h4>
                {activity.time ? <p className="activity-time">{activity.time}</p> : null}
                {activity.price ? <p className="activity-price">{activity.price}</p> : null}
                {activity.detail ? <p>{activity.detail}</p> : null}
                {activity.fact ? (
                  <p className="stop-fact">
                    <strong>Did you know?</strong> {activity.fact}
                  </p>
                ) : null}
              </article>
            )
          })}
        </div>
      </section>

      <section className="hop-block" id="hop-modes">
        <h3>Modes of travel &amp; sample prices</h3>
        <p className="hop-block-lede">
          Compare at a glance, then open a mode for the full road — pickup,
          extras, and who it suits.
        </p>
        <div className="fare-table-wrap">
          <table className="fare-table">
            <thead>
              <tr>
                <th>Mode</th>
                <th>Time</th>
                <th>Price</th>
                <th>Best for</th>
              </tr>
            </thead>
            <tbody>
              {hop.modes.map((mode) => (
                <tr key={mode.id}>
                  <td>
                    <strong>{mode.name}</strong>
                    <span>{mode.tag}</span>
                  </td>
                  <td>{mode.duration}</td>
                  <td>
                    {mode.price}
                    <small>{mode.priceUsd}</small>
                  </td>
                  <td>{mode.goodFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mode-list">
          {hop.modes.map((mode, index) => {
            const open = openMode === index
            return (
              <article key={mode.id} className={`mode-row${open ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="mode-toggle"
                  aria-expanded={open}
                  onClick={() => setOpenMode(open ? -1 : index)}
                >
                  <span className="mode-tag">{mode.tag}</span>
                  <h4>{mode.name}</h4>
                  <p className="mode-price">
                    {mode.price}
                    <span>{mode.priceUsd}</span>
                  </p>
                  <span className="mode-chevron">{open ? '–' : '+'}</span>
                </button>
                {open ? (
                  <div className="mode-body">
                    <dl>
                      <div>
                        <dt>Time</dt>
                        <dd>{mode.duration}</dd>
                      </div>
                      <div>
                        <dt>From</dt>
                        <dd>{mode.from}</dd>
                      </div>
                      <div>
                        <dt>To</dt>
                        <dd>{mode.to}</dd>
                      </div>
                      <div>
                        <dt>Best for</dt>
                        <dd>{mode.goodFor}</dd>
                      </div>
                    </dl>
                    <p>{mode.detail}</p>
                    <div className="mode-split">
                      <div>
                        <h5>Included</h5>
                        <ul>
                          {mode.includes.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5>Budget extra</h5>
                        <ul>
                          {mode.extras.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>
        <p className="fineprint">{hop.notes}</p>
      </section>
    </section>
  )
}
