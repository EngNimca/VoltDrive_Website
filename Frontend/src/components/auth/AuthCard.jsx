import { Link } from 'react-router-dom'

// Sanduuqa Login/Register: cinwaan + foom + link hoose
export default function AuthCard({ title, text, linkText, linkTo, children }) {
  return (
    <main className="padding-x padding-t pb-12">
      <div className="mx-auto mt-6 max-w-md rounded-2xl border border-line bg-card p-6 sm:p-8">
        <h1 className="title-md">{title}</h1>
        <div className="mt-6">{children}</div>
        <p className="mt-6 text-center text-sm">
          {text}{' '}
          <Link to={linkTo} className="font-semibold text-primary hover:underline">
            {linkText}
          </Link>
        </p>
      </div>
    </main>
  )
}