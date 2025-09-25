import {FC} from 'react'
import Media from '../UtilityComponents/Media'
import { Link } from 'react-router-dom'
import { bannerProps } from '../../interface/interfaces'
import { useData } from '../../context/Context'

const Banner:FC<bannerProps> = ({movie, isActive, isLoading}) => {
  const {openTrailer, prefetchHangingTrailer} = useData()
  return (
    <div key={isActive ? `active-${movie.id}` : `inactive-${movie.id}`} 
    className={`${isLoading && 'bg-gray-200 animate-pulse min-h-screen min-w-screen'} relative h-100 md:h-[36rem] lg:h-[52rem] px-4 md:pl-12 md:pr-15  py-12 md:py-32 flex justify-center bg-center bg-no-repeat bg-cover
    before:bg-[rgba(255, 255, 255, 0.4)] before:w-full before:h-full before:z-0 before:backdrop-brightness-45 before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0
    after:z-10 after:w-full after:h-full after:absolute after:bottom-0 after:right-0 after:bg-gradient-to-t after:via-transparent after:from-black after:to-transparent`}
     style={{
        backgroundImage: movie?.backdrop_path && !isLoading
        ? `image-set(
        url(https://image.tmdb.org/t/p/w780/${movie?.backdrop_path}) 1x,
        url(https://image.tmdb.org/t/p/w1280/${movie?.backdrop_path}) 2x,
        url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path}) 3x
        )`
        : "none",
    }}>  
        <div className='max-w-screen-2xl z-20 h-fit flex items-center justify-between'>
            {/* Bên trái */}
            <div className='w-full lg:w-2/3 px-4 z-20'>
                {/* Tiêu đề */}
                <h1 className={`z-10 font-bold text-4xl md:text-6xl lg:text-8xl text-white ${isActive ? 'textdrop-delay-300' : ''}`}>
                  {
                    isLoading ? <div className='w-[50vw] h-20 rounded-3xl bg-gray-300 animate-pulse'/> : movie.title  
                  }
                </h1>
                {/* Giới thiệu */}
                <h1 className={`z-10 font-medium my-12 text-white text-xs md:text-xl ${isLoading && 'h-[30vh]'} ${isActive ? 'textdrop-delay-500' : ''}`}>
                  {
                    isLoading ? <div className='w-[50vw] rounded-3xl h-full bg-gray-300 animate-pulse'/> : movie.overview  
                  }
                </h1>
                {/* Nút bấm */}
                <div className={`flex justify-baseline sm:items-start sm:w-fit sm:px-0 w-full min-[200px]:flex-row items-center sm:py-5 gap-5 2xl:gap-[2vh] ${isActive ? 'textdrop-delay-700' : ''}`}>
                    {isLoading ? (<>
                      <div className='px-4 w-50 h-15 rounded-full bg-gray-300 animate-pulse'></div>
                      <div className='px-4 w-50 h-15 rounded-full bg-gray-300 animate-pulse'></div>
                    </>) : (
                      <>
                      <Link 
                      className='flex px-4 py-1 md:py-2 justify-center items-center bg-red-600 min-[200px]:text-nowrap md:px-6 rounded-full custom-shadow font-semibold text-white md:text-2xl text-center'
                      to={`/movie/${movie.id}`}
                      >Watch now
                      </Link>
                      <button
                      className='flex px-4 py-1 md:py-2 justify-center items-center bg-transparent min-[200px]:text-nowrap md:px-6 rounded-full border-2 font-semibold border-white text-white md:text-2xl text-center hover:bg-white hover:text-gray-500'
                      onMouseEnter={() => prefetchHangingTrailer(movie?.id)}
                      onClick={() => openTrailer(movie?.id)}
                      >
                      Watch trailer
                      </button>
                      </>
                    )}
                   
                </div>
            </div>

            {/* Bên phải */}
            <div className={`hidden px-4 lg:block lg:w-1/3 ${isActive ? 'grow' : ''}`}>
              {isLoading 
              ? (<div className='w-90 h-[100vh] rounded-3xl bg-gray-300 animate-pulse'></div>) 
              : (<Media src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} title={`${movie.title || 'Poster'}`} className='w-90 rounded-3xl object-cover aspect-auto' type='image'/>)}
            </div>
           
        </div>
       
    </div>
  )
}

export default Banner