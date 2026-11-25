// import { useState } from 'react'
// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { Menu, X, Home, LogOut } from 'lucide-react'
// import Logo from '../layouts/Logo'
// import ThemeToggle from '../layouts/ThemeToggle'
// import { useAuth } from '../../context/AuthContext'

// // title = cinwaanka sare ; links = [{ name, to }] ; children = bogga la muujinayo
// export default function DashboardLayout({ title, links, children }) {
//   const [open, setOpen] = useState(false) // sidebar-ka mobile
//   const { user, logout } = useAuth()
//   const navigate = useNavigate()

//   const handleLogout = () => {
//     logout()
//     navigate('/')
//   }

//   const linkStyle = ({ isActive }) =>
//     `flex items-center rounded-lg px-4 py-3 text-sm font-medium transition ${
//       isActive ? 'bg-primary text-white' : 'text-heading hover:bg-card-2'
//     }`

//   const bottomLink = 'flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-heading hover:bg-card-2'

//   return (
//     <div className="min-h-screen lg:flex">
//       {/* Backdrop (mobile): guji si aad u xidho */}
//       {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/50 lg:hidden" />}

//       {/* Sidebar: desktop = joogto, mobile = drawer */}
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-line bg-card p-4 transition-transform lg:sticky lg:top-0 lg:h-screen lg:shrink-0 lg:translate-x-0 ${
//           open ? 'translate-x-0' : '-translate-x-full'
//         }`}
//       >
//         <div className="mb-6 flex items-center justify-between">
//           <Logo />
//           <button onClick={() => setOpen(false)} className="text-heading lg:hidden" aria-label="Close menu">
//             <X size={24} />
//           </button>
//         </div>

//         <nav className="flex-1 space-y-1">
//           {links.map((link) => (
//             <NavLink key={link.to} to={link.to} end onClick={() => setOpen(false)} className={linkStyle}>
//               {link.name}
//             </NavLink>
//           ))}
//         </nav>

//         <div className="space-y-1 border-t border-line pt-4">
//           <Link to="/" className={bottomLink}>
//             <Home size={18} /> Back to website
//           </Link>
//           <button onClick={handleLogout} className={bottomLink}>
//             <LogOut size={18} /> Logout
//           </button>
//         </div>
//       </aside>

//       {/* Qaybta bogga */}
//       <div className="min-w-0 flex-1">
//         <header className="flex h-16 items-center justify-between border-b border-line px-4 sm:px-6">
//           <div className="flex items-center gap-3">
//             <button onClick={() => setOpen(true)} className="text-heading lg:hidden" aria-label="Open menu">
//               <Menu size={26} />
//             </button>
//             <span className="text-lg font-semibold text-heading">{title}</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="hidden text-sm sm:block">{user.name}</span>
//             <ThemeToggle />
//           </div>
//         </header>

//         <main className="p-4 sm:p-6">{children}</main>
//       </div>
//     </div>
//   )
// }


import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Home, LogOut } from 'lucide-react'
import Logo from '../layouts/Logo'
import ThemeToggle from '../layouts/ThemeToggle'
import Avatar from '../common/Avatar'
import { useAuth } from '../../context/AuthContext'

// title = cinwaanka sare ; links = [{ name, to, icon }] ; children = bogga la muujinayo
export default function DashboardLayout({ title, links, children }) {
  const [open, setOpen] = useState(false) // sidebar-ka mobile
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
      isActive ? 'bg-primary text-white' : 'text-heading hover:bg-card-2'
    }`

  const bottomLink =
    'flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-heading hover:bg-card-2'

  return (
    <div className="min-h-screen lg:flex">
      {/* Backdrop (mobile): guji si aad u xidho */}
      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/50 lg:hidden" />}

      {/* Sidebar: desktop = joogto, mobile = drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-line bg-card p-4 transition-transform lg:sticky lg:top-0 lg:h-screen lg:shrink-0 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <Logo />
          <button onClick={() => setOpen(false)} className="text-heading lg:hidden" aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {links.map(({ name, to, icon: Icon }) => (
            <NavLink key={to} to={to} end onClick={() => setOpen(false)} className={linkStyle}>
              <Icon size={18} />
              {name}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-1 border-t border-line pt-4">
          <Link to="/" className={bottomLink}>
            <Home size={18} /> Back to website
          </Link>
          <button onClick={handleLogout} className={bottomLink}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Qaybta bogga */}
      <div className="min-w-0 flex-1">
        <header className="flex h-16 items-center justify-between border-b border-line px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)} className="text-heading lg:hidden" aria-label="Open menu">
              <Menu size={26} />
            </button>
            <span className="text-lg font-semibold text-heading">{title}</span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {/* Profile: magac + role + wareeg xarafka leh */}
            <div className="flex items-center gap-3">
              <div className="hidden text-right leading-tight sm:block">
                <p className="text-sm font-semibold text-heading">{user.name}</p>
                <p className="text-xs capitalize">{user.role}</p>
              </div>
              <Avatar user={user} size={40} />
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}