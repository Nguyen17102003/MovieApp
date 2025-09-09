import React, {useState} from 'react'
import { movie } from '../interface/interfaces'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css'
import Banner from '../components/HomeComponents/Banner'
import Slider from '../components/UtilityComponents/Slider'
import { useData } from '../context/Context'

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Index của slide hiện tại 
  const { trendingMovies, trendingTV, 
        topratedMovies, topratedTV } = useData() 
  return (
    <>
      <main>
        <Swiper 
        className='h-[28rem] xl:h-[68rem] 2xl:h-screen'
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
        <Slider title={'Trending Movies'} type={'movie'} movies={trendingMovies.data?.results || []}/>
        <Slider title={'Top Rated Movies'} type={'movie'} movies={topratedMovies.data?.results || []}/>
        <Slider title={'Trending TV'} type={'tv'} movies={trendingTV.data?.results || []}/>
        <Slider title={'Top Rated TV'} type={'tv'} movies={topratedTV.data?.results || []}/>
      </main>
    </>
  )
}

export default Home