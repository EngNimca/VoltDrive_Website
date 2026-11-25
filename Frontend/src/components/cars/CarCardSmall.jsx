import { Link } from 'react-router-dom'
import { Car } from 'lucide-react'
import { imageUrl } from '../../utils/imageUrl'
import { formatPrice } from '../../utils/formatPrice'

// Card yar: sawir + brand + magac + qiimo (Latest Arrivals, Similar Cars)
export default function CarCardSmall({ car }) {
  const image = imageUrl(car.images?.[0])

  return (
    <Link to={`/cars/${car.slug}`} className="card group block overflow-hidden p-0">
      <div className="h-32 overflow-hidden bg-card-2 sm:h-36">
        {image ? (
          <img
            src={image}
            alt={car.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center">
            <Car size={36} />
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-xs font-medium text-primary">{car.brand?.name}</p>
        <h3 className="mt-0.5 line-clamp-1 text-sm font-semibold sm:text-base">{car.name}</h3>
        <p className="mt-1 text-base font-bold text-heading sm:text-lg">{formatPrice(car.price)}</p>
      </div>
    </Link>
  )
}