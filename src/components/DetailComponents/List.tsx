import {FC, useEffect, useRef} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { listProps } from '../../interface/interfaces'
import SliderItem from '../../components/UtilityComponents/SliderItem'
import LazyLoad from '../UtilityComponents/LazyLoad'
import { useData } from '../../context/Context'
const List:FC<listProps> = ({movies, type, fetchFn}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const getQuery = () => (new URLSearchParams(useLocation().search))
  const query = getQuery()
  const searchTerm = query.get('query')
  const { handleSearch } = useData()
  useEffect(() => {
    if(searchTerm){
      handleSearch(searchTerm)
      inputRef.current!.value = searchTerm
    }
  }, [])

  return (
    <div className='bg-[#0f0f0f] px-4 md:px-8 py-8 xl:p-16'>
      <div className='max-w-screen-2xl mx-auto'>
        <div className='flex items-center relative rounded-full bg-black w-full md:w-fit lg:w-fit'>
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
            className='outline-none border-none rounded-full px-6 py-2 bg-black placeholder-gray-500 text-white flex-1 md:flex-auto md:w-96'/>
            <button 
            className='px-4 py-1 text-sm font-medium leading-5 rounded-full md:px-5 md:text-xl md:leading-7 bg-red-500 text-white custom-shadow'
            onClick={() => {
              const value = inputRef.current?.value?? ""
              navigate(`?query=${encodeURIComponent(value)}`)
              handleSearch(value)}
            }
            >Search</button>
        </div>
      <div className='flex flex-wrap -mx-2 mt-16'>
        {movies?.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className='px-2 w-1/2 md:w-1/4 lg:w-1/6 mb-8'>
            <LazyLoad>
              <SliderItem type={type} movie={movie} />
            </LazyLoad>
            </div>
          ))) 
         : (<h1 className="xl:text-3xl py-10 px-10">Loading...</h1>)
        }
      </div>
      <div className='w-full flex items-center justify-center'>
        <button 
        className='text-sm font-medium leading-5 rounded-full md:px-5 md:text-xl md:leading-7 text-white border-2 border-white hover:bg-white hover:text-gray-500'
        onClick={fetchFn}
        >
        Watch more
      </button>
      </div>
      
      </div>
    </div>
  )
}

export default List