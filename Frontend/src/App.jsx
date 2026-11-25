
// import Navbar from './components/layouts/Navbar'
// import Home from './pages/Home'
// export default function App() {
//   return <>
//     <Navbar />
//     <Home />
    
//   </>
    
// }

//new App
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout'
import Home from './pages/Home'
import Cars from './pages/Cars'
import CarDetail from './pages/CarDetail'
import Brands from './pages/Brands'
import BrandDetail from './pages/BrandDetail'
import News from './pages/News'
import Article from './pages/Article'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      {/* Bogagga dadweynaha: Navbar + Footer leh */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:slug" element={<CarDetail />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/brands/:slug" element={<BrandDetail />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<Article />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Dashboard-yada: layout-kooda ayay leeyihiin (Navbar la'aan) */}
      <Route path="/dashboard/*" element={<UserDashboard />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
    </Routes>
  )
}