type BrandVisualProps = {
  variant?: 'werkz-jr' | 'werkz'
  className?: string
}

export default function BrandVisual({variant = 'werkz', className}: BrandVisualProps) {
  const label = variant === 'werkz-jr' ? 'JR' : 'LI'

  return (
    <div className={`brand-visual ${className ?? ''}`} role="img" aria-label="Water Werkz brand mark">
      <img className="brand-visual__logo" src="/images/logo-dark.png" alt="" />
      <span className="brand-visual__badge" aria-hidden>
        {label}
      </span>
    </div>
  )
}
