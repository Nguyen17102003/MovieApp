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
    }
  }, [])
  const { handleSearch } = useData()
  return (
    <div className='h-fit 2xl:h-[50vh] pb-10 bg-gradient-to-t from-black via-gray-800 to-[rgb(132, 245, 143)] flex flex-col'>
        <div className="w-full flex items-center justify-center pt-30 pb-15 2xl:pt-[15vh]">
            <h1 className='xl:text-5xl 2xl:text-[10vh] text-white font-bold'>{location}</h1>
        </div>
        
        <div className='w-full px-3 xl:px-10 2xl:px-[3vw] py-2 xl:py-5 2xl:py-[2vh]'>
            <div className='h-12 w-fit gap-10 flex items-center rounded-full bg-black text-white xl:text-xl 2xl:text-[3vh] 2xl:h-[8vh]'>
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
                className='pl-5 2xl:pl-10 xl:pl-5 flex-6/10 outline-none h-full font-medium placeholder-gray-500 leading-3'/>
                <button 
                className='h-full text-center flex items-center flex-4/10 rounded-full 2xl:px-[2vw] px-8 bg-red-600  font-semibold custom-shadow'
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