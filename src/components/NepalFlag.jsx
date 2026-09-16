export default function NepalFlag({ className = '', title = 'Flag of Nepal' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 44"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <path
        fill="#DC143C"
        stroke="#003893"
        strokeWidth="1.2"
        d="M16 1.5 L30.5 14.5 L30.5 29.5 L16 42.5 L1.5 29.5 L1.5 14.5 Z"
      />
      <path
        fill="#003893"
        d="M16 3.5 L28.5 14.8 L28.5 28.2 L16 39.5 L3.5 28.2 L3.5 14.8 Z"
      />
      <path fill="#DC143C" d="M16 5.5 L26.5 15.2 L26.5 27.8 L16 37.5 L5.5 27.8 L5.5 15.2 Z" />
      <circle cx="16" cy="15" r="4.2" fill="#fff" />
      <circle cx="16" cy="15" r="3.2" fill="#DC143C" />
      <circle cx="17.1" cy="14" r="2.6" fill="#fff" />
      <g fill="#fff" transform="translate(16 27)">
        <circle r="5.5" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <rect
            key={deg}
            x="-0.55"
            y="-8.2"
            width="1.1"
            height="3.2"
            transform={`rotate(${deg})`}
          />
        ))}
      </g>
    </svg>
  )
}
