import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { company } from '../../data/company'

const items = [
  { icon: MapPin, text: company.address },
  { icon: Phone, text: company.phone },
  { icon: Mail, text: company.email },
  { icon: Clock, text: company.hours },
]

export default function ContactInfo() {
  return (
    <ul className="space-y-3 text-sm">
      {items.map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-start gap-3">
          <Icon size={18} className="mt-0.5 shrink-0 text-primary" />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  )
}