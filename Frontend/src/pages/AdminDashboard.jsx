import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import Overview from './dashboard/Overview'
import ManageCars from './dashboard/ManageCars'
import ManageBrands from './dashboard/ManageBrands'
import ManageArticles from './dashboard/ManageArticles'
import ManageInquiries from './dashboard/ManageInquiries'
import ManageReviews from './dashboard/ManageReviews'
import ManageSubscribers from './dashboard/ManageSubscribers'
import ManageUsers from './dashboard/ManageUsers'
import { LayoutDashboard, Car, Tag, Newspaper, MessageSquare, Star, Mail, Users } from 'lucide-react'

const links = [
  { name: 'Overview', to: '/admin', icon: LayoutDashboard },
  { name: 'Cars', to: '/admin/cars', icon: Car },
  { name: 'Brands', to: '/admin/brands', icon: Tag },
  { name: 'Articles', to: '/admin/articles', icon: Newspaper },
  { name: 'Inquiries', to: '/admin/inquiries', icon: MessageSquare },
  { name: 'Reviews', to: '/admin/reviews', icon: Star },
  { name: 'Subscribers', to: '/admin/subscribers', icon: Mail },
  { name: 'Users', to: '/admin/users', icon: Users },
]

export default function AdminDashboard() {
  return (
    <ProtectedRoute role="admin">
      <DashboardLayout title="Admin Dashboard" links={links}>
        <Routes>
          <Route index element={<Overview />} />
          <Route path="cars" element={<ManageCars />} />
          <Route path="brands" element={<ManageBrands />} />
          <Route path="articles" element={<ManageArticles />} />
          <Route path="inquiries" element={<ManageInquiries />} />
          <Route path="reviews" element={<ManageReviews />} />
          <Route path="subscribers" element={<ManageSubscribers />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </DashboardLayout>
    </ProtectedRoute>
  )
}