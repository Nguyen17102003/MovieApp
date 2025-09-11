import { lazy, FC, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import Video from '../components/DetailComponents/Video'

const DetailBanner = lazy(() => import('../components/DetailComponents/DetailBanner'))
const Slider = lazy(() => import('../components/UtilityComponents/Slider'))

const Detail: FC = () => {
  const { type, id } = useParams()
  const API_URL = import.meta.env.VITE_API_URL as string
  const API_KEY = import.meta.env.VITE_API_KEY as string
  const fetchURL = `${API_URL}/${type}/${id}`

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }

  // Fetch multiple queries in parallel
  const results = useQueries({
    queries: [
      {
        queryKey: [type, id],
        queryFn: () => fetch(`${fetchURL}?language=en-US`, options).then(res => res.json())
      },
      {
        queryKey: [type, id, 'credits'],
        queryFn: () =>
          fetch(`${fetchURL}/credits?language=en-US`, options)
            .then(res => res.json())
            .then(data =>
              data.cast.filter((c: any) => c.known_for_department === 'Acting').slice(0, 5)
            )
      },
      {
        queryKey: [type, id, 'videos'],
        queryFn: () => fetch(`${fetchURL}/videos?language=en-US`, options).then(res => res.json())
      },
      {
        queryKey: [type, id, 'similar'],
        queryFn: () => fetch(`${fetchURL}/similar?language=en-US`, options).then(res => res.json())
      }
    ]
  })

  const details = results[0]?.data
  const casts = results[1]?.data ?? []
  const videos = results[2]?.data?.results ?? []
  const similar = results[3]?.data?.results ?? []

  return (
    <div>
      {/* Detail Banner */}
      <Suspense
        fallback={
          <div className="h-[25rem] w-full bg-gray-900 animate-pulse rounded-xl" />
        }
      >
        <DetailBanner
          movie={details}
          casts={casts}
          isLoading={results[0].isLoading}
        />
      </Suspense>

      {/* Videos */}
      <div className="flex flex-col gap-6 py-10">
        {videos.map((video: any) => (
          <Video
            key={video.id}
            id={video.id}
            name={video.name}
            videoKey={video.key}
          />
        ))}
      </div>

      {/* Similar movies/TV */}
      <Suspense
        fallback={
          <div className="h-[20rem] w-full bg-gray-800 animate-pulse rounded-xl" />
        }
      >
        <div className="min-w-screen w-full xl:px-15 py-10 bg-black">
          <Slider
            title="Similar"
            type={type}
            movies={similar}
            isLoading={results[3].isLoading}
          />
        </div>
      </Suspense>
    </div>
  )
}

export default Detail
