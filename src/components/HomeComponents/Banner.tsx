import React from 'react'
import { Link } from 'react-router-dom'
import { bannerProps } from '../../interface/interfaces'


const Banner:React.FC<bannerProps> = ({movie, isActive}) => {

  return (
    <div key={isActive ? `active-${movie.id}` : `inactive-${movie.id}`} 
    className='bg-no-repeat bg-center w-screen min-w-sreen h-full xl:bg-top bg-cover relative z-50 md:px-12 md:pt-5 2xl:px-[5vw] 2xl:pt-[10vh]
    before:bg-[rgba(255, 255, 255, 0.4)] before:w-full before:h-full before:z-0 before:backdrop-brightness-45 before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0
    after:z-10 after:w-full after:h-1/4 after:absolute after:bottom-0 after:right-0 after:bg-gradient-to-t after:via-transparent after:from-black after:to-transparent'
    style={{
    backgroundImage: movie.backdrop_path
      ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
      : "none"
    }}>  
        <div className='z-20 px-8 lg:px-10 lg:pt-10 xl:pt-40 flex gap-20'>
            {/* Bên trái */}
            <div className='z-20 flex flex-col w-full items-baseline gap-5 xl:py-10 xl:gap-15 xl:basis-2/3'>
                {/* Tiêu đề */}
                <h1 className={`text-white py-6 xl:py-0 text-4xl font-bold md:text-6xl xl:text-8xl 2xl:text-[10vh] xl:font-bold ${isActive ? 'textdrop-delay-300' : ''}`}>
                  {movie.title}
                </h1>
                {/* Giới thiệu */}
                <h1 className={`text-white text-xs md:text-xl xl:text-2xl 2xl:text-[4vh] font-semibold text-justify ${isActive ? 'textdrop-delay-500' : ''}`}>
                  {movie.overview}
                </h1>
                {/* Nút bấm */}
                <div className={`flex items-center py-5 gap-5 2xl:gap-[2vh] ${isActive ? 'textdrop-delay-700' : ''}`}>
                    <Link 
                    className='w-fit bg-red-600 text-nowrap py-2 px-5 md:py-3 md:px-10 rounded-full custom-shadow font-semibold text-white text-sm md:text-xl xl:text-2xl 2xl:text-[3vh] text-center'
                    to={`/movie/${movie.id}`}
                    >Watch now
                    </Link>
                    <Link 
                    className='w-fit text-nowrap py-2 md:py-3 px-5 md:px-10 rounded-full border-2 font-semibold border-white text-white text-sm md:text-xl xl:text-2 2xl:text-[3vh] text-center hover:bg-white hover:text-gray-500'
                    to={`/movie/${movie.id}`}
                    >
                    Watch trailer
                    </Link>
                </div>
            </div>

            {/* Bên phải */}
            <div className={`hidden min-h-full z-50 xl:block xl:basis-1/3 h-full ${isActive ? 'grow' : ''}`}>
              <img loading='lazy' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={`${movie.title || 'Poster'}`} className='w-full h-full object-cover rounded-3xl aspect-auto'/>
            </div>
           
        </div>
       
    </div>
  )
}

export default Banner