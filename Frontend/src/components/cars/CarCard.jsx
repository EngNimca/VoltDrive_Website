import { Link } from 'react-router-dom'
import { Route, Battery, Zap, Car } from 'lucide-react'
import { imageUrl } from '../../utils/imageUrl'
import { formatPrice } from '../../utils/formatPrice'

export default function CarCard({ car }) {
  const specs = car.specs || {}
  const image = imageUrl(car.images?.[0])

  // 3 spec mar walba (cabbir isku mid ah); haddii la waayo: "-"
  const items = [
    { icon: Route, label: 'Range', value: specs.range && `${specs.range} km` },
    { icon: Battery, label: 'Battery', value: specs.battery && `${specs.battery} kWh` },
    { icon: Zap, label: 'Power', value: specs.power && `${specs.power} kW` },
  ]

  const badge = 'rounded-full px-3 py-1 text-xs font-medium text-white'

  return (
    <div className="card group flex flex-col overflow-hidden p-0">
      {/* Sawirka: dherer go'an (h-44), hover = wax yar ayuu weynaadaa */}
      <div className="relative h-44 overflow-hidden bg-card-2 sm:h-48">
        {image ? (
          <img
            src={image}
            alt={car.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center">
            <Car size={48} />
          </div>
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          {car.isFeatured && <span className={`${badge} bg-primary`}>Featured</span>}
          {car.condition === 'used' && <span className={`${badge} bg-black/60`}>Used</span>}
        </div>
        <span className={`${badge} absolute right-3 top-3 bg-black/60`}>{car.bodyType}</span>
      </div>

      {/* Macluumaadka */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium text-primary">{car.brand?.name}</p>
        <h3 className="mt-1 line-clamp-1 text-lg font-semibold">{car.name}</h3>
        <p className="mt-1 line-clamp-1 min-h-5 text-sm">{car.tagline}</p>
        <p className="mt-3 text-2xl font-bold text-heading">{formatPrice(car.price)}</p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {items.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center rounded-lg bg-card-2 px-1 py-2 text-center">
              <Icon size={16} className="text-primary" />
              <span className="mt-1 text-xs font-semibold text-heading">{value || '-'}</span>
              <span className="text-[11px]">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <Link to={`/cars/${car.slug}`} className="btn btn-primary w-full">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}