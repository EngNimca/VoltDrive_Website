import { Link } from 'react-router-dom'

// items = [{ name, to }] ; kan ugu dambeeya `to` ma leh
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-sm">
      {items.map((item, i) => (
        <span key={item.name} className="flex items-center gap-2">
          {i > 0 && <span>/</span>}
          {item.to ? (
            <Link to={item.to} className="hover:text-primary">
              {item.name}
            </Link>
          ) : (
            <span className="text-heading">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  )
}