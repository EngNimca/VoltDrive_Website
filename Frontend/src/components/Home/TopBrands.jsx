import useFetch from '../../hooks/useFetch'
import SectionTitle from '../common/SectionTitle'
import BrandGrid from '../brands/BrandGrid'

export default function TopBrands() {
  const { data, loading, error } = useFetch('/brands')

  // Top: kuwa gaadiidka ugu badan leh, 9-ka ugu horreeya
  const top = data ? [...data].sort((a, b) => b.carCount - a.carCount).slice(0, 9) : []

  return (
    <section className="padding-y">
      <div className="max-container padding-x">
        <SectionTitle center title="Top Brands" subtitle="Explore cars from the brands you trust" />
        <BrandGrid brands={top} loading={loading} error={error} />
      </div>
    </section>
  )
}