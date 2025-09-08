import React from 'react'
import SliderItem from './SliderItem'

const List = ({movies, fetchFn}) => {
  return (
    <div className='w-full flex items-center justify-center flex-col bg-black pb-10'>
      <div className='bg-black grid xl:grid-cols-6 lg:grid-cols-4 grid-cols-2 gap-x-5 gap-y-15 px-8 pb-5'>
        {
            movies?.length > 0 ? movies.map((movie) => (
                <SliderItem key={movie.id} {...movie}/>
            )) : (<>
                <h1 className='xl:text-3xl py-10 px-10'>Loading...</h1>
            </>)
        }
      </div>
      <button 
      className='w-fit xl:text-xl text-white bg-black border-white border-2 rounded-full px-10 py-1 font-semibold flex items-center justify-center hover:bg-white hover:text-gray-500'
      onClick={fetchFn}
      >
        Watch more
      </button>
    </div>
  )
}

export default List