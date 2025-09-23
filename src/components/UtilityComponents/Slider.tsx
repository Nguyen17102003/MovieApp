import {FC} from 'react'
import { sliderProps } from '../../interface/interfaces';
import SliderItem from './SliderItem'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const Slider:FC<sliderProps> = ({title='', type, movies, isLoading}) => {
  const redirect = () => {
    // Điều hướng trang web
    if(type === 'movie')
        window.location.href = '/movie'
    else window.location.href = '/tv'
  }
  return (
    <div className='max-w-screen-2xl mx-auto mt-8'>
        {isLoading ? 
        (<></>): ( 
        <>
        {/* Bên trên*/}
        <div className='flex items-center justify-between'>
            <h2 className='text-white font-medium text-lg md:text-2xl appear'>{title}</h2>
            <button 
                className='text-white border-white rounded-full border-3 md:border-2 font-semibold text-sm px-4 leading-5 md:px-8 md:text-xl md:leading-7 appear'
                onClick={redirect}
            >View more</button>
        </div>

        {/* Slideshow */}
        <Swiper 
            spaceBetween={15} 
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
                movies?.length > 0 && movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <SliderItem movie={movie} type={type}/>
                    </SwiperSlide>
                ))
            }
            
        </Swiper>
        </>)
        }
    </div>
  )
}

export default Slider