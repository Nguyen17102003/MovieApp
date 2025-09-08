import React from 'react'
import { videoProps } from '../../interface/interfaces'
const Video:React.FC<videoProps> = ({id, name, videoKey}) => {
  return (
    <div className='w-full min-w-screen h-screen bg-black px-5 xl:px-20 xl:py-30 pb-30'>
        <h1 className='text-white lg:text-2xl xl:text-4xl font-semibold py-10'>{name}</h1>
        <iframe 
        src={`https://www.youtube.com/embed/${videoKey}?rel=0`}
        title={name}
        className='w-full h-full aspect-video'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen/>
    </div>
  )
}

export default Video
