import {lazy, FC, Suspense} from 'react'
import { useParams } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import Video from '../components/DetailComponents/Video'

const DetailBanner = lazy(() => import('../components/DetailComponents/DetailBanner'))
const Slider = lazy(() => import('../components/UtilityComponents/Slider'))

const Detail:FC = () => {
  const { type, id } = useParams() // Lấy type ('/movie', '/tv') và id phim
  const API_URL = import.meta.env.VITE_API_URL as string // API URL
  const API_KEY = import.meta.env.VITE_API_KEY as string // API KEY
  const fetchURL = `${API_URL}/${type}/${id}` 
  // Tham số phụ khi fetch
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }

  // Lấy thông tin chi tiết của bộ phim dựa trên id
  const results = useQueries({
    queries: [
      {
        // Thông tin cơ bản
        queryKey: [type, id],
        queryFn: () => fetch(`${fetchURL}?language=en-US`, options).then(res => res.json())
      },
      {
        // Người tham gia làm phim
        queryKey: [type, id, 'credits'],
        queryFn: () =>
          fetch(`${fetchURL}/credits?language=en-US`, options)
            .then(res => res.json())
            .then(data =>
              data.cast.filter((cast:any) => cast.known_for_department === 'Acting').slice(0, 5)
            )
      },
      {
        // Video
        queryKey: [type, id, 'videos'],
        queryFn: () => fetch(`${fetchURL}/videos?language=en-US`, options).then(res => res.json())
      },
      {
        // Các phim tương tự
        queryKey: [type, id, 'similar'],
        queryFn: () => fetch(`${fetchURL}/similar?language=en-US`, options).then(res => res.json())
      }
    ]
  })

  // Dữ liệu trả về
  const details = results[0]?.data
  const casts = results[1]?.data ?? []
  const videos = results[2]?.data?.results ?? []
  const similar = results[3]?.data?.results ?? []

  return (
    <div className='bg-[#0f0f0f]'>
      <Suspense>
        <DetailBanner
        movie={details}
        casts={casts}
        isLoading={results[0].isLoading}
      />
      </Suspense>
      
      <div className='py-2 px-4 md:px-8 lg:px-16'>
        {videos.map((video: any) => (
        <div className='mb-16'>
          <Video key={video.id} id={video.id} name={video.name} videoKey={video.key} />
        </div>
        
      ))}
      </div>
      

      <Suspense>
        <div className="bg-[#0f0f0f] px-4 md:px-8 py-8 lg:px-16 md:py-16">
          <Slider title='Similar' type={type} movies={similar} isLoading={results[3].isLoading}/>
        </div>
      </Suspense>
      
    </div>
  )
}

export default Detail
