import Hero from '../components/Home/Hero'
import StatsBar from '../components/Home/StatsBar'
import FeaturedCars from '../components/Home/FeaturedCars'
import TopBrands from '../components/Home/TopBrands'
import LatestCars from '../components/Home/LatestCars'
import LatestNews from '../components/Home/LatestNews'
import Testimonials from '../components/Home/Testimonials'
import CtaBanner from '../components/Home/CtaBanner'
import Newsletter from '../components/Home/Newsletter'

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedCars />
      <TopBrands />
      <LatestCars />
      <LatestNews />
      <Testimonials />
      <CtaBanner />
      <Newsletter />
    </>
  )
}