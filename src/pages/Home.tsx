import {FC, useEffect, useState, lazy} from 'react'
import { movie } from '../interface/interfaces'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css'
import { useData } from '../context/Context'

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
      <main className='pb-10 bg-black'>
          <Swiper 
          slidesPerView={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          pagination={false}>
          {
          trendingMovies.data?.results.map((movie: movie, index:number) => (
            <SwiperSlide key={movie.id}>
              <Banner movie={movie} isActive={index === activeIndex}/>
            </SwiperSlide>
          ))
          }
          </Swiper>
          <Slider title={'Trending Movies'} type={'movie'} movies={trendingMovies.data?.results || []} isLoading={trendingMovies.isLoading}/>
          <Slider title={'Top Rated Movies'} type={'movie'} movies={topratedMovies.data?.results || []} isLoading={topratedMovies.isLoading}/>
          <Slider title={'Trending TV'} type={'tv'} movies={trendingTV.data?.results || []} isLoading={trendingTV.isLoading}/>
          <Slider title={'Top Rated TV'} type={'tv'} movies={topratedTV.data?.results || []} isLoading={topratedMovies.isLoading}/>
      </main>
    </>
  )
}

export default Home