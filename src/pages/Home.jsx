import React, {useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css'
import Banner from '../components/Banner'
import Slider from '../components/Slider'
import { useData } from '../context/Context'

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Index của slide hiện tại 
  const { trendingMovies, trendingTV, 
        topratedMovies, topratedTV } = useData() 
  return (
    <>
      <main>
        <Swiper 
        className='h-[28rem] xl:h-[68rem]'
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        pagination={false}>
          {
            trendingMovies.data?.results.map((movie, index) => (
              <SwiperSlide key={movie.id}>
                <Banner {...movie} isActive={index === activeIndex}/>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <Slider type={'Trending Movies'} route={'movie'} movies={trendingMovies.data?.results || []}/>
        <Slider type={'Top Rated Movies'} route={'movie'} movies={topratedMovies.data?.results || []}/>
        <Slider type={'Trending TV'} route={'tv'} movies={trendingTV.data?.results || []}/>
        <Slider type={'Top Rated TV'} route={'tv'} movies={topratedTV.data?.results || []}/>
      </main>
    </>
  )
}

export default Home