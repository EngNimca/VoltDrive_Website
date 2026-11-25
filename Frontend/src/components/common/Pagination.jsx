import { ChevronLeft, ChevronRight } from 'lucide-react'

// page = bogga hadda ; pages = wadarta ; onChange(bogga cusub)
export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null // hal bog = waxba ha muujin

  const box = 'grid h-10 min-w-10 place-items-center rounded-lg border px-3 text-sm font-medium transition'
  const normal = 'border-line bg-card text-heading hover:border-primary disabled:opacity-40 disabled:hover:border-line'

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button onClick={() => onChange(page - 1)} disabled={page === 1} aria-label="Previous page" className={`${box} ${normal}`}>
        <ChevronLeft size={18} />
      </button>

      {/* Lambarada: tablet + desktop */}
      <div className="hidden items-center gap-2 sm:flex">
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`${box} ${n === page ? 'border-primary bg-primary text-white' : normal}`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Mobile: "Page 1 of 2" */}
      <span className="px-3 text-sm sm:hidden">
        Page {page} of {pages}
      </span>

      <button onClick={() => onChange(page + 1)} disabled={page === pages} aria-label="Next page" className={`${box} ${normal}`}>
        <ChevronRight size={18} />
      </button>
    </div>
  )
}