import useFetch from '../../hooks/useFetch'
import SectionTitle from '../common/SectionTitle'
import CarGrid from '../cars/CarGrid'

export default function FeaturedCars() {
  const { data, loading, error } = useFetch('/cars/featured')
  const cars = data ? data.slice(0, 3) : [] // 3-da ugu horreeya kaliya (beddel lambarka haddii aad rabto)


  return (
    <section className="padding-y">
      <div className="max-container padding-x">
        <SectionTitle
          title="Featured Cars"
          subtitle="Our most popular cars right now"
          link={{ text: 'View All', to: '/cars' }}
        />
        <CarGrid cars={cars} loading={loading} error={error} />
      </div>
    </section>
  )
}