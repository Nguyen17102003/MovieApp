import {FC} from 'react'
import { videoProps } from '../../interface/interfaces'
const Video:FC<videoProps> = ({id, name, videoKey}) => {
  return (
    <div>
        <h1 className='text-white text-base md:text-2xl font-semibold mb-4'>{name}</h1>
        <iframe 
        loading='lazy'
        src={`https://www.youtube.com/embed/${videoKey}?rel=0`}
        title={name}
        width='100%'
        height={800}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen/>
    </div>
  )
}

export default Video
