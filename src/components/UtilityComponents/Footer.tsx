import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='w-full py-20 lg:pt-20 xl:py-40 2xl:px-[10vh] 2xl:py-[20vh] bg-cover bg-no-repeat' style={{backgroundImage: 'url("/assets/footer.jpg")'}}>
      {/* Phần bên trên */}
      <div className='w-full flex justify-center lg:pb-20 2xl:pb-[10vh] px-40'>
      {/* Logo */}
      <Link to="/" className='hidden mt-10 lg:flex items-center gap-5 2xl:gap-[2vw]'>
          <img src='/assets/logo.png' alt="Logo icon" className='w-15 2xl:w-[5vw]'/>
          <h1 className='text-white font-semibold text-2xl xl:text-5xl 2xl:text-[6vh] group-hover:text-red-main group-hover:transistion-custom'>
          theMovies
          </h1>
      </Link>
      </div>
      {/* Phần bên dưới */}
      <div className='grid gap-y-5 gap-x-3 2xl:gap-y-10 grid-cols-2  mx-20 sm:grid-cols-3 xl:mx-40'>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500 text-nowrap">Home</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500 text-nowrap">Contact us</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500 text-nowrap">Terms of service</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500 text-nowrap">About us</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500 text-nowrap">Live</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500 text-nowrap">FAQ</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500 text-nowrap">Premium</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500 text-nowrap">You must watch</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500 text-nowrap">Recent release</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500 text-nowrap">Top IMDB</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[4vh] hover:text-red-500 text-nowrap">Privacy policy</h2>
      </div>        
    </div>
  )
}

export default Footer