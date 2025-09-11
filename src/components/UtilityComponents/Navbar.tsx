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
    <div className={`flex px-[5vw] justify-between items-center fixed top-0 w-full min-w-screen z-10 bg-transparent ${isScrolled ? 'xl:bg-black' : 'xl:bg-transparent'}`}>
       <div className={`flex justify-between items-center w-full ${isScrolled ? 'xl:py-5 2xl:py-[2vh]' : 'xl:py-13 2xl:py-[5vh]'}`}>
        {/* Logo */}
        <NavLink to="/" className='hidden xl:flex items-center gap-5 2xl:gap-[1vw] basis-3/4'>
            <img src='/assets/logo.png' alt="Logo icon" className='w-15 2xl:w-[5vw]'/>
            <h1 className='text-white font-semibold text-3xl xl:text-5xl 2xl:text-[5vh]'>
            theMovies
            </h1>
        </NavLink>

        {/* Link trang web */}
        <div className='flex xl:basis-1/4 border-white items-center py-3 2xl:py-[2vh]  bg-black justify-evenly fixed left-0 bottom-0 right-0 xl:py-0 xl:bg-transparent xl:relative xl:left-auto xl:right-auto xl:bottom-auto'>
            {/* Trang chủ */}
            <NavLink to='/' className='relative mx-4 2xl:mx-[1vw] pb-1 group'>
            {({ isActive }) => (
              <>
                <h1 className="text-white flex text-nowrap group-hover:text-red-500 font-semibold text-xl xl:text-3xl 2xl:text-[4vh] mb-2">
                  Home
                </h1>
                <hr
                    className={`absolute left-0 w-full bottom-0 h-[3px] xl:h-[5px] border-none bg-red-500 transition-all duration-300 ease-out 
                    origin-center scale-x-0 group-hover:scale-x-100
                    ${hydrated && isActive ? 'scale-x-100' : ''}`}
                />
              </>
            )}
            </NavLink>

            {/* Movie */}
            <NavLink to='/movie' className='relative mx-4 2xl:mx-[1vw] pb-1 group'>
            {({ isActive }) => (
              <>
                <h1 className="text-white flex text-nowrap group-hover:text-red-500 font-semibold text-xl xl:text-3xl 2xl:text-[4vh] mb-2">
                  Movies
                </h1>
                <hr
                className={`absolute left-0 w-full bottom-0 h-[3px] xl:h-[5px] border-none bg-red-500 transition-all duration-300 ease-out 
                origin-center scale-x-0 group-hover:scale-x-100
                ${isActive ? 'scale-x-100' : ''}`}
                />
              </>
            )}
            </NavLink>

            {/* TV */}
            <NavLink to='/tv' className='relative mx-4 2xl:mx-[1vw] pb-1 group'>
            {({ isActive }) => (
              <>
                <h1 className="text-white flex text-nowrap group-hover:text-red-500 font-semibold text-xl xl:text-3xl 2xl:text-[4vh] mb-2">
                  TV Series
                </h1>
                <hr
                className={`absolute left-0 w-full bottom-0 h-[3px] xl:h-[5px] border-none bg-red-500 transition-all duration-300 ease-out 
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