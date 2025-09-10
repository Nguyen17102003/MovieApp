import React from 'react'
import { listProps } from '../../interface/interfaces'
import SliderItem from '../../components/UtilityComponents/SliderItem'

const List:React.FC<listProps> = ({movies, type, fetchFn}) => {
  return (
    <div className='w-full flex items-center justify-center flex-col bg-black pb-10 gap-10 2xl:gap-[10vh] 2xl:pb-[10vh]'>
      <div className='bg-black grid xl:grid-cols-6 lg:grid-cols-4 grid-cols-2 gap-x-5 2xl:gap-x-10 gap-y-15 px-8 2xl:px-[3vw] pb-5'>
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
      className='w-fit xl:text-xl 2xl:text-[3vh] text-white bg-black border-white border-2 rounded-full px-10 py-1 font-semibold flex items-center justify-center hover:bg-white hover:text-gray-500'
      onClick={fetchFn}
      >
        Watch more
      </button>
    </div>
  )
}

export default List