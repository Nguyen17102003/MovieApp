import React from 'react'
import icons from '../../public/assets/icon'
import { Link } from 'react-router-dom'
const SliderItem = ({poster_path, title, name, id, route}) => {
  
  return (
    <Link 
      className='group relative flex flex-col gap-5 text-white cursor-pointer'
      to={`/${route}/${id}`}>
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} className='child rounded-3xl group-hover:brightness-50 transistion-all duration-200 ease-in-out'/>
        <p className='child capitalize text-sm md:text-xl xl:text-2xl font-semibold group-hover:text-red-500 hover:brightness-50 transistion-all duration-200 ease-in-out'>{title || name}</p>
        <button className='child absolute top-1/3 right-[50px] bg-red-500 custom-shadow w-[100px] py-5 rounded-full transistion-all duration-200 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'>
            <icons.caretRightFill width={20} height={20}/>
        </button>
    </Link>
  )
}

export default SliderItem