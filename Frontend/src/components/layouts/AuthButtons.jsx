import { Link, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function AuthButtons({ mobile = false, onClick }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return (
      <Link to="/login" onClick={onClick} className="btn btn-primary">
        Login
      </Link>
    )
  }

  const dashboard = user.role === 'admin' ? '/admin' : '/dashboard'

  const handleLogout = () => {
    logout()
    navigate('/')
    onClick?.()
  }

  return (
    <>
      <Link to={dashboard} onClick={onClick} className="btn btn-primary">
        Dashboard
      </Link>
      {mobile ? (
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      ) : (
        <button
          onClick={handleLogout}
          aria-label="Logout"
          className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-card-2 text-heading"
        >
          <LogOut size={20} />
        </button>
      )}
    </>
  )
}