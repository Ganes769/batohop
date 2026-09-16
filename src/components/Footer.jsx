import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <Link className="wordmark" to="/" aria-label="Baatohop home">
        <span className="wordmark-mark" aria-hidden="true">
          B
        </span>
        Baatohop
      </Link>
      <p>Nepal, from one place to the next.</p>
      <p className="credits">
        Fares are sample 2026 figures — always reconfirm before you travel.
      </p>
    </footer>
  )
}
