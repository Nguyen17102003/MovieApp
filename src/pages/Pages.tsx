import {FC, lazy, Suspense, useEffect} from 'react'
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
    setSearchType, setHydrated} = useData()
  useEffect(() => {
    setSearchType(type);
    setHydrated(false)
    reset()
  }, [location])

  const movies = () => {
  if (searchQuery.data 
    && searchQuery.data.results?.length > 0 
    && searchType === type) {
    return searchQuery.data.results
  }
  return type === 'movie'
    ? (allMovies.data?.results || [])
    : (allTVSeries.data?.results || [])
  }


  return (
    <>
      <Gradient location={location}/>
      <Suspense>
        <List
        type={type}
        movies={movies()} 
        fetchFn={() => loadMore(type)}
      />
      </Suspense>
      <Outlet/>
    </>
  )
}

export default Pages