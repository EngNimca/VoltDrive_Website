import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import FormField from '../common/FormField'

export default function RegisterForm() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      navigate('/dashboard') // user cusub waa user caadi
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong, try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Name" name="name" value={form.name} onChange={handleChange} required />
      <FormField label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
      <FormField label="Password (6+ characters)" type="password" name="password" value={form.password} onChange={handleChange} required />
      {error && <p className="text-sm text-danger">{error}</p>}
      <button type="submit" disabled={loading} className="btn btn-primary w-full disabled:opacity-60">
        {loading ? 'Please wait...' : 'Create account'}
      </button>
    </form>
  )
}