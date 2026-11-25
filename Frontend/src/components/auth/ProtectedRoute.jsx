import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

// role = "user" ama "admin": bogga qofka u banaan
export default function ProtectedRoute({ role, children }) {
  const { user } = useAuth()

  // Soo gelin -> Login
  if (!user) return <Navigate to="/login" replace />

  // Role khalad -> bogga u khaaska ah
  if (user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />
  }

  return children
}