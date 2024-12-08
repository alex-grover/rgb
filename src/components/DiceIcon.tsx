type DiceIconProps = {
  size?: number
}

export function DiceIcon({ size }: DiceIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Dice</title>
      <path
        d="M16.0001 13.3333H5.33341C3.86066 13.3333 2.66675 14.5272 2.66675 15.9999V26.6666C2.66675 28.1393 3.86066 29.3333 5.33341 29.3333H16.0001C17.4728 29.3333 18.6667 28.1393 18.6667 26.6666V15.9999C18.6667 14.5272 17.4728 13.3333 16.0001 13.3333Z"
        stroke="currentColor"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.8933 18.6666L28.5599 13.9999C29.0546 13.4512 29.3284 12.7387 29.3284 11.9999C29.3284 11.2611 29.0546 10.5486 28.5599 9.99991L21.8933 3.43991C21.3446 2.94519 20.632 2.67139 19.8933 2.67139C19.1545 2.67139 18.4419 2.94519 17.8933 3.43991L13.3333 7.99991"
        stroke="currentColor"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 24H8.01333"
        stroke="currentColor"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 18.6667H13.3466"
        stroke="currentColor"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 8H20.0133"
        stroke="currentColor"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 12H24.0133"
        stroke="currentColor"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
