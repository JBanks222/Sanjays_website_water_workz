import {useEffect, useState} from 'react'

const STORAGE_KEY = 'wwl-deal-popup-25-ceramic-coating'
const POPUP_IMAGE = '/images/pop-ups/25percent_off_ceramic_coating.png'

export default function DealPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    setOpen(true)
  }, [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePopup()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function closePopup() {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="deal-popup" role="dialog" aria-modal="true" aria-label="Special offer">
      <button
        className="deal-popup__backdrop"
        type="button"
        aria-label="Close promotion"
        onClick={closePopup}
      />
      <div className="deal-popup__panel">
        <button
          className="deal-popup__close"
          type="button"
          aria-label="Close promotion"
          onClick={closePopup}
        >
          <span aria-hidden>×</span>
        </button>
        <img
          src={POPUP_IMAGE}
          alt="25% off ceramic coating promotion at Water Werks Lab"
          className="deal-popup__image"
        />
      </div>
    </div>
  )
}
