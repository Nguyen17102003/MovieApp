import {FC, lazy, Suspense, useEffect, useMemo} from 'react'
import { Outlet } from 'react-router-dom'
import { useData } from '../context/Context'
import { pagesProps } from '../interface/interfaces'

const Gradient = lazy(() => import('../components/UtilityComponents/Gradient'))
const List = lazy(() => import('../components/DetailComponents/List'))
const Pages:FC<pagesProps> = ({location, type}) => {
  const { 
    allMovies, allTVSeries, 
    loadMore, reset,
    searchQuery, searchType,
    setSearchType, setHydrated,
    searchTerm} = useData()
  useEffect(() => {
    setSearchType(type);
    setHydrated(false)
    reset()
  }, [location])

  const isSearching = !!searchTerm

  const movies = useMemo(() => {
    if (isSearching) {
      if (searchQuery.isLoading) {
        return null 
      }
      if (searchQuery.data && searchType === type) {
        return searchQuery.data.results
      }
      return [] 
    }

    return type === "movie"
    ? (allMovies.data?.results || [])
    : (allTVSeries.data?.results || [])
  }, [isSearching, searchQuery, searchType, type, allMovies.data, allTVSeries.data])

  return (
    <div className='w-full'>
      <Gradient location={location} />
      <Suspense fallback={<div className="w-full h-[20rem] bg-gray-900 animate-pulse rounded-xl" />}>
        {
            movies?.length > 0 ?  (
            <div id="results">
            <List
            type={type}
            movies={movies} 
            fetchFn={() => loadMore(type)}
            />
            </div>
          ) : (
            <div className='bg-black w-full h-screen gap-20 flex flex-col items-center'>
              <h1 id="results" className='text-white text-[7vh] font-bold capitalize'>No result found for: {searchTerm}</h1>
              <img loading='lazy' src='/assets/sadness.png' className='w-[50vh] h-[50vh] object-contain object-center aspect-square'/>
            </div>
          ) 
        }
      </Suspense>
      <Outlet/>
    </div>
  )
}

export default Pages