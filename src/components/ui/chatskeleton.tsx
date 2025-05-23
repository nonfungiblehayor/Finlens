export const ChatSkeleton = () => {
    return (
        <svg
  width="130"
  height="24"
  viewBox="0 0 130 24"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-label="Loading chat">
  <defs>
    <linearGradient id="shimmer">
      <stop offset="0%" stop-color="#f3f3f3">
        <animate attributeName="offset" values="-2;1" dur="1.2s" repeatCount="indefinite" />
      </stop>
      <stop offset="50%" stop-color="#e0e0e0">
        <animate attributeName="offset" values="-1.5;1.5" dur="1.2s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%" stop-color="#f3f3f3">
        <animate attributeName="offset" values="-1;2" dur="1.2s" repeatCount="indefinite" />
      </stop>
    </linearGradient>
  </defs>
  <rect
    x="0"
    y="0"
    width="130"
    height="24"
    rx="6"
    ry="6"
    fill="url(#shimmer)" />
</svg>
    )
}
export const PageSkeleton = () => {
  return (
    <svg
  width="400"
  height="130"
  viewBox="0 0 400 130"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-labelledby="loading-aria"
>
  <title id="loading-aria">Loading…</title>
  <defs>
    <linearGradient id="shimmer" x1="0" y1="0" x2="100%" y2="0">
      <stop offset="0%" stop-color="#f0f0f0" />
      <stop offset="50%" stop-color="#e0e0e0" />
      <stop offset="100%" stop-color="#f0f0f0" />
      <animate
        attributeName="x1"
        from="-100%"
        to="100%"
        dur="1.5s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="x2"
        from="0%"
        to="200%"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </linearGradient>
  </defs>
  <rect x="0"   y="0"   width="400" height="130" fill="#f0f0f0" />
  <rect x="20"  y="20"  rx="8" ry="8" width="80"  height="80" fill="url(#shimmer)" />
  <rect x="120" y="20"  rx="4" ry="4" width="260" height="16" fill="url(#shimmer)" />
  <rect x="120" y="48"  rx="4" ry="4" width="200" height="12" fill="url(#shimmer)" />
  <rect x="120" y="68"  rx="4" ry="4" width="240" height="12" fill="url(#shimmer)" />
  <rect x="120" y="90"  rx="6" ry="6" width="100" height="20" fill="url(#shimmer)" />
  <p>Hellow</p>
</svg>
  )
}