import {FC} from 'react'
import { sliderProps } from '../../interface/interfaces';
import SliderItem from './SliderItem'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const Slider:FC<sliderProps> = ({title='', type, movies}) => {
  const redirect = () => {
    // Điều hướng trang web
    if(type === 'movie')
        window.location.href = '/movie'
    else window.location.href = '/tv'
  }
  return (
    <div className='max-w-screen-2xl mx-auto my-8'>
        {/* Bên trên*/}
        <div className='flex items-center justify-between mb-8'>
            {
                movies?.length > 0 ? (<>
                 <h2 className='text-white font-medium text-lg md:text-2xl appear'>{title}</h2>
                <button 
                    className='text-white border-white rounded-full border-3 md:border-2 font-semibold text-sm px-4 leading-5 md:px-8 md:text-xl md:leading-7 appear'
                    onClick={redirect}
                >View more</button>
                </>) : (
                    <>
                        <div className='w-50 h-10 rounded-full bg-gray-300 animate-pulse'></div>
                        <div className='w-35 h-10 rounded-full bg-gray-300 animate-pulse'></div>
                    </>
                )
            }
           
        </div>

        {/* Slideshow */}
        <Swiper 
            spaceBetween={25} 
            breakpoints={{
                320: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 4
                },
                1024: {
                    slidesPerView: 6,
                },
            }}
            modules={[Autoplay]}
            autoplay={{delay: 2500, disableOnInteraction: false}}
            pagination={false}>
            {
                movies?.length > 0 ? movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <SliderItem movie={movie} type={type}/>
                    </SwiperSlide>
                )) : Array.from({ length: 6 }).map((_, i) => (
                    <SwiperSlide key={`skeleton-${i}`}>
                        <div className='relative w-full h-72 2xl:h-80 rounded-3xl bg-gray-300 animate-pulse'>
                        </div>
                    </SwiperSlide>
          ))
            }
            
        </Swiper>
    </div>
  )
}

export default Slider