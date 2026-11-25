import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

// Raadinta Navbar-ka: Enter -> /cars?q=...
export default function SearchBox({ className = '', inputClassName = '', autoFocus = false, onDone }) {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = e.target.q.value.trim()
    navigate(q ? `/cars?q=${encodeURIComponent(q)}` : '/cars')
    onDone?.() // xidh menu/sanduuqa (mobile, tablet)
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2" />
      <input name="q" autoFocus={autoFocus} placeholder="Search cars..." className={`input pl-10 ${inputClassName}`} />
    </form>
  )
}