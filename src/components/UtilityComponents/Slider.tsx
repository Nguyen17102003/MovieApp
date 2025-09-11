import {FC} from 'react'
import { sliderProps } from '../../interface/interfaces';
import SliderItem from './SliderItem'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css'

const Slider:FC<sliderProps> = ({title='', type, movies, isLoading}) => {
  const redirect = () => {
    // Điều hướng trang web
    if(type === 'movie')
        window.location.href = '/movie'
    else window.location.href = '/tv'
  }
  return (
    <div className='w-full bg-black px-3 xl:px-8 py-0 pb-5 xl:py-20 2xl:px-[3vw]'>
        {isLoading ? 
        (<></>): ( 
        <>
        {/* Bên trên*/}
        <div className='flex w-full items-center justify-between mb-5 2xl:mb-[3vh]'>
            <h2 className='text-white text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] font-semibold appear'>{title}</h2>
            <button 
                className='hover:text-gray-500 hover:bg-white rounded-full px-4 xl:px-7 xl:py-1 2xl:px-10 border-2 border-white text-white text-sm lg:text-lg xl:text-xl 2xl:text-[3vh] font-semibold appear'
                onClick={redirect}
            >View more</button>
        </div>

        {/* Slideshow */}
        <Swiper 
            className='h-fit pb-0 shrink'
            spaceBetween={30} 
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
            modules={[Navigation, Pagination, Autoplay]}
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