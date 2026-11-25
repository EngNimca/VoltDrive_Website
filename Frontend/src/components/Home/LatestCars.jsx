import useFetch from '../../hooks/useFetch'
import SectionTitle from '../common/SectionTitle'
import CarGrid from '../cars/CarGrid'

export default function LatestCars() {
  const { data, loading, error } = useFetch('/cars/latest')

  return (
    <section className="padding-y">
      <div className="max-container padding-x">
        <SectionTitle title="Latest Arrivals" />
        <CarGrid compact cars={data} loading={loading} error={error} />
      </div>
    </section>
  )
}