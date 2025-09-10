import React from 'react'
import { detailBannerProps, genre, cast } from '../../interface/interfaces'


const DetailBanner:React.FC<detailBannerProps> = ({movie, casts}) => {
  return (
    <div className='relative min-w-screen z-0 after:content-[""] after:w-full after:h-full after:absolute after:bottom-0 after:left-0 after:-z-10 after:bg-gradient-to-t after:from-black after:via-gray-950 after:to-transparent px-5 py-15 md:flex md:gap-5 2xl:px-[5vw] 2xl:gap-12 xl:px-15 xl:py-40 xl:gap-8 bg-no-repeat bg-top bg-cover xl:bg-center'
    style={{
    backgroundImage: movie?.backdrop_path
      ? `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`
      : "none"
    }}>
        {/* Poster phim bên trái */}
        <div className='hidden w-full md:basis-1/3 z-30 md:px-2 xl:px-4 md:flex'>
            <img loading='lazy' src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt={movie?.title} className='w-full h-full rounded-xl md:rounded-2xl lg:rounded-3xl object-cover object-center aspect-auto' />
        </div>
        
        {/* Thông tin phim bên phải */}
        <div className='flex flex-col justify-baseline md:basis-2/3 gap-7 md:gap-5 lg:gap-10 z-30'>
            <h1 className='text-2xl md:text-4xl xl:text-8xl text-white font-bold'>{movie?.title || movie?.name}</h1>
            <div className='flex gap-2 py-5 md:py-0'>
                {movie?.genres && movie.genres.map((genre: genre) => (
                    <button key={genre.id} className='w-fit text-xs md:text-sm lg:text-base px-3 lg:px-5 2xl:text-4xl py-0.5 rounded-full border-white border-2 lg:border-3 font-medium lg:font-bold text-white bg-black'>{genre.name}</button>
                ))}
            </div>
            <div className='text-white text-xs md:text-sm lg:text-xl 2xl:text-[3vh] font-normal lg:font-medium text-justify'>
                {movie?.overview}
            </div>
            <h2 className='text-white font-semibold lg:text-2xl 2xl:text-[5vh]'>Casts</h2>
            <div className='md:flex lg:gap-5 2xl:gap-10 gap-3 lg:pb-15 grid grid-cols-3' >
                {casts && casts.map((cast: cast, i: number) => (
                    <div key={i} className='md:w-full xl:w-25 2xl:w-[10vw]'>
                        <img src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`} className='rounded-xl md:rounded-2xl lg:h-40 2xl:h-[30vh] lg:w-full aspect-auto'/>
                        <span className='text-white text-xs md:text-sm lg:text-base 2xl:text-4xl text-wrap max-w-full'>{cast.name}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default DetailBanner