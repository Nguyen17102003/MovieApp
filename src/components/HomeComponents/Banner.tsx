import {FC, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { bannerProps } from '../../interface/interfaces'

const Banner:FC<bannerProps> = ({movie, isActive}) => {
  return (
    <div key={isActive ? `active-${movie.id}` : `inactive-${movie.id}`} 
    className='relative h-100 md:h-[36rem] lg:h-[52rem] px-4 md:px-12 py-12 md:py-32 flex justify-center bg-center bg-no-repeat bg-cover
    before:bg-[rgba(255, 255, 255, 0.4)] before:w-full before:h-full before:z-0 before:backdrop-brightness-45 before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0
    after:z-10 after:w-full after:h-full after:absolute after:bottom-0 after:right-0 after:bg-gradient-to-t after:via-transparent after:from-black after:to-transparent'
    style={{
    backgroundImage: movie.backdrop_path
      ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
      : "none"
    }}>  
        <div className='max-w-screen-2xl z-20 h-fit flex items-center justify-between'>
            {/* Bên trái */}
            <div className='w-full lg:w-2/3 px-4 z-20'>
                {/* Tiêu đề */}
                <h1 className={`z-10 font-bold text-4xl md:text-6xl lg:text-8xl text-white ${isActive ? 'textdrop-delay-300' : ''}`}>
                  {movie.title}
                </h1>
                {/* Giới thiệu */}
                <h1 className={`z-10 font-medium text-white text-xs md:text-xl my-12  ${isActive ? 'textdrop-delay-500' : ''}`}>
                  {movie.overview}
                </h1>
                {/* Nút bấm */}
                <div className={`flex justify-baseline sm:items-start sm:w-fit sm:px-0 w-full min-[200px]:flex-row items-center sm:py-5 gap-5 2xl:gap-[2vh] ${isActive ? 'textdrop-delay-700' : ''}`}>
                    <Link 
                    className='flex px-4 py-1 md:py-2 justify-center items-center bg-red-600 min-[200px]:text-nowrap md:px-6 rounded-full custom-shadow font-semibold text-white md:text-2xl text-center'
                    to={`/movie/${movie.id}`}
                    >Watch now
                    </Link>
                    <Link 
                    className='flex px-4 py-1 md:py-2 justify-center items-center bg-transparent min-[200px]:text-nowrap md:px-6 rounded-full border-2 font-semibold border-white text-white md:text-2xl text-center hover:bg-white hover:text-gray-500'
                    to={`/movie/${movie.id}`}
                    >
                    Watch trailer
                    </Link>
                </div>
            </div>

            {/* Bên phải */}
            <div className={`hidden px-4 lg:block lg:w-1/3 ${isActive ? 'grow' : ''}`}>
              <img loading='lazy' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`${movie.title || 'Poster'}`} className='w-96 rounded-3xl aspect-auto'/>
            </div>
           
        </div>
       
    </div>
  )
}

export default Banner