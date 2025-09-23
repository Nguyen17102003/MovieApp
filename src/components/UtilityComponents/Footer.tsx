import {FC} from 'react'
import { Link } from 'react-router-dom'
const Footer:FC = () => {
  return (
    <div className='h-100 lg:h-120 px-8 py-12 md:p-16 bg-cover bg-no-repeat' style={{backgroundImage: 'url("/assets/footer.jpg")'}}>
      <div className='max-w-4xl h-full mx-auto flex flex-col justify-around'>
        {/* Logo */}
        <Link to="/"onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}  className='flex items-center justify-center hover:cursor-pointer group'>
            <img loading='lazy' src='/assets/logo.png' alt="Logo icon" className='mr-2 md:mr-4 w-8 md:w-12'/>
            <h1 className='text-white font-semibold text-2xl md:text-4xl group-hover:text-red-500'>
            theMovies
            </h1>
        </Link>

        {/* Phần bên dưới */}
        <div className='flex text-white font-semibold text-base md:text-2xl items-start justify-between flex-wrap -mx-2'>
            <a className="w-1/2 md:w-1/3 p-2 hover:text-red-500">Home</a>
            <a className="w-1/2 md:w-1/3 p-2 hover:text-red-500">Live</a>
            <a className="w-1/2 md:w-1/3 p-2 hover:text-red-500">You must watch</a>
            <a className="w-1/2 md:w-1/3 p-2 hover:text-red-500">Contact us</a>
            <a className="w-1/2 md:w-1/3 p-2 hover:text-red-500">FAQ</a>
            <a className="w-1/2 md:w-1/3 p-2 hover:text-red-500">Recent release</a>
            <a className="w-1/2 md:w-1/3 p-2 hover:text-red-500">Term of services</a>
            <a className="w-1/2 md:w-1/3 p-2 hover:text-red-500">Premium</a>
            <a className="w-1/2 md:w-1/3 p-2 hover:text-red-500">Top IMDB</a>
            <a className="w-1/2 md:w-1/3 p-2 hover:text-red-500">About us</a>
            <a className="w-1/2 md:w-1/3 p-2 hover:text-red-500">Privacy policy</a>
        </div>  
      </div>
            
    </div>
  )
}

export default Footer