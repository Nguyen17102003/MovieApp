import React, {useState, useEffect} from 'react'
import SliderItem from './SliderItem'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css'

const Slider = ({type, movies, route}) => {
  const redirect = () => {
    // Điều hướng trang web
    if(type.includes('Movies'))
        window.location.href = '/movie'
    else window.location.href = '/tv'
  }
  return (
    <div className='w-full bg-black px-3 xl:px-8 py-0 pb-5 xl:py-20'>
        {/* Bên trên */}
        <div className='flex w-full items-center justify-between mb-5'>
            <h2 className='text-white text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold'>{type}</h2>
            <button 
                className='rounded-full px-4 xl:px-7 xl:py-1 border-2 border-white text-white text-sm lg:text-lg xl:text-xl font-semibold'
                onClick={redirect}
            >View more</button>
        </div>

        {/* Slideshow */}
        <Swiper 
            className='h-fit pb-0'
            spaceBetween={30} 
            breakpoints={{
                320: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 4
                },
                1024: {
                    slidesPerView: 6
                },
            }}
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{delay: 2500, disableOnInteraction: false}}
            pagination={false}>
            {
                movies?.length > 0 && movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <SliderItem poster_path={movie.poster_path} title={movie.title} id={movie.id} route={route}/>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </div>
  )
}

export default Slider