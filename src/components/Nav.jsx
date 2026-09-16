import { Link, NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="nav">
      <Link className="wordmark" to="/" aria-label="Baatohop home">
        <span className="wordmark-mark" aria-hidden="true">
          B
        </span>
        Baatohop
      </Link>
      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <a href="/#places">Destinations</a>
        <NavLink to="/hops/ktm-pkr">Experiences</NavLink>
        <a href="/#begin">Begin</a>
      </div>
      <Link className="btn btn-outline" to="/#begin">
        Start planning
      </Link>
    </nav>
  )
}
