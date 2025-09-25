import {FC, useState, useEffect, useRef, Suspense} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { listProps } from '../../interface/interfaces'
import SliderItem from '../../components/UtilityComponents/SliderItem'
import { useData } from '../../context/Context'
import icons from '../../../public/assets/icon'
const List:FC<listProps> = ({movies, type, isLoading, isFetchingNextPage}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const location = useLocation() 
  const query = new URLSearchParams(location.search)
  const queryString = query.get("query")
  const { searchBaseOnLocation, handleSearch, keyword, setKeyword, searchTerm } = useData()

  const [itemsPerRow, setItemsPerRow] = useState(2)

  useEffect(() => {
    const updateItemsPerRow = () => {
      const value = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--items-per-row'
        )
      )
      setItemsPerRow(value)
    }
    updateItemsPerRow()
    window.addEventListener('resize', updateItemsPerRow)
    return () => window.removeEventListener('resize', updateItemsPerRow)
  }, [])

  const remainder = movies?.length % itemsPerRow
  const skeletonCount = remainder === 0 ? 0 : itemsPerRow - remainder;

  useEffect(() => {
  if (queryString) {
    searchBaseOnLocation(queryString)
    if (inputRef.current) {
      inputRef.current.value = queryString
    }
  }
  }, [queryString])

  return (
    <div className='bg-[#0f0f0f] px-4 md:px-8 py-8 xl:p-16'>
      <div className='max-w-screen-2xl mx-auto'>
        <div className='flex items-center relative rounded-full bg-black w-full md:w-fit lg:w-fit'>
            <input type="text" 
            placeholder='Enter keyword' 
            ref={inputRef}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if(e.key === 'Enter'){
                const value = inputRef.current?.value?? ""
                navigate(`?query=${encodeURIComponent(value)}`)
                e.currentTarget.blur()
                handleSearch()
              }
            }}
            onBlur={(e) => {
              const value = inputRef.current?.value?? ""
              if(value === ''){
                navigate(``)
                handleSearch()
              }
            }}
            className={`${isLoading ? 'input-disabled' : ''} outline-none border-none rounded-full px-6 py-2 bg-black placeholder-gray-500 text-white flex-1 md:flex-auto md:w-96`}/>
            <button 
            disabled={isLoading}
            className='flex items-center gap-2 px-4 py-1 text-sm font-medium leading-5 rounded-full md:px-5 md:text-xl md:leading-7 bg-red-500 text-white custom-shadow'
            onClick={() => {
              const value = inputRef.current?.value?? ""
              navigate(`?query=${encodeURIComponent(value)}`)
              handleSearch()}
            }
            >
              {isLoading && searchTerm && <icons.spinner className='w-4 h-4'/>}
             Search</button>
        </div>
      <div className='flex flex-wrap -mx-2 mt-16'>
        <Suspense fallback={ Array.from({ length: skeletonCount }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className='animate-pulse px-4 w-1/2 md:w-1/4 lg:w-1/6 mb-12'
              >
                <div className='flex-[1_0_calc(100%/var(--items-per-row)-1rem)] h-72 bg-gray-300 rounded-3xl'></div>
              </div>))}>
          {
            isLoading && movies?.length === 0 && Array.from({ length: itemsPerRow }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className='animate-pulse px-4 w-1/2 md:w-1/4 lg:w-1/6 mb-12'
              >
                <div className='flex-[1_0_calc(100%/var(--items-per-row)-1rem)] h-72 bg-gray-300 rounded-3xl'></div>
              </div>))
          }
          {movies?.length > 0 ? (
            movies.map((movie, index) => (
              <div key={index} className='px-3 w-1/2 md:w-1/4 lg:w-1/6 mb-12'>
                <SliderItem type={type} movie={movie} />
              </div>
          ))) 
          : (
            !isLoading && !isFetchingNextPage && movies?.length === 0 && <div className="bg-[#0f0f0f] w-full px-4 md:px-8 py-8 xl:p-16 flex flex-col items-center justify-center">
            <h1
              id="results"
              className="text-white text-[7vh] font-bold capitalize"
            >
              No result found for: {searchTerm}
            </h1>
            <img
              loading="lazy"
              src="/assets/sadness.png"
              className="w-[50vh] h-[50vh] object-contain object-center aspect-square"
            />
            </div>)
          }
          {isFetchingNextPage &&
          Array.from({ length: skeletonCount }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className='animate-pulse px-4 w-1/2 md:w-1/4 lg:w-1/6 mb-12'
            >
              <div className='flex-[1_0_calc(100%/var(--items-per-row)-1rem)] h-72 bg-gray-300 rounded-3xl'></div>
            </div>
          ))}
        </Suspense>
      </div>
      </div>
    </div>
  )
}

export default List