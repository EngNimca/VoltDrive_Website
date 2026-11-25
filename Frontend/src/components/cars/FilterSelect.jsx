import { ChevronDown } from 'lucide-react'

// Pill: select caadi ah oo la qurxiyay. Marka wax la doorto -> cagaar
export default function FilterSelect({ label, value, onChange, options }) {
  const active = value !== ''

  return (
    <div className="relative shrink-0">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-10 cursor-pointer appearance-none rounded-full border py-0 pl-4 pr-9 text-sm font-medium outline-none transition ${
          active ? 'border-primary bg-primary/10 text-primary' : 'border-line bg-card text-heading hover:border-primary'
        }`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-card text-heading">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
    </div>
  )
}