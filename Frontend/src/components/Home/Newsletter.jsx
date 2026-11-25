import { useState } from 'react'
import api from '../../services/api'

export default function Newsletter() {
  const [form, setForm] = useState({ name: '', email: '' })
  const [message, setMessage] = useState('') // farriinta guusha ama ciladda
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    try {
      await api.post('/subscribe', form)
      setSuccess(true)
      setMessage('Thanks for subscribing!')
      setForm({ name: '', email: '' })
    } catch (err) {
      setSuccess(false)
      setMessage(err.response?.data?.message || 'Something went wrong, try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="padding-y">
      <div className="max-container padding-x">
        <div className="grid gap-6 rounded-2xl bg-primary/10 p-6 sm:p-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Stay in the Loop</h2>
            <p className="mt-2">Get new cars, offers and news in your inbox.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Mobile iyo tablet: kor-hoos ; desktop (lg): safka */}
            <div className="flex flex-col gap-3 lg:flex-row">
              <input
                className="input lg:min-w-0 lg:flex-1"
                name="name"
                placeholder="Your name"
                aria-label="Your name"
                value={form.name}
                onChange={handleChange}
              />
              <input
                className="input lg:min-w-0 lg:flex-1"
                type="email"
                name="email"
                placeholder="Your email"
                aria-label="Your email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <button type="submit" disabled={loading} className="btn bg-heading text-page hover:opacity-90 disabled:opacity-60">
                {loading ? 'Please wait...' : 'Subscribe'}
              </button>
            </div>
            {message && <p className={`mt-3 text-sm ${success ? 'text-primary' : 'text-danger'}`}>{message}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}