import { Car } from 'lucide-react'

// title, text ; children = batoon (ikhtiyaari)
export default function EmptyState({ title, text, children }) {
  return (
    <div className="card flex flex-col items-center py-12 text-center">
      <Car size={40} />
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm">{text}</p>
      {children && <div className="mt-5">{children}</div>}
    </div>
  )
}