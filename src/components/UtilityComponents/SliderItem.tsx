import {FC, useState, useEffect} from 'react'
import icons from '../../../public/assets/icon'
import { sliderItemProps } from '../../interface/interfaces'
import { Link } from 'react-router-dom'
const SliderItem:React.FC<sliderItemProps> = ({movie, type}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    if (movie.poster_path) {
      const img = new Image()
      img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
      img.onload = () => setIsImageLoaded(true)
    } else {
      setIsImageLoaded(true)
    }
  }, [movie.poster_path])
  
  return (
    <Link 
      className='shrink group relative flex flex-col gap-5 2xl:gap-10 text-white cursor-pointer'
      to={`/${type}/${movie.id}`}>
       {isImageLoaded ? (
        <img
          loading="lazy"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : '/assets/No_image_available.png'
          }
          srcSet={movie.poster_path ? `
          https://image.tmdb.org/t/p/w185/${movie.poster_path} 185w,
          https://image.tmdb.org/t/p/w342/${movie.poster_path} 342w,
          https://image.tmdb.org/t/p/w500/${movie.poster_path} 500w
          ` : '/assets/No_image_available.png' }
          sizes="(max-width: 640px) 185px, (max-width: 1024px) 342px, 500px"
          alt={movie.title}
          className="child object-cover aspect-auto h-[20rem] 2xl:h-[50vh] rounded-3xl 2xl:rounded-4xl group-hover:brightness-50 transition-all duration-200 ease-in-out"
        />
      ) : (
        <div className="child object-cover aspect-auto h-[20rem] 2xl:h-[50vh] rounded-3xl 2xl:rounded-4xl animate-pulse bg-gray-800"></div>
      )}
        <p className='child capitalize text-sm md:text-xl xl:text-2xl 2xl:text-[3vh] font-semibold group-hover:text-red-500 hover:brightness-50 transistion-all duration-200 ease-in-out'>{movie.title || movie.name}</p>
        <button className='child absolute top-[calc(20rem/2-1.5rem)] 2xl:top-[calc(50vh/2-5vh)] right-[calc(50%-3rem)] 2xl:right-[calc(50%-4vw)] h-[3rem] w-[6rem] 2xl:h-[10vh] 2xl:w-[8vw] bg-red-500 custom-shadow  rounded-full transistion-all duration-200 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'>
            <icons.caretRightFill className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6 xl:w-8 xl:h-8 2xl:w-[5vh] 2xl:h-[10vh] text-white"/>
        </button>
    </Link>
  )
}

export default SliderItem