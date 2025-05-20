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