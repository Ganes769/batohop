import { useState } from 'react'

export default function Begin({ hops = [] }) {
  const [sent, setSent] = useState(false)

  return (
    <section className="begin" id="begin">
      <div className="begin-copy">
        <p className="section-label">Start planning</p>
        <h2>Tell us which hop you want</h2>
        <p className="section-copy">
          Sample fares are in the search. If you want a jeep with Chitwan stops,
          a guide to ABC, or a pilgrimage hop to Lumbini with a Bhairahawa
          flight, write — we will stitch the road into one plan.
        </p>
      </div>
      <form
        className="begin-form"
        onSubmit={(event) => {
          event.preventDefault()
          setSent(true)
        }}
      >
        {sent ? (
          <p className="begin-thanks">
            Received. We will come back with a hop, a mode, and a real quote.
          </p>
        ) : (
          <>
            <label>
              Name
              <input name="name" type="text" placeholder="Sita Gurung" required />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              Preferred hop
              <select name="hop" defaultValue="ktm-pkr">
                {hops.length > 0 ? (
                  hops.map((hop) => (
                    <option key={hop.id} value={hop.id}>
                      {hop.title}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="ktm-pkr">Kathmandu → Pokhara</option>
                    <option value="pkr-abc">Pokhara → ABC Camp</option>
                    <option value="ktm-abc">Kathmandu → ABC Camp</option>
                    <option value="ktm-lumbini">Kathmandu → Lumbini</option>
                  </>
                )}
              </select>
            </label>
            <button className="btn btn-solid" type="submit">
              Request this hop
            </button>
          </>
        )}
      </form>
    </section>
  )
}
