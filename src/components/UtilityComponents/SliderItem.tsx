import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import icons from '../../../public/assets/icon'
import { sliderItemProps } from '../../interface/interfaces'
import Media from './Media';
import { Link } from 'react-router-dom'
const SliderItem:React.FC<sliderItemProps> = ({movie, type}) => {
  return (
    <Link 
      className='flex-[1_0_calc(100%/var(--items-per-row)-1rem)] group relative flex flex-col text-white cursor-pointer'
      to={`/${type}/${movie?.id}`}>
        <Media src={
            movie?.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
              : '/assets/No_image_available.png'
          } type='image' title={movie?.title} className='child object-cover aspect-auto w-full h-72 2xl:h-80 rounded-3xl group-hover:brightness-50 transition-all duration-200 ease-in-out'/>
        <p className='child capitalize line-clamp-2 font-medium text-white text-sm md:text-lg mt-4 group-hover:text-red-500 hover:brightness-50 transistion-all duration-200 ease-in-out'>{movie?.title || movie?.name || <Skeleton width='100%' height='100%'/>}</p>
        <button className='child bg-red-500 absolute top-[calc(50%-1.5rem)] left-1/2 -translate-x-1/2 -translate-y-1/2 py-4 px-8 bg-red-main rounded-full shadow-btn z-10 text-white text-xl scale-50 transistion-all duration-200 opacity-0 group-hover:opacity-100 group-hover:scale-100'>
            <icons.caretRightFill className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6 xl:w-8 xl:h-8 2xl:w-[3vh] 2xl:h-[5vh] text-white"/>
        </button>
    </Link>
  )
}

export default SliderItem