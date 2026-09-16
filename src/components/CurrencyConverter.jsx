import { useEffect, useMemo, useState } from 'react'
import { api } from '../api/client'

function formatMoney(value, currency) {
  return new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'NPR' ? 0 : 2,
  }).format(value)
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('100')
  const [currency, setCurrency] = useState('USD')
  const [rates, setRates] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    api
      .rates()
      .then((data) => {
        setRates(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  const npr = useMemo(() => {
    const value = Number.parseFloat(amount)
    if (!rates || Number.isNaN(value)) return null
    const rate = currency === 'USD' ? rates.usdToNpr : rates.gbpToNpr
    return value * rate
  }, [amount, currency, rates])

  return (
    <section className="converter" id="converter">
      <div className="section-head">
        <p className="section-label">Budget in NPR</p>
        <h2>Quick currency converter</h2>
        <p className="section-copy">
          Most fares on Baatohop are in Nepali rupees. Convert US dollars or
          British pounds before you compare bus, jeep, or trek prices.
        </p>
      </div>
      <div className="converter-panel">
        <label>
          Amount
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>
        <label>
          From
          <select value={currency} onChange={(event) => setCurrency(event.target.value)}>
            <option value="USD">US dollar (USD)</option>
            <option value="GBP">British pound (GBP)</option>
          </select>
        </label>
        <div className="converter-result" aria-live="polite">
          <span className="converter-result-label">In Nepali rupees</span>
          <strong>{npr != null ? formatMoney(npr, 'NPR') : '—'}</strong>
          {rates ? (
            <p className="converter-rate">
              1 {currency} ≈{' '}
              {formatMoney(currency === 'USD' ? rates.usdToNpr : rates.gbpToNpr, 'NPR')}
            </p>
          ) : null}
        </div>
      </div>
      <p className="converter-note">
        {status === 'loading'
          ? 'Loading live rates…'
          : rates?.source === 'sample'
            ? 'Using sample rates. Reconfirm at the bank or exchange before you travel.'
            : `Rates from ${rates?.source}. Updated ${rates?.updatedAt ?? 'recently'}.`}
      </p>
    </section>
  )
}
