import {FC} from 'react'
import { listProps } from '../../interface/interfaces'
import SliderItem from '../../components/UtilityComponents/SliderItem'

const List:FC<listProps> = ({movies, type, fetchFn}) => {
  return (
    <div className='w-full xl:px-[12vw] 2xl:px-[18vw] flex items-center justify-center flex-col bg-gray-900 sm:bg-gray-950 2xl:bg-black pb-10 gap-10 xl:pb-[20vh] 2xl:gap-[10vh]'>
      <div className='bg-gray-900 sm:bg-gray-950 2xl:bg-black grid xl:grid-cols-6 lg:grid-cols-4 grid-cols-1 auto-rows-fr sm:grid-cols-2 sm:gap-x-3 2xl:gap-x-5 gap-y-15 px-[5vw] 2xl:px-[3vw]'>
        {movies?.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id}>
              <SliderItem type={type} movie={movie} />
            </div>
          ))) 
         : (<h1 className="xl:text-3xl py-10 px-10">Loading...</h1>)
        }
      </div>
      <button 
      className='w-fit text-[2vh] rounded-sm px-1 min-[100px]:text-xs min-[100px]:px-3 sm:text-sm md:text-md lg:text-lg 2xl:text-[3vh] text-white bg-black border-white border-2 min-[100px]:rounded-full sm:px-5 md:px-10 py-1 font-semibold flex items-center justify-center hover:bg-white hover:text-gray-500'
      onClick={fetchFn}
      >
        Watch more
      </button>
    </div>
  )
}

export default List