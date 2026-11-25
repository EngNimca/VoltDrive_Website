import {Link} from 'react-router-dom'
import {Zap} from 'lucide-react'
export default function Logo({ light = false }) {
    return <>
    <Link
      to="/"
      className={`flex items-center gap-2 text-xl font-bold ${light ? 'text-white' : 'text-heading'}`}
    >
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-white">
        <Zap size={20} />
      </span>
      <span>
        <span className="text-primary">Volt</span>Drive
      </span>
    </Link>
    </>
}