import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='w-full py-20 lg:pt-20 xl:py-40 bg-cover bg-no-repeat' style={{backgroundImage: 'url("/assets/footer.jpg")'}}>
      {/* Phần bên trên */}
      <div className='w-full flex justify-center lg:pb-20 px-40'>
      {/* Logo */}
      <Link to="/" className='hidden mt-10 lg:flex items-center gap-5'>
          <img src='/assets/logo.png' alt="Logo icon" className='w-15'/>
          <h1 className='text-white font-semibold text-2xl xl:text-5xl group-hover:text-red-main group-hover:transistion-custom'>
          theMovies
          </h1>
      </Link>
      </div>
      {/* Phần bên dưới */}
      <div className='grid gap-y-5 gap-x-3 grid-cols-2 mx-20 sm:grid-cols-3 xl:mx-40'>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl hover:text-red-500">Home</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl hover:text-red-500">Contact us</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl hover:text-red-500">Terms of service</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl hover:text-red-500">About us</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl hover:text-red-500">Live</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl hover:text-red-500">FAQ</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl hover:text-red-500">Premium</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl hover:text-red-500">You must watch</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl hover:text-red-500">Recent release</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl hover:text-red-500">Top IMDB</h2>
          <h2 className="text-white font-semibold text-sm md:text-xl lg:text-2xl xl:text-3xl hover:text-red-500">Privacy policy</h2>
      </div>        
    </div>
  )
}

export default Footer