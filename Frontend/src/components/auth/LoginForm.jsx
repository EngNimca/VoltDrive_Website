import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import FormField from '../common/FormField'

export default function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Goob kasta oo la qoro, form-ka ayaa la cusboonaysiiyaa
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      navigate(user.role === 'admin' ? '/admin' : '/dashboard') // admin -> /admin, user -> /dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong, try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
      <FormField label="Password" type="password" name="password" value={form.password} onChange={handleChange} required />
      {error && <p className="text-sm text-danger">{error}</p>}
      <button type="submit" disabled={loading} className="btn btn-primary w-full disabled:opacity-60">
        {loading ? 'Please wait...' : 'Login'}
      </button>
    </form>
  )
}