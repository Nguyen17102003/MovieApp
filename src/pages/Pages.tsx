import React, {useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Gradient from '../components/DetailComponents/Gradient'
import List from '../components/DetailComponents/List'
import { useData } from '../context/Context'
import { pagesProps } from '../interface/interfaces'

const Pages:React.FC<pagesProps> = ({location, type}) => {
  const { 
    allMovies, allTVSeries, 
    loadMore, reset,
    searchQuery, searchType,
    setSearchType} = useData()
  useEffect(() => {
    setSearchType(type);
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
      <List
        type={type}
        movies={movies()} 
        fetchFn={() => loadMore(type)}
      />
      <Outlet/>
    </>
  )
}

export default Pages