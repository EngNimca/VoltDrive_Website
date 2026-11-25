import { useSearchParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Breadcrumb from '../components/common/Breadcrumb'
import EmptyState from '../components/common/EmptyState'
import Pagination from '../components/common/Pagination'
import CarFilterBar from '../components/cars/CarFilterBar'
import CarGrid from '../components/cars/CarGrid'

export default function Cars() {
  const [params, setParams] = useSearchParams() // filters-ku waxay ku jiraan URL-ka
  const brands = useFetch('/brands')
  const result = useFetch(`/cars?${params.toString()}`) // URL-ka iyo Backend-ka isla magacyo

  const minPrice = params.get('minPrice') || ''
  const maxPrice = params.get('maxPrice') || ''
  const filters = {
    q: params.get('q') || '',
    brand: params.get('brand') || '',
    bodyType: params.get('bodyType') || '',
    price: minPrice || maxPrice ? `${minPrice}-${maxPrice}` : '',
    sort: params.get('sort') || '',
  }
  const hasFilters = Boolean(filters.q || filters.brand || filters.bodyType || filters.price)
  const page = Number(params.get('page')) || 1
  const cars = result.data?.cars

  // Beddel filter: qiime madhan = ka saar URL-ka ; filter cusub = bogga 1
  const updateFilters = (changes) => {
    const next = new URLSearchParams(params)
    Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)))
    next.delete('page')
    setParams(next)
  }

  const changePage = (n) => {
    const next = new URLSearchParams(params)
    if (n > 1) next.set('page', n)
    else next.delete('page')
    setParams(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearFilters = () => setParams({})

  return (
    <main className="max-container padding-x padding-t padding-b">
      <Breadcrumb items={[{ name: 'Home', to: '/' }, { name: 'Cars' }]} />
      <h1 className="text-2xl font-bold md:text-3xl">All Cars</h1>

      <div className="mb-4 mt-1 flex items-center justify-between text-sm">
        <span>{result.data ? `${result.data.total} cars found` : ' '}</span>
        {hasFilters && (
          <button onClick={clearFilters} className="font-semibold text-primary hover:underline">
            Clear filters
          </button>
        )}
      </div>

      <CarFilterBar filters={filters} brands={brands.data || []} onChange={updateFilters} />

      {cars && cars.length === 0 ? (
        <EmptyState title="No cars found" text="Try a different search or clear the filters.">
          <button onClick={clearFilters} className="btn btn-secondary">
            Clear filters
          </button>
        </EmptyState>
      ) : (
        <CarGrid cars={cars} loading={result.loading} error={result.error} />
      )}

      <Pagination page={page} pages={result.data?.pages || 1} onChange={changePage} />
    </main>
  )
}