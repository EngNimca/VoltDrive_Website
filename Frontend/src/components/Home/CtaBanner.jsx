import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import heroImg from '../../assets/images/hero.png'

export default function CtaBanner() {
  return (
    <section className="padding-y">
      <div className="max-container padding-x">
        <div className="relative overflow-hidden rounded-2xl bg-[#0e0e22]">
          {/* Sawirka: isla kii Hero-ga */}
          <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
          {/* Overlay: mobile = madow; desktop = bidix madow, midig sawirka ayaa muuqda */}
          <div className="absolute inset-0 bg-[#0e0e22]/75 md:bg-transparent md:bg-linear-to-r md:from-[#0e0e22] md:via-[#0e0e22]/85 md:to-transparent" />

          <div className="relative p-6 sm:p-10 md:p-12 lg:p-16">
            <div className="max-w-lg">
              <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                Test drives open
              </span>
              <h2 className="mt-4 text-2xl font-bold text-white md:text-4xl">Ready to Find Your Perfect Car?</h2>
              <p className="mt-3 text-white/80">
                Browse our cars, calculate your payments and book a test drive today.
              </p>

              {/* Mobile: kor-hoos (buuxa) ; sm+: safka */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to="/cars" className="btn btn-primary gap-2">
                  Explore Cars <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn border border-white/40 text-white hover:bg-white/10">
                  Book a Test Drive
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}