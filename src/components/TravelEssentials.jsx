export default function TravelEssentials() {
  const items = [
    {
      title: 'Carry cash',
      detail: 'ATMs thin out after Pokhara. Tea houses and jeeps still prefer NPR notes.',
    },
    {
      title: 'Visa on arrival',
      detail: 'Most passports can get a Nepal visa at Tribhuvan on landing — bring USD cash and a passport photo.',
    },
    {
      title: 'Best months',
      detail: 'October–November and March–April are the sweet spot for highways, ABC, and Lumbini pilgrimages.',
    },
    {
      title: 'Build buffer days',
      detail: 'Fog cancels domestic flights. Never book an international flight the morning you leave the mountains.',
    },
  ]

  return (
    <section className="essentials">
      <div className="section-head">
        <p className="section-label">Before you hop</p>
        <h2>What every Nepal route needs</h2>
      </div>
      <div className="essentials-grid">
        {items.map((item) => (
          <article key={item.title} className="essential-card">
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
