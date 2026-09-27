import { Link } from 'react-router-dom'

export default function Destinations({ destinations = [], hops = [], loading }) {
  return (
    <section className="places" id="places">
      <div className="section-head">
        <p className="section-label">Destinations</p>
        <h2>Valley, lakes, jungle, mountains &amp; plains</h2>
        <p className="section-copy">
          Ten places in Nepal — from Bhaktapur’s valley rim to Everest Base
          Camp. Open a hop between them for the full route, stops, cool facts,
          and sample fares.
        </p>
      </div>
      {loading ? <p className="status-copy">Loading places…</p> : null}
      <div className="place-grid">
        {destinations.map((destination) => {
          const hop = hops.find(
            (item) => item.to === destination.id || item.from === destination.id,
          )
          return (
            <article key={destination.id} className="place-card">
              {hop ? (
                <Link className="place-media" to={`/hops/${hop.id}`}>
                  <img
                    src={destination.portrait}
                    alt={`${destination.name}, Nepal`}
                  />
                </Link>
              ) : (
                <div className="place-media">
                  <img
                    src={destination.portrait}
                    alt={`${destination.name}, Nepal`}
                  />
                </div>
              )}
              <div className="place-body">
                <p className="hop-meta">{destination.region}</p>
                <h3>{destination.name}</h3>
                <p>{destination.summary}</p>
                {hop ? (
                  <Link className="btn btn-outline" to={`/hops/${hop.id}`}>
                    Open hop
                  </Link>
                ) : null}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
