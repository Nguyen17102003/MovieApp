import {FC} from 'react'
import { Link } from 'react-router-dom'
const Footer:FC = () => {
  return (
    <div className='w-full py-20 lg:py-10 xl:py-30 2xl:px-[10vh] 2xl:py-[20vh] bg-cover bg-no-repeat aspect-auto' style={{backgroundImage: 'url("/assets/footer.jpg")'}}>
      {/* Phần bên trên */}
      <div className='w-full flex items-center justify-center lg:pb-10 xl:pb-30 2xl:pb-[10vh] px-40'>
      {/* Logo */}
      <Link to="/"onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}  className='hidden lg:flex items-center gap-5 2xl:gap-[2vw]'>
          <img loading='lazy' src='/assets/logo.png' alt="Logo icon" className='w-15 2xl:w-[5vw]'/>
          <h1 className='text-white font-semibold text-2xl xl:text-5xl 2xl:text-[6vh] group-hover:text-red-main group-hover:transistion-custom'>
          theMovies
            </h1>
      </Link>
      </div>
      {/* Phần bên dưới */}
      <div className='grid gap-x-2 gap-y-2 sm:gap-y-5 sm:gap-x-3 xl:gap-y-10 2xl:gap-y-20 grid-cols-1 min-[200px]:grid-cols-2 mx-[10vw] sm:mx-20 sm:grid-cols-2 md:grid-cols-3 xl:mx-40'>
          <h2 className="text-white font-semibold text-[2vh] text-wrap sm:text-nowrap sm:text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500">Home</h2>
          <h2 className="text-white font-semibold text-[2vh] text-wrap sm:text-nowrap sm:text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500">Contact us</h2>
          <h2 className="text-white font-semibold text-[2vh] text-wrap sm:text-nowrap sm:text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500">Terms of service</h2>
          <h2 className="text-white font-semibold text-[2vh] text-wrap sm:text-nowrap sm:text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500">About us</h2>
          <h2 className="text-white font-semibold text-[2vh] text-wrap sm:text-nowrap sm:text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500">Live</h2>
          <h2 className="text-white font-semibold text-[2vh] text-wrap sm:text-nowrap sm:text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500">FAQ</h2>
          <h2 className="text-white font-semibold text-[2vh] text-wrap sm:text-nowrap sm:text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500">Premium</h2>
          <h2 className="text-white font-semibold text-[2vh] text-wrap sm:text-nowrap sm:text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500">You must watch</h2>
          <h2 className="text-white font-semibold text-[2vh] text-wrap sm:text-nowrap sm:text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500">Recent release</h2>
          <h2 className="text-white font-semibold text-[2vh] text-wrap sm:text-nowrap sm:text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500">Top IMDB</h2>
          <h2 className="text-white font-semibold text-[2vh] text-wrap sm:text-nowrap sm:text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500">Privacy policy</h2>
      </div>        
    </div>
  )
}

export default Footer