import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import ContactInfo from '../common/ContactInfo'
import api from '../../services/api'
import { company } from '../../data/company'

const quickLinks = [
  { name: 'Home', to: '/' },
  { name: 'Cars', to: '/cars' },
  { name: 'Brands', to: '/brands' },
  { name: 'News', to: '/news' },
  { name: 'About Us', to: '/about' },
  { name: 'Book a Test Drive', to: '/contact' },
]

// ===== Qaybo yaryar (Footer kaliya isticmaala) =====

// Hal tiir: cinwaan + waxa ku jira
function FooterColumn({ title, children }) {
  return (
    <div>
      <h4 className="mb-4 text-base font-semibold">{title}</h4>
      {children}
    </div>
  )
}

// Liis links ah: [{ name, to }]
function FooterLinks({ links }) {
  return (
    <ul className="space-y-2 text-sm">
      {links.map((link) => (
        <li key={link.to}>
          <Link to={link.to} className="hover:text-primary">
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

// Top Brands: ka soo qaada Backend
function FooterBrands() {
  const [brands, setBrands] = useState([])

  useEffect(() => {
    api
      .get('/brands')
      .then((res) => setBrands(res.data.slice(0, 5))) // 5-ka ugu horreeya
      .catch(() => setBrands([])) // haddii Backend-ku xirnaan, footer-ka wuu shaqeynayaa
  }, [])

  const links = brands.map((b) => ({ name: b.name, to: `/brands/${b.slug}` }))
  return <FooterLinks links={links} />
}

// ===== Footer =====
export default function Footer() {
  return (
    <footer className="border-t border-line bg-card mt-16">
      <div className="max-container padding-x py-12 md:py-16">
        {/* 1 column (mobile), 2 (tablet), 4 (desktop) */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm">{company.description}</p>
          </div>

          <FooterColumn title="Quick Links">
            <FooterLinks links={quickLinks} />
          </FooterColumn>

          <FooterColumn title="Top Brands">
            <FooterBrands />
          </FooterColumn>

          <FooterColumn title="Visit Us">
            <ContactInfo />
          </FooterColumn>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-center text-sm">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}