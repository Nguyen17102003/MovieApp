import {FC} from 'react'
import { gradientProps } from '../../interface/interfaces'

const Gradient:FC<gradientProps> = ({location}) => {
  return (
    <div className='relative h-48 after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:bg-gradient-to-t after:from-[#0f0f0f] after:to-transparent'>
      <h1 className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-white text-4xl font-bold z-10'>{location}</h1>
    </div>
  )
}

export default Gradient