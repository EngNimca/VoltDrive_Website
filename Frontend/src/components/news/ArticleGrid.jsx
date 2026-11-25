import ArticleCard from './ArticleCard'

export default function ArticleGrid({ articles, loading, error }) {
  if (loading) return <p>Loading articles...</p>
  if (error) return <p className="text-danger">{error}</p>
  if (!articles || articles.length === 0) return <p>No articles found.</p>

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  )
}