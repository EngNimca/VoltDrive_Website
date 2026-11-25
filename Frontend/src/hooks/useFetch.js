// import { useEffect, useState } from 'react'
// import api from '../services/api'

// // Isticmaal: const { data, loading, error } = useFetch('/cars/featured')
// export default function useFetch(url) {
//   const [data, setData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     api
//       .get(url)
//       .then((res) => setData(res.data))
//       .catch((err) => setError(err.response?.data?.message || 'Could not load data'))
//       .finally(() => setLoading(false))
//   }, [url])

//   return { data, loading, error }
// }


// new version
import { useEffect, useState } from 'react'
import api from '../services/api'

// Isticmaal: const { data, loading, error } = useFetch('/cars/featured')
export default function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false // jawaabta hore ha ka muuqan haddii URL cusub la rido
    setLoading(true)
    setError('')

    api
      .get(url)
      .then((res) => !ignore && setData(res.data))
      .catch((err) => !ignore && setError(err.response?.data?.message || 'Could not load data'))
      .finally(() => !ignore && setLoading(false))

    return () => {
      ignore = true
    }
  }, [url])

  return { data, loading, error }
}