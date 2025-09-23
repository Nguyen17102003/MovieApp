import {FC, useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { useData } from '../../context/Context'

const Navbar:FC = () => {
  const { hydrated } = useData()
  const [isScrolled, setIsScrolled] = useState<boolean>(false) // State quản lý thanh navbar có đổi màu khi cuộn hay không
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); // Đổi màu thanh điều hướng sau khi cuộn chuột xuống
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  return (
    <div className={`px-8 flex justify-center fixed top-0 w-full z-50 transition-all duration-200 ease-in-out py-0 ${isScrolled ? 'md:py-4 bg-black' : 'md:py-8 bg-transparent'}`}>
       <div className={`max-w-screen-2xl flex justify-between items-center w-full`}>
        {/* Logo */}
        <NavLink to="/" className='hidden md:flex items-center hover:cursor-pointer group'>
            <img loading='lazy'
             srcSet="
              /assets/logo-48.png   48w,
              /assets/logo-96.png   96w,
              /assets/logo-192.png 192w,
              /assets/logo-512.png 512w
            " 
            src='/assets/logo.png' alt="Logo icon" className='mr-4 w-8 md:w-12'/>
            <h1 className='text-white font-semibold text-2xl md:text-4xl'>
            theMovies
            </h1>
        </NavLink>

        {/* Link trang web */}
        <div className='fixed md:relative left-0 md:left-auto right-0 md:right-auto bottom-0 md:bottom-auto flex items-center justify-evenly bg-black md:bg-transparent py-2 md:py-4 -mx-4'>
            {/* Trang chủ */}
            <NavLink to='/' className='relative px-4 group'>
            {({ isActive }) => (
              <>
                <h1 className="text-white flex text-nowrap group-hover:text-red-500 font-medium text-2xl leading-8">
                  Home
                </h1>
                <hr
                    className={`absolute left-[12.5%] w-[75%] bottom-0 h-[0.125rem] 2xl:h-[2px] border-none bg-red-500 transition-all duration-300 ease-out 
                    origin-center scale-x-0 group-hover:scale-x-100
                    ${hydrated && isActive ? 'scale-x-100' : ''}`}
                />
              </>
            )}
            </NavLink>

            {/* Movie */}
            <NavLink to='/movie' className='relative px-4 group'>
            {({ isActive }) => (
              <>
                <h1 className="text-white flex text-nowrap group-hover:text-red-500 font-medium text-2xl leading-8">
                  Movies
                </h1>
                <hr
                className={`absolute left-[12.5%] w-[75%] bottom-0 h-[0.125rem] border-none bg-red-500 transition-all duration-300 ease-out 
                origin-center scale-x-0 group-hover:scale-x-100
                ${isActive ? 'scale-x-100' : ''}`}
                />
              </>
            )}
            </NavLink>

            {/* TV */}
            <NavLink to='/tv' className='relative px-4 group'>
            {({ isActive }) => (
              <>
                <h1 className="text-white flex text-nowrap group-hover:text-red-500 font-medium text-2xl leading-8">
                  TV Series
                </h1>
                <hr
                className={`absolute left-[12.5%] w-[75%] bottom-0 h-[0.125rem] border-none bg-red-500 transition-all duration-300 ease-out 
                origin-center scale-x-0 group-hover:scale-x-100
                ${isActive ? 'scale-x-100' : ''}`}
                />
              </>
            )}
            </NavLink>
        </div>
       </div>
        
    </div>
  )
}

export default Navbar