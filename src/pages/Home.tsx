import {FC, useEffect, useState, lazy} from 'react'
import { movie } from '../interface/interfaces'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css'
import { useData } from '../context/Context'
import LazyLoad from '../components/UtilityComponents/LazyLoad';

const Banner = lazy(() => import('../components/HomeComponents/Banner'))
const Slider = lazy(() => import('../components/UtilityComponents/Slider'))

const Home:FC = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Index của slide hiện tại 
  const { trendingMovies, trendingTV, 
        topratedMovies, topratedTV, 
        reset, setSearchTerm,
        setHydrated } = useData() 
  useEffect(() => {
    setSearchTerm(null)
    reset()
  }, [])
  useEffect(() => {
    if(trendingMovies.data)
      setHydrated(true)
  }, [trendingMovies])
  return (
    <>
      <main>
        <Swiper 
        className='h-[28rem] xl:h-[68rem] 2xl:h-[120vh]'
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        pagination={false}>
          {
            trendingMovies.data?.results.map((movie: movie, index:number) => (
              <SwiperSlide lazy={true} key={movie.id}>
                <Banner movie={movie} isActive={index === activeIndex}/>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <LazyLoad fallback={<div className="min-h-[20rem] bg-gray-900 animate-pulse rounded-xl" />}>
          <Slider
          title="Trending Movies"
          type="movie"
          movies={trendingMovies.data?.results || []}
          isLoading={trendingMovies.isLoading}
          />
        </LazyLoad>

        <LazyLoad fallback={<div className="min-h-[20rem] bg-gray-900 animate-pulse rounded-xl" />}>
          <Slider
          title="Top Rated Movies"
          type="movie"
          movies={topratedMovies.data?.results || []}
          isLoading={topratedMovies.isLoading}
          />
        </LazyLoad>

        <LazyLoad fallback={<div className="min-h-[20rem] bg-gray-900 animate-pulse rounded-xl" />}>
          <Slider
          title="Trending TV"
          type="tv"
          movies={trendingTV.data?.results || []}
          isLoading={trendingTV.isLoading}
          />
        </LazyLoad>

        <LazyLoad fallback={<div className="h-[20rem] bg-gray-900 animate-pulse rounded-xl" />}>
          <Slider
          title="Top Rated TV"
          type="tv"
          movies={topratedTV.data?.results || []}
          isLoading={topratedTV.isLoading}
          />
        </LazyLoad>

      </main>
    </>
  )
}

export default Home