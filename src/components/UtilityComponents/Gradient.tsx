import {FC, useEffect, useRef} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useData } from '../../context/Context'
import { gradientProps } from '../../interface/interfaces'

const Gradient:FC<gradientProps> = ({location}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const getQuery = () => (new URLSearchParams(useLocation().search))
  const query = getQuery()
  const searchTerm = query.get('query')
  useEffect(() => {
    if(searchTerm){
      handleSearch(searchTerm)
      inputRef.current!.value = searchTerm
    }
    
  }, [])
  const { handleSearch } = useData()
  return (
    <div className='min-h-[30vh] gap-10 md:gap-0 overflow-x-hidden justify-center items-center md:items-start w-full 2xl:h-[50vh] pb-10 bg-gradient-to-t from-gray-900 md:from-gray-950 via-gray-800 to-[rgb(132, 245, 143)] flex flex-col'>
        <div className="w-full flex items-center justify-center pt-10 md:pt-30 md:pb-15 2xl:pt-[15vh]">
            <h1 className='text-[3vh] min-[100px]:text-[5vh] sm:text-2xl md:text-4xl xl:text-5xl 2xl:text-[10vh] text-white font-bold'>{location}</h1>
        </div>
        
        <div className='w-[90vw] mx-[5vw] 2xl:mx-[3vw] flex-1 flex-grow flex-shrink sm:py-2 xl:py-5 2xl:py-[2vh] flex justify-center items-center lg:justify-start'>
            <div className='h-10 w-full lg:h-12 lg:w-[40vw] gap-2 sm:gap-10 flex items-center min-[100px]:rounded-full bg-black text-white text-[2vh] sm:text-base md:text-lg xl:text-xl 2xl:text-[3vh] 2xl:h-[8vh]'>
                <input type="text" 
                placeholder='Enter keyword' 
                ref={inputRef}
                onKeyDown={(e) => {
                  if(e.key === 'Enter'){
                    const value = inputRef.current?.value?? ""
                    navigate(`?query=${encodeURIComponent(value)}`)
                    e.currentTarget.blur()
                    handleSearch(value)
                  }
                }}
                className='whitespace-nowrap overflow-hidden overflow-ellipsis flex-1 flex-grow flex-shrink min-[100px]:ml-3 md:pl-5 2xl:pl-10 outline-none h-full font-medium placeholder-gray-500 leading-3'/>
                <button 
                className='h-full text-center hidden sm:flex font-light items-center flex-shrink rounded-full 2xl:px-[2vw] sm:px-8 bg-red-600  sm:font-semibold border border-white sm:border-none custom-shadow'
                onClick={() => {
                  const value = inputRef.current?.value?? ""
                  navigate(`?query=${encodeURIComponent(value)}`)
                  handleSearch(value)}
                }
                >Search</button>
            </div>
        </div>
    </div>
  )
}

export default Gradient