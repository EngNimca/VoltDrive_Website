import { Search } from 'lucide-react'
import FilterSelect from './FilterSelect'

// Halkan ku beddel liisaska haddii aad rabto
const bodyTypes = ['SUV', 'Sedan', 'Hatchback', 'MPV', 'Coupe', 'Crossover']

const priceOptions = [
  { value: '', label: 'Any price' },
  { value: '-25000', label: 'Under $25,000' },
  { value: '25000-40000', label: '$25,000 - $40,000' },
  { value: '40000-60000', label: '$40,000 - $60,000' },
  { value: '60000-', label: 'Over $60,000' },
]

const sortOptions = [
  { value: '', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
]

// filters = { q, brand, bodyType, price, sort } ; onChange({ magac: qiime })
export default function CarFilterBar({ filters, brands, onChange }) {
  const handleSearch = (e) => {
    e.preventDefault()
    onChange({ q: e.target.q.value.trim() })
  }

  // "25000-40000" -> minPrice = 25000, maxPrice = 40000
  const handlePrice = (value) => {
    const [min, max] = value.split('-')
    onChange({ minPrice: min, maxPrice: max })
  }

  const brandOptions = [{ value: '', label: 'All brands' }, ...brands.map((b) => ({ value: b._id, label: b.name }))]
  const typeOptions = [{ value: '', label: 'All types' }, ...bodyTypes.map((t) => ({ value: t, label: t }))]

  return (
    <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
      {/* Raadin: Enter ama icon-ka */}
      <form onSubmit={handleSearch} className="relative lg:flex-1">
        <button type="submit" aria-label="Search" className="absolute left-3 top-1/2 -translate-y-1/2">
          <Search size={20} />
        </button>
        <input name="q" key={filters.q} defaultValue={filters.q} placeholder="Search by car name" className="input pl-11" />
      </form>

      {/* Pills: mobile = dhinaca ayay u socdaan */}
      <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <FilterSelect label="Brand" value={filters.brand} onChange={(v) => onChange({ brand: v })} options={brandOptions} />
        <FilterSelect label="Body type" value={filters.bodyType} onChange={(v) => onChange({ bodyType: v })} options={typeOptions} />
        <FilterSelect label="Price" value={filters.price} onChange={handlePrice} options={priceOptions} />
        <FilterSelect label="Sort" value={filters.sort} onChange={(v) => onChange({ sort: v })} options={sortOptions} />
      </div>
    </div>
  )
}