import BrandCard from './BrandCard'

export default function BrandGrid({ brands, loading, error }) {
  if (loading) return <p className="text-center">Loading brands...</p>
  if (error) return <p className="text-center text-danger">{error}</p>
  if (!brands || brands.length === 0) return <p className="text-center">No brands found.</p>

  return (
    // Taleefan + tablet: 3 column (tablet-ka ballaca waa la xaddiday si tile-ku u weynaan)
    // Desktop (lg): tile 9rem (144px) oo dhexda ku yaal, sidii hore
    <div className="mx-auto grid max-w-xl grid-cols-3 gap-3 sm:gap-4 lg:max-w-none lg:grid-cols-[repeat(auto-fit,9rem)] lg:justify-center">
      {brands.map((brand) => (
        <BrandCard key={brand._id} brand={brand} />
      ))}
    </div>
  )
}