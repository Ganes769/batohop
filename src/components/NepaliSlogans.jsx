import { useEffect, useState } from 'react'

const SLOGANS = [
  { ne: 'बुद्धं शरणं गच्छामि', en: 'I take refuge in the Buddha' },
  { ne: 'धर्मं शरणं गच्छामि', en: 'I take refuge in the Dharma' },
  { ne: 'संघं शरणं गच्छामि', en: 'I take refuge in the Sangha' },
  { ne: 'ॐ मणि पद्मे हुँ', en: 'Om mani padme hum' },
  { ne: 'जय नेपाल', en: 'Victory to Nepal' },
  { ne: 'अतिथि देवो भव', en: 'The guest is god' },
  { ne: 'यात्रा नै ज्ञान हो', en: 'Travel itself is wisdom' },
  { ne: 'बाटो नै यात्रा हो', en: 'The road is the journey' },
  { ne: 'शान्ति', en: 'Peace' },
  { ne: 'स्वागत छ', en: 'You are welcome' },
  { ne: 'हिमाल हाम्रो गर्व हो', en: 'The Himalaya is our pride' },
  { ne: 'जहाँ बाटो, त्यहीं नेपाल', en: 'Where there is a road, there is Nepal' },
]

function nextRandomIndex(current) {
  let next = current
  while (next === current) {
    next = Math.floor(Math.random() * SLOGANS.length)
  }
  return next
}

export default function NepaliSlogans() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * SLOGANS.length))
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const holdMs = 4200
    const fadeMs = 520
    let fadeTimer
    const interval = window.setInterval(() => {
      setVisible(false)
      fadeTimer = window.setTimeout(() => {
        setIndex((current) => nextRandomIndex(current))
        setVisible(true)
      }, fadeMs)
    }, holdMs)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(fadeTimer)
    }
  }, [])

  const slogan = SLOGANS[index]

  return (
    <p className={`nepali-slogan${visible ? ' is-visible' : ''}`} aria-live="polite">
      <span className="nepali-slogan-ne" lang="ne">
        {slogan.ne}
      </span>
      <span className="nepali-slogan-en">{slogan.en}</span>
    </p>
  )
}
