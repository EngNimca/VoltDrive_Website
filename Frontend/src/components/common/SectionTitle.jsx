import { Link } from 'react-router-dom'

// title, subtitle ; link = { text, to } (ikhtiyaari) ; center = cinwaanka dhexda ku dhig (link la'aan)
export default function SectionTitle({ title, subtitle, link, center = false }) {
  if (center) {
    return (
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-sm sm:text-base">{subtitle}</p>}
      </div>
    )
  }

  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm sm:text-base">{subtitle}</p>}
      </div>
      {link && (
        <Link to={link.to} className="shrink-0 text-sm font-semibold text-primary hover:underline">
          {link.text} →
        </Link>
      )}
    </div>
  )
}