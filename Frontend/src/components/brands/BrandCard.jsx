import { useState } from 'react'
import { Link } from 'react-router-dom'
import { imageUrl } from '../../utils/imageUrl'

// Tile: logo wareeg ah (ama xarafka hore), magac, tirada gaadiidka
export default function BrandCard({ brand }) {
  const [failed, setFailed] = useState(false) // haddii logo-ku jabo, xarafka hore ayaa muuqda

  return (
    <Link
      to={`/brands/${brand.slug}`}
      className="card flex w-full flex-col items-center p-3 text-center hover:scale-105 sm:p-4"
    >
      {/* Wareegga cad: logo-ga ku dhex jira, background-kiisa ma muuqdo */}
      <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-full bg-white sm:h-16 sm:w-16">
        {brand.logo && !failed ? (
          <img
            src={imageUrl(brand.logo)}
            alt={brand.name}
            onError={() => setFailed(true)}
            className="h-full w-full object-contain p-2"
          />
        ) : (
          <span className="text-xl font-bold text-primary">{brand.name.charAt(0)}</span>
        )}
      </span>
      <p className="mt-3 line-clamp-1 text-sm font-semibold text-heading">{brand.name}</p>
      <p className="text-xs">
        {brand.carCount} {brand.carCount === 1 ? 'car' : 'cars'}
      </p>
    </Link>
  )
}