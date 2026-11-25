import { Link } from 'react-router-dom'
import { Newspaper } from 'lucide-react'
import { imageUrl } from '../../utils/imageUrl'
import { formatDate } from '../../utils/formatDate'

export default function ArticleCard({ article }) {
  const image = imageUrl(article.cover)

  return (
    <Link to={`/news/${article.slug}`} className="card group flex flex-col overflow-hidden p-0">
      {/* Sawirka: dherer go'an, hover = wax yar ayuu weynaadaa */}
      <div className="h-40 overflow-hidden bg-card-2 sm:h-44">
        {image ? (
          <img
            src={image}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center">
            <Newspaper size={40} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {article.category}
          </span>
          <span className="text-xs">{formatDate(article.createdAt)}</span>
        </div>
        <h3 className="mt-3 line-clamp-2 text-base font-semibold sm:text-lg">{article.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm">{article.excerpt}</p>
      </div>
    </Link>
  )
}