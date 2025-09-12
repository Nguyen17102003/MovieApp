import {FC, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { bannerProps } from '../../interface/interfaces'

const Banner:FC<bannerProps> = ({movie, isActive}) => {
  return (
    <div key={isActive ? `active-${movie.id}` : `inactive-${movie.id}`} 
    className='overflow-hidden bg-no-repeat bg-center w-full h-fit xl:h-screen 2xl:h-[120vh] xl:bg-center 2xl:bg-center bg-cover relative md:px-50 2xl:px-[20vw] 2xl:py-[10vh]
    before:bg-[rgba(255, 255, 255, 0.4)] before:w-full before:h-full before:z-0 before:backdrop-brightness-45 before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0
    after:z-10 after:w-full after:h-full after:absolute after:bottom-0 after:right-0 after:bg-gradient-to-t after:via-transparent after:from-black after:to-transparent'
    style={{
    backgroundImage: movie.backdrop_path
      ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
      : "none"
    }}>  
        <div className='z-20 px-5 w-full max-w-screen lg:py-10 xl:py-40 flex gap-20 2xl:gap-[10vh] h-auto items-stretch'>
            {/* Bên trái */}
            <div className='z-20 flex flex-col w-full items-baseline gap-3 xl:gap-[5vh] xl:basis-2/3'>
                {/* Tiêu đề */}
                <h1 className={`text-[2vh] min-[200px]:text-xl text-wrap sm:text-2xl text-white py-6 xl:py-0 text-4xl font-bold md:text-4xl xl:text-5xl 2xl:text-[8vh] xl:font-bold ${isActive ? 'textdrop-delay-300' : ''}`}>
                  {movie.title}
                </h1>
                {/* Giới thiệu */}
                <h1 className={`text-[2vh] min-[200px]:text-xs text-white md:text-lg xl:text-xl 2xl:text-[2vh] font-semibold min-[200px]:text-justify ${isActive ? 'textdrop-delay-500' : ''}`}>
                  {movie.overview}
                </h1>
                {/* Nút bấm */}
                <div className={`flex flex-col justify-center sm:items-start sm:w-fit px-[5vw] sm:px-0 w-full min-[200px]:flex-row items-center sm:py-5 gap-5 2xl:gap-[2vh] ${isActive ? 'textdrop-delay-700' : ''}`}>
                    <Link 
                    className='flex w-full justify-center items-center sm:w-fit min-[200px]:py-2 bg-red-600 min-[200px]:text-nowrap min-[200px]:px-2 sm:py-2 md:py-3 md:px-10 rounded-full custom-shadow font-semibold text-white text-[2vh] min-[300px]:text-base sm:text-xl md:text-xl xl:text-2xl 2xl:text-[3vh] text-center'
                    to={`/movie/${movie.id}`}
                    >Watch now
                    </Link>
                    <Link 
                    className='flex w-full justify-center items-center sm:w-fit min-[200px]:py-2 min-[200px]:text-nowrap min-[200px]:px-2 md:py-3 md:px-10 rounded-full border-2 font-semibold border-white text-white text-[2vh] min-[300px]:text-base sm:text-xl md:text-xl xl:text-2 2xl:text-[3vh] text-center hover:bg-white hover:text-gray-500'
                    to={`/movie/${movie.id}`}
                    >
                    Watch trailer
                    </Link>
                </div>
            </div>

            {/* Bên phải */}
            <div className={`hidden h-auto z-50 xl:block xl:basis-1/3 ${isActive ? 'grow' : ''}`}>
              <img loading='lazy' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={`${movie.title || 'Poster'}`} className='w-full h-full object-cover rounded-3xl aspect-auto'/>
            </div>
           
        </div>
       
    </div>
  )
}

export default Banner