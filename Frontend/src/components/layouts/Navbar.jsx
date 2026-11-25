
// //new uppdate code

// import { useState, useEffect } from 'react'
// import { NavLink, useLocation } from 'react-router-dom'
// import { Menu, Search, X } from 'lucide-react'
// import Logo from './Logo.jsx'
// import ThemeToggle from './ThemeToggle'
// import AuthButtons from './AuthButtons'

// const links = [
//   { name: 'Home', to: '/' },
//   { name: 'Cars', to: '/cars' },
//   { name: 'Brands', to: '/brands' },
//   { name: 'News', to: '/news' },
//   { name: 'About Us', to: '/about' },
// ]

// export default function Navbar() {
//   const [open, setOpen] = useState(false)
//   const [searchOpen, setSearchOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const { pathname } = useLocation()

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20)
//     onScroll()
//     window.addEventListener('scroll', onScroll)
//     return () => window.removeEventListener('scroll', onScroll)
//   }, [])

//   // Home kaliya: Navbar daahir ah ilaa scroll la sameeyo
//   const transparent = pathname === '/' && !scrolled && !open
//   const textColor = transparent ? 'text-white' : 'text-heading'

//   const linkStyle = ({ isActive }) =>
//     isActive ? 'font-medium text-primary' : `${textColor} hover:text-primary`

//   return (
//     <header
//       className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
//         transparent ? 'border-transparent bg-transparent' : 'border-line bg-page/90 backdrop-blur'
//       }`}
//     >
//       <nav className="max-container padding-x flex h-16 items-center justify-between lg:h-[72px]">
//         <Logo light={transparent} />

//         {/* Links (tablet + desktop): tablet-ka qoraalka yar si ay u wada galaan */}
//         <div className="hidden items-center gap-4 text-sm md:flex lg:gap-8 lg:text-base">
//           {links.map((link) => (
//             <NavLink key={link.to} to={link.to} className={linkStyle}>
//               {link.name}
//             </NavLink>
//           ))}
//         </div>

//         <div className="flex items-center gap-3">
//           {/* Search input (desktop) */}
//           <div className="relative hidden lg:block">
//             <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2" />
//             <input type="text" placeholder="Search cars..." className="input h-10 w-64 pl-10" />
//           </div>

//           {/* Search icon (tablet) */}
//           <button
//             onClick={() => setSearchOpen(!searchOpen)}
//             aria-label="Search"
//             className="hidden h-10 w-10 place-items-center rounded-lg border border-line bg-card-2 text-heading md:grid lg:hidden"
//           >
//             <Search size={20} />
//           </button>

//           <ThemeToggle />

//           {/* Login / Dashboard (tablet + desktop + taleefan weyn) */}
//           <div className="hidden items-center gap-3 sm:flex">
//             <AuthButtons />
//           </div>

//           {/* Menu button (mobile) */}
//           <button onClick={() => setOpen(!open)} className={`${textColor} md:hidden`} aria-label="Menu">
//             {open ? <X size={26} /> : <Menu size={26} />}
//           </button>
//         </div>
//       </nav>

//       {/* Search box (tablet) */}
//       {searchOpen && (
//         <div className="hidden md:block lg:hidden">
//           <div className="max-container padding-x pb-3">
//             <input
//               autoFocus
//               placeholder="Search cars..."
//               className={`input ${
//                 transparent ? 'border-white/30 bg-white/10 text-white placeholder:text-white/70' : ''
//               }`}
//             />
//           </div>
//         </div>
//       )}

//       {/* Menu (mobile) */}
//       {open && (
//         <div className="border-t border-line bg-page md:hidden">
//           <div className="padding-x flex flex-col gap-1 p-4">
//             <input className="input mb-2" placeholder="Search cars..." />
//             {links.map((link) => (
//               <NavLink
//                 key={link.to}
//                 to={link.to}
//                 onClick={() => setOpen(false)}
//                 className={(s) => `py-3 ${linkStyle(s)}`}
//               >
//                 {link.name}
//               </NavLink>
//             ))}
//             <div className="mt-2 flex flex-col gap-2">
//               <AuthButtons mobile onClick={() => setOpen(false)} />
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }


//new update code
import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, Search, X } from 'lucide-react'
import Logo from './Logo.jsx'
import ThemeToggle from './ThemeToggle'
import AuthButtons from './AuthButtons'
import SearchBox from './SearchBox'

const links = [
  { name: 'Home', to: '/' },
  { name: 'Cars', to: '/cars' },
  { name: 'Brands', to: '/brands' },
  { name: 'News', to: '/news' },
  { name: 'About Us', to: '/about' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Home kaliya: Navbar daahir ah ilaa scroll la sameeyo
  const transparent = pathname === '/' && !scrolled && !open
  const textColor = transparent ? 'text-white' : 'text-heading'

  const linkStyle = ({ isActive }) =>
    isActive ? 'font-medium text-primary' : `${textColor} hover:text-primary`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        transparent ? 'border-transparent bg-transparent' : 'border-line bg-page/90 backdrop-blur'
      }`}
    >
      <nav className="max-container padding-x flex h-16 items-center justify-between lg:h-[72px]">
        <Logo light={transparent} />

        {/* Links (tablet + desktop) */}
        <div className="hidden items-center gap-4 text-sm md:flex lg:gap-8 lg:text-base">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkStyle}>
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Search (desktop) */}
          <SearchBox className="hidden lg:block" inputClassName="h-10 w-64" />

          {/* Search icon (tablet) */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
            className="hidden h-10 w-10 place-items-center rounded-lg border border-line bg-card-2 text-heading md:grid lg:hidden"
          >
            <Search size={20} />
          </button>

          <ThemeToggle />

          {/* Login / Dashboard */}
          <div className="hidden items-center gap-3 sm:flex">
            <AuthButtons />
          </div>

          {/* Menu button (mobile) */}
          <button onClick={() => setOpen(!open)} className={`${textColor} md:hidden`} aria-label="Menu">
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Search box (tablet) */}
      {searchOpen && (
        <div className="hidden md:block lg:hidden">
          <div className="max-container padding-x pb-3">
            <SearchBox
              autoFocus
              onDone={() => setSearchOpen(false)}
              inputClassName={transparent ? 'border-white/30 bg-white/10 text-white placeholder:text-white/70' : ''}
            />
          </div>
        </div>
      )}

      {/* Menu (mobile) */}
      {open && (
        <div className="border-t border-line bg-page md:hidden">
          <div className="padding-x flex flex-col gap-1 p-4">
            <SearchBox className="mb-2" onDone={() => setOpen(false)} />
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={(s) => `py-3 ${linkStyle(s)}`}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <AuthButtons mobile onClick={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
