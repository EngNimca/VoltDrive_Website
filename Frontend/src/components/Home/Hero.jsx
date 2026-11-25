import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'
import heroImg from '../../assets/images/image.png'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <img
      src={heroImg}
      alt=""
      className="absolute inset-0 h-full w-full object-cover object-[70%_center] md:object-right"
    />
      {/* Overlay madow, isla midab labada theme-ba */}
    <div className="absolute inset-0 bg-[#0e0e22]/60 md:bg-transparent md:bg-linear-to-r md:from-[#0e0e22] md:via-[#0e0e22]/60 md:to-transparent" />
      <div className="max-container padding-x padding-t relative flex min-h-[640px] items-start pb-24 md:min-h-[600px] md:items-center">
        <div className="max-w-xl">
          <h1 className="title-xl text-white">
            Drive the Future. <span className="block text-primary">Today.</span>
          </h1>

          <p className="mt-4 max-w-md text-base text-white/80 lg:text-lg">
            Find, compare and book a test drive for your next car, new or used, all in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/cars" className="btn btn-primary gap-2">
              Explore Cars <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn-secondary hover:border-primary ">
              Book a Test Drive
            </Link>
          </div>

          <button className="mt-6 flex items-center gap-3 text-sm font-medium text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-white/10">
              <Play size={14} />
            </span>
            Watch Full Video
          </button>
        </div>
      </div>
    </section>
  )
}