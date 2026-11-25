import useFetch from '../../hooks/useFetch'
import SectionTitle from '../common/SectionTitle'
import ArticleGrid from '../news/ArticleGrid'

export default function LatestNews() {
  const { data, loading, error } = useFetch('/articles')
  const latest = data ? data.articles.slice(0, 3) : [] // 3-da ugu cusub

  return (
    <section className="padding-y">
      <div className="max-container padding-x">
        <SectionTitle
          title="Latest News"
          subtitle="Tips, reviews and updates from our team"
          link={{ text: 'View All', to: '/news' }}
        />
        <ArticleGrid articles={latest} loading={loading} error={error} />
      </div>
    </section>
  )
}