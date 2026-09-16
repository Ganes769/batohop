export default function HopSearch({
  places = [],
  from,
  to,
  onFrom,
  onTo,
  onSearch,
}) {
  return (
    <form
      className="hop-search"
      onSubmit={(event) => {
        event.preventDefault()
        onSearch()
      }}
    >
      <label>
        From
        <select value={from} onChange={(event) => onFrom(event.target.value)}>
          {places.map((place) => (
            <option key={place.id} value={place.id}>
              {place.name}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        className="swap"
        aria-label="Swap places"
        onClick={() => {
          onFrom(to)
          onTo(from)
        }}
      >
        ⇄
      </button>
      <label>
        To
        <select value={to} onChange={(event) => onTo(event.target.value)}>
          {places.map((place) => (
            <option key={place.id} value={place.id}>
              {place.name}
            </option>
          ))}
        </select>
      </label>
      <button className="btn btn-solid" type="submit">
        Open hop
      </button>
    </form>
  )
}
