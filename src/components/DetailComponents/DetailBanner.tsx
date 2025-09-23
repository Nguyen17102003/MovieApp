import {FC} from 'react'
import { detailBannerProps, genre, cast } from '../../interface/interfaces'


const DetailBanner:FC<detailBannerProps> = ({movie, casts, isLoading}) => {
  return (
    <div className={`${isLoading ? 'bg-gray-500 animate-pulse' : ''} relative px-4 md:px-8 lg:px-16 py-12 md:pt-32 md:pb-20 bg-center bg-no-repeat bg-cover z-0 before:content-[""] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-1/2 before:bg-[#0f0f0f] before:-z-10 after:content-[""] after:absolute after:top-0 after:left-0 after:right-0 after:h-1/2 after:bg-gradient-to-t after:from-[#0f0f0f] after:to-transparent after:-z-10`}
    style={{
        backgroundImage: movie?.backdrop_path
        ? `image-set(
        url(https://image.tmdb.org/t/p/w780/${movie?.backdrop_path}) 1x,
        url(https://image.tmdb.org/t/p/w1280/${movie?.backdrop_path}) 2x,
        url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path}) 3x
        )`
        : "none",
    }}
    >
        <div className='flex items-start -mx-4 max-h-fit'>
            {/* Poster phim bên trái */}
            <div className='hidden md:block w-64 lg:w-96 px-4'>
                {
                isLoading ? (
                    <div className='min-w-[30vw] 2xl:min-h-[100vh] rounded-xl md:rounded-2xl lg:rounded-3xl animate-pulse bg-gray-700'></div>
                ) : (
                    <img 
                    loading='lazy' 
                    srcSet={`
                    https://image.tmdb.org/t/p/w185/${movie.poster_path} 185w,
                    https://image.tmdb.org/t/p/w342/${movie.poster_path} 342w,
                    https://image.tmdb.org/t/p/w500/${movie.poster_path} 500w
                    `}
                    sizes="(max-width: 640px) 185px, (max-width: 1024px) 342px, 500px"
                    src={movie?.poster_path ? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}` : '/assets/No_image_available.png'} 
                    alt={movie?.title} 
                    className='w-full rounded-3xl object-cover object-center aspect-auto' />
                )
                }
            
            </div>
            
            {/* Thông tin phim bên phải */}
            <div className='px-4 flex-1 flex flex-col justify-between -my-2 lg:-my-4'>
                <h1 className='py-2 lg:py-4 font-bold text-white text-3xl md:text-5xl lg:text-7xl'>{movie?.title || movie?.name}</h1>
                <div className='py-4 flex flex-wrap items-center -mx-1'>
                    {movie?.genres && movie.genres.map((genre: genre) => (
                        <div key={genre.id} className='px-1 mb-4'>
                            <span className='bg-[#0f0f0f] px-4 py-1 border-2 border-white rounded-full text-white text-xs lg:text-sm'>
                                {genre.name}
                            </span>
                        </div>
                    ))}
                </div>
                <div className='py-2 lg:py-4 text-white text-xs md:text-sm lg:text-base'>
                    {movie?.overview}
                </div>
                <div className='py-2 lg:py-4'>
                    <h2 className='text-white text-xl font-medium'>{isLoading ? '' : 'Casts' }</h2>
                    <div className='flex flex-wrap -mx-2 mt-1' >
                        {casts && casts.map((cast: cast, i: number) => (
                            <div key={i} className='w-28 px-2 mb-1'>
                                <img srcSet={`
                                https://image.tmdb.org/t/p/w185/${movie.poster_path} 185w,
                                https://image.tmdb.org/t/p/w342/${movie.poster_path} 342w,
                                https://image.tmdb.org/t/p/w500/${movie.poster_path} 500w
                                `}
                                sizes="(max-width: 640px) 185px, (max-width: 1024px) 342px, 500px" src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`} className='rounded-xl object-cover aspect-auto'/>
                                <span className='text-white text-xs md:text-sm font-sm'>{cast.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
        
    </div>
  )
}

export default DetailBanner