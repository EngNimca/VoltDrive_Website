import { Quote, Star } from 'lucide-react'
import SectionTitle from '../common/SectionTitle'
import Avatar from '../common/Avatar'
import { testimonials } from '../../data/testimonials'

export default function Testimonials() {
  return (
    <section className="padding-y bg-card-2">
      <div className="max-container padding-x">
        <SectionTitle center title="What Our Customers Say" subtitle="Real stories from real drivers" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card flex flex-col">
              <Quote size={28} className="text-primary" />

               <div className="mt-3 flex items-center gap-3">
                <Avatar user={{ name: t.name }} size={40} />
                <div>
                  <p className="text-sm font-semibold text-heading">{t.name}</p>
                  <p className="text-xs">{t.car}</p>
                </div>
              </div>
              <p className="mt-3 flex-1 text-sm">{t.text}</p>

              <div className="mt-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-star text-star" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}