import {Sun, Moon} from 'lucide-react'
import useTheme from '../../hooks/useTheme.js'

export default function ThemeToggle() {
    const [theme, toggleTheme] = useTheme()
    return <>
    <button onClick={toggleTheme} 
    aria-label="Toggle theme"
    className= "grid h-10 w-10 place-items-center rounded-lg border border-line bg-card-2 text-heading transition hover:border-primary">
        {theme === 'light' ? <Moon size= {20} /> : <Sun size= {20} />}
    </button>
    </>
}
