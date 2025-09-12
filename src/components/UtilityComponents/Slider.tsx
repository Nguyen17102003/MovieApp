import {FC} from 'react'
import { sliderProps } from '../../interface/interfaces';
import SliderItem from './SliderItem'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const Slider:FC<sliderProps> = ({title='', type, movies, isLoading}) => {
  const redirect = () => {
    // Điều hướng trang web
    if(type === 'movie')
        window.location.href = '/movie'
    else window.location.href = '/tv'
  }
  return (
    <div className='max-w-full bg-black px-[5vw] py-0 pb-2 sm:pb-5 xl:py-10 md:px-50 2xl:px-[20vw]'>
        {isLoading ? 
        (<></>): ( 
        <>
        {/* Bên trên*/}
        <div className='flex w-full items-center justify-center min-[300px]:justify-between mb-5 2xl:mb-[3vh]'>
            <h2 className='text-white text-[3vh] min-[200px]:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[3vh] font-semibold appear'>{title}</h2>
            <button 
                className='hidden min-[300px]:flex hover:text-gray-500 hover:bg-white rounded-full px-2 min-[300px]:px-4 xl:px-6 xl:py-1 2xl:px-10 border-2 border-white text-white text-sm lg:text-lg xl:text-xl 2xl:text-[2vh] font-semibold appear'
                onClick={redirect}
            >View more</button>
        </div>

        {/* Slideshow */}
        <Swiper 
            className='h-fit w-full pb-0 shrink'
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