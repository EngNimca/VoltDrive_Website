import CarCard from './CarCard'
import CarCardSmall from './CarCardSmall'

// compact = true -> cards yar (4 column); caadi ahaan cards weyn (3 column)
export default function CarGrid({ cars, loading, error, compact = false }) {
  if (loading) return <p>Loading cars...</p>
  if (error) return <p className="text-danger">{error}</p>
  if (!cars || cars.length === 0) return <p>No cars found.</p>

  const columns = compact
    ? 'grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5'
    : 'grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6'
  const Card = compact ? CarCardSmall : CarCard

  return (
    <div className={`grid ${columns}`}>
      {cars.map((car) => (
        <Card key={car._id} car={car} />
      ))}
    </div>
  )
}