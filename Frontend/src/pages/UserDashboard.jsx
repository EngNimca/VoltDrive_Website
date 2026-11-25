import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import Profile from './dashboard/Profile'
import Favorites from './dashboard/Favorites'
import MyInquiries from './dashboard/MyInquiries'
import MyReviews from './dashboard/MyReviews'
import { User, Heart, MessageSquare, Star } from 'lucide-react'

const links = [
  { name: 'Profile', to: '/dashboard', icon: User },
  { name: 'Favorites', to: '/dashboard/favorites', icon: Heart },
  { name: 'My Inquiries', to: '/dashboard/inquiries', icon: MessageSquare },
  { name: 'My Reviews', to: '/dashboard/reviews', icon: Star },
]

export default function UserDashboard() {
  return (
    <ProtectedRoute role="user">
      <DashboardLayout title="My Dashboard" links={links}>
        <Routes>
          <Route index element={<Profile />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="inquiries" element={<MyInquiries />} />
          <Route path="reviews" element={<MyReviews />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </DashboardLayout>
    </ProtectedRoute>
  )
}