import React from 'react'
import icons from '../../../public/assets/icon'
import { sliderItemProps } from '../../interface/interfaces'
import { Link } from 'react-router-dom'
const SliderItem:React.FC<sliderItemProps> = ({movie, type}) => {
  
  return (
    <Link 
      className='group relative flex flex-col gap-5 text-white cursor-pointer'
      to={`/${type}/${movie.id}`}>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className='child rounded-3xl group-hover:brightness-50 transistion-all duration-200 ease-in-out'/>
        <p className='child capitalize text-sm md:text-xl xl:text-2xl font-semibold group-hover:text-red-500 hover:brightness-50 transistion-all duration-200 ease-in-out'>{movie.title || movie.name}</p>
        <button className='child absolute top-1/3 right-[50px] bg-red-500 custom-shadow w-[100px] py-5 rounded-full transistion-all duration-200 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'>
            <icons.caretRightFill width={20} height={20}/>
        </button>
    </Link>
  )
}

export default SliderItem