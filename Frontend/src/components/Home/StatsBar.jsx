
import { Car, BadgeCheck, Calculator, ShieldCheck, Headphones } from 'lucide-react'

const stats = [
    {icon: Car, title: '500+ Cars', text: 'New and used'},
    {icon: BadgeCheck, title: 'Verified', text: 'Inspected vehicles'},
    { icon: Calculator, title: 'Easy Financing', text: 'EMI calculator' },
    { icon: ShieldCheck, title: 'Safe Deals', text: 'Trusted sellers' },
    { icon: Headphones, title: '24/7 Support', text: 'Always here' },

]

export default function StatsBar() {
    return <>
    <section className="max-container padding-x relative z-10 -mt-12">
      <div className="grid grid-cols-2 gap-6 rounded-2xl border border-line bg-card p-6 shadow-lg md:grid-cols-3 lg:grid-cols-5">
        {stats.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-3">
            <Icon size={32} className="shrink-0 text-primary" />
            <div>
              <p className="font-semibold text-heading">{title}</p>
              <p className="text-sm">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    </>
}