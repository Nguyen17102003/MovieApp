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
    <div className='min-h-[30vh] gap-10 md:gap-20 overflow-x-hidden justify-center items-center md:items-start w-full xl:pt-10 2xl:pt-0 xl:h-[70vh] 2xl:h-[50vh] pb-10 bg-gradient-to-t from-gray-900 sm:from-gray-950 2xl:from-black via-gray-800 to-[rgb(132, 245, 143)] flex flex-col'>
        <div className="w-full flex items-center justify-center pt-10 md:pt-20 2xl:pt-[15vh]">
            <h1 className='text-[3vh] min-[100px]:text-[5vh] sm:text-2xl md:text-4xl xl:text-5xl 2xl:text-[vh] text-white font-bold'>{location}</h1>
        </div>
        
        <div className='w-[90vw] mx-[5vw] xl:mx-[16vw] 2xl:mx-[20vw] flex-1 flex-grow flex-shrink sm:py-2 xl:py-5 2xl:py-[2vh] flex justify-center items-center lg:justify-start'>
            <div className='h-10 w-full lg:w-[30vw] gap-1 flex items-center min-[100px]:rounded-full bg-black text-white text-[2vh] min-[300px]:text-base md:text-lg xl:text-lg 2xl:text-[2vh] 2xl:h-[6vh]'>
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
                className='whitespace-nowrap overflow-hidden overflow-ellipsis w-full flex-1 sm:flex-8 lg:flex-7 flex-grow flex-shrink min-[100px]:ml-3 md:ml-5 outline-none h-full font-medium placeholder-gray-500 leading-3'/>
                <button 
                className='h-full text-center hidden sm:flex sm:flex-2 lg:flex-3 w-full font-light justify-center items-center flex-shrink rounded-full 2xl:px-1 sm:px-8 bg-red-600  sm:font-semibold border border-white sm:border-none custom-shadow'
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