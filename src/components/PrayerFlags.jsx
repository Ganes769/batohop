/**
 * Traditional Tibetan lungta colours — canonical five-element order.
 * Blue · White · Red · Green · Yellow
 */
export const PRAYER_FLAG_COLORS = [
  { id: 'blue', fill: '#0066B3', ink: 'rgba(255,255,255,0.42)' },
  { id: 'white', fill: '#FFFFFF', ink: 'rgba(20,18,15,0.24)', border: true },
  { id: 'red', fill: '#D71921', ink: 'rgba(255,255,255,0.42)' },
  { id: 'green', fill: '#00843D', ink: 'rgba(255,255,255,0.42)' },
  { id: 'yellow', fill: '#FDB913', ink: 'rgba(20,18,15,0.26)' },
]

const BLOCK_ROWS = [
  [7, 5, 7, 5],
  [6, 8, 6],
  [5, 7, 5, 7],
  [8, 6, 8],
  [6, 5, 6, 5],
  [7, 6, 7],
]

function buildSequence(repeat = 1) {
  const list = []
  for (let pass = 0; pass < repeat; pass += 1) {
    for (const flag of PRAYER_FLAG_COLORS) {
      list.push({ ...flag, key: `${flag.id}-${pass}` })
    }
  }
  return list
}

function MantraBlocks({ ink }) {
  const startY = 11
  const rowHeight = 3.2
  const gap = 1

  return (
    <g>
      {BLOCK_ROWS.map((row, rowIndex) => {
        let x = 5
        const y = startY + rowIndex * (rowHeight + gap)
        return (
          <g key={`row-${rowIndex}`}>
            {row.map((width, blockIndex) => {
              const rect = (
                <rect
                  key={`${rowIndex}-${blockIndex}`}
                  x={x}
                  y={y}
                  width={width}
                  height={rowHeight}
                  rx="0.35"
                  fill={ink}
                />
              )
              x += width + 0.9
              return rect
            })}
          </g>
        )
      })}
    </g>
  )
}

function LungtaFlag({ flag }) {
  return (
    <g className={`prayer-flags__unit prayer-flags__unit--${flag.id}`}>
      <line x1="16" y1="0" x2="16" y2="4.5" stroke="#8a7b68" strokeWidth="1.1" strokeLinecap="round" />
      <rect
        x="1"
        y="4.5"
        width="30"
        height="36"
        fill={flag.fill}
        stroke={flag.border ? 'rgba(20,18,15,0.16)' : 'rgba(0,0,0,0.07)'}
        strokeWidth="0.55"
      />
      <MantraBlocks ink={flag.ink} />
      <path
        d="M2 39.5 L16 37.5 L30 39.5"
        fill="none"
        stroke={flag.ink}
        strokeWidth="0.65"
        strokeLinecap="round"
        opacity="0.6"
      />
    </g>
  )
}

function LungtaString({ flags, unitWidth, viewWidth }) {
  const totalWidth = flags.length * unitWidth
  const offset = viewWidth ? (viewWidth - totalWidth) / 2 : 0
  const height = 48

  return (
    <svg
      className="prayer-flags__svg"
      viewBox={`0 0 ${viewWidth || totalWidth} ${height}`}
      preserveAspectRatio="xMidYMin meet"
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <path
        d={`M0 2.5 H${viewWidth || totalWidth}`}
        fill="none"
        stroke="#9a8b78"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {flags.map((flag, index) => (
        <g key={flag.key} transform={`translate(${offset + index * unitWidth}, 0) scale(${unitWidth / 32})`}>
          <LungtaFlag flag={flag} />
        </g>
      ))}
    </svg>
  )
}

export default function PrayerFlags({ variant = 'string', repeat = 1, className = '' }) {
  if (variant === 'ribbon') {
    return (
      <div
        className={`prayer-flags prayer-flags--ribbon${className ? ` ${className}` : ''}`}
        aria-hidden="true"
      >
        {PRAYER_FLAG_COLORS.map((flag) => (
          <span
            key={flag.id}
            className={`prayer-flags__ribbon-segment prayer-flags__ribbon-segment--${flag.id}`}
          />
        ))}
      </div>
    )
  }

  const presets = {
    banner: { unitWidth: 36, repeat: 2 },
    divider: { unitWidth: 30, repeat: 1 },
    kicker: { unitWidth: 24, repeat: 1 },
    string: { unitWidth: 30, repeat: 1 },
  }

  const preset = presets[variant] ?? presets.string
  const flags = buildSequence(preset.repeat ?? repeat)

  return (
    <div
      className={`prayer-flags prayer-flags--${variant}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
      role="presentation"
    >
      <LungtaString
        flags={flags}
        unitWidth={preset.unitWidth}
        viewWidth={preset.viewWidth}
      />
    </div>
  )
}
