import {BOOKING_URL} from '~/data/booking'

type BookNowButtonProps = {
  variant?: 'hero' | 'header' | 'inline'
  label?: string
}

export default function BookNowButton({
  variant = 'inline',
  label = 'Book Now',
}: BookNowButtonProps) {
  return (
    <a
      className={`btn btn--book btn--book--${variant}`}
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  )
}
