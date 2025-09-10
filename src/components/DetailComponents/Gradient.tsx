import React, {useEffect, useRef} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useData } from '../../context/Context'
import { gradientProps } from '../../interface/interfaces'

const Gradient:React.FC<gradientProps> = ({location}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const getQuery = () => (new URLSearchParams(useLocation().search))
  const query = getQuery()
  const searchTerm = query.get('query')
  useEffect(() => {
    if(searchTerm){
      handleSearch(searchTerm)
    }
  }, [])
  const { handleSearch } = useData()
  return (
    <div className='h-fit 2xl:h-[50vh] bg-gradient-to-t from-black 2xl:from-gray-950 via-gray-800 to-[rgb(132, 245, 143)] flex flex-col'>
        <div className="w-full flex items-center justify-center pt-30 pb-15 2xl:pt-[15vh]">
            <h1 className='xl:text-5xl 2xl:text-[10vh] text-white font-bold'>{location}</h1>
        </div>
        
        <div className='w-full px-3 xl:px-10 2xl:px-[3vw] py-2 xl:py-5 2xl:py-[5vh]'>
            <div className='h-12 w-fit flex items-center rounded-full bg-black text-white xl:text-xl 2xl:text-[3vh] 2xl:h-[8vh]'>
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
                className='pl-5 xl:pr-30 2xl:pl-20 xl:pl-5 outline-none h-full font-medium placeholder-gray-500 leading-3'/>
                <button 
                className='h-full text-center flex items-center rounded-full 2xl:px-20 px-10 bg-red-600  font-semibold custom-shadow'
                onClick={() => window.location.search = `query=${inputRef.current?.value?? ""}`
                }
                >Search</button>
            </div>
        </div>
    </div>
  )
}

export default Gradient